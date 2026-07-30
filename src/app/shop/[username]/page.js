'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ShoppingCart, Package, Sparkles, Loader2, ArrowRight, Store, ShieldCheck } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

export default function SellerShopPage() {
  const params = useParams();
  const username = params?.username;

  const [products, setProducts] = useState([]);
  const [sellerInfo, setSellerInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);

  
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('store_cart')) || [];
    setCart(savedCart);

    async function fetchSellerData() {
      if (!username) return;
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/shops/${username}`);
        const data = await res.json();
        
        if (res.ok) {
          setSellerInfo(data.seller || data.shop || { name: username, shopName: `${username}'s Store` });
          setProducts(Array.isArray(data.products) ? data.products : data.products?.data || []);
        } else {
          throw new Error(data.message || 'Failed to fetch shop products');
        }
      } catch (error) {
        toast.error('Could not load store products!', {
          style: { background: '#090d16', color: '#fff', border: '1px solid #1e293b' },
        });
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }

    fetchSellerData();
  }, [username]);

  
  const addToCart = (product) => {
    const existingIndex = cart.findIndex((item) => item._id === product._id);
    let updatedCart;

    if (existingIndex > -1) {
      updatedCart = cart.map((item, index) => 
        index === existingIndex ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      updatedCart = [...cart, { ...product, quantity: 1 }];
    }

    setCart(updatedCart);
    localStorage.setItem('store_cart', JSON.stringify(updatedCart));

    toast.success(`${product.name} added to cart! 🛒`, {
      style: { background: '#090d16', color: '#fff', border: '1px solid #1e293b' },
    });
  };

  const totalPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  
  const shopTitle = sellerInfo?.shopName || sellerInfo?.name || `${username}'s Store`;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Toaster position="top-right" />

     
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 bg-slate-900/80 border border-slate-800/80 p-6 sm:p-8 rounded-3xl backdrop-blur-xl shadow-2xl">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-600/10 border border-blue-500/20 text-blue-400 text-xs font-semibold">
              <Store className="w-4 h-4" />
              <span>Verified Merchant</span>
              <ShieldCheck className="w-3.5 h-3.5 text-blue-400 ml-0.5" />
            </div>
            
            <div className="space-y-1">
              <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-slate-100 flex items-center gap-3">
                <span>{shopTitle}</span>
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 flex items-center gap-1.5">
                <span>Owner username:</span> 
                <span className="text-blue-400 font-medium">@{username}</span>
              </p>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 max-w-xl">
              Browse top-tier items exclusively from this collection, add them to your cart, and proceed to instant checkout.
            </p>
          </div>

        
          <div className="flex items-center gap-4 bg-slate-950 border border-slate-800 px-5 py-3 rounded-2xl">
            <Link href="/cart" className="relative flex items-center gap-2">
              <ShoppingCart className="w-6 h-6 text-blue-400" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-blue-600 text-white rounded-full text-[10px] font-bold flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
            <div>
              <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Cart Total</p>
              <p className="text-base font-black text-slate-100">${totalPrice.toFixed(2)}</p>
            </div>
            {totalItems > 0 && (
              <Link href="/checkout" className="ml-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-xl transition-all flex items-center gap-1">
                <span>Checkout</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            )}
          </div>
        </div>
      </div>

      
      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-12 space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-200">Store Products</h2>
          <span className="text-xs font-semibold px-3 py-1 bg-slate-900 border border-slate-800 text-slate-400 rounded-lg">
            {products.length} {products.length === 1 ? 'Item' : 'Items'} Available
          </span>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
            <p className="text-xs text-slate-400">Loading products...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20 bg-slate-900/40 border border-slate-800/60 rounded-3xl p-8 space-y-3">
            <Package className="w-12 h-12 text-slate-600 mx-auto" />
            <h3 className="text-base font-bold text-slate-200">No products available</h3>
            <p className="text-xs text-slate-400">This seller hasn't published any items to their store yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <div key={product._id} className="bg-slate-900/80 border border-slate-800/80 rounded-2xl overflow-hidden backdrop-blur-xl shadow-xl flex flex-col justify-between group hover:border-slate-700 transition-all">
                <div>
                  <div className="relative h-52 w-full bg-slate-950 overflow-hidden">
                    <img 
                      src={product.image || 'https://via.placeholder.com/400'} 
                      alt={product.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                    <span className="absolute top-3 right-3 px-3 py-1 bg-slate-950/80 border border-slate-800 backdrop-blur-md rounded-full text-[10px] font-semibold text-blue-400 uppercase tracking-wider">
                      {product.category}
                    </span>
                  </div>

                  <div className="p-5 space-y-2">
                    <h3 className="font-bold text-slate-100 text-base truncate">{product.name}</h3>
                    <p className="text-xs text-slate-400 line-clamp-2">{product.description || 'No description provided.'}</p>
                    
                    <div className="flex items-center justify-between pt-3">
                      <span className="text-lg font-black text-blue-400">${Number(product.price).toFixed(2)}</span>
                      <span className="text-xs text-slate-500">Stock: {product.stock}</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 border-t border-slate-800/80 bg-slate-950/40">
                  <button 
                    onClick={() => addToCart(product)}
                    className="w-full py-2.5 px-4 bg-slate-800 hover:bg-blue-600 text-slate-200 hover:text-white text-xs font-semibold rounded-xl transition-all flex items-center justify-center gap-2"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span>Add to Cart</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}