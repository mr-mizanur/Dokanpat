'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ShoppingCart, ArrowLeft, Loader2, Package, CheckCircle2, ShieldCheck, Truck } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

export default function ProductDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { _id } = params;

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (!_id) return;

    async function fetchProductDetails() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${_id}`);
        const data = await res.json();

        if (res.ok) {
          setProduct(data.product || data.data || data);
        } else {
          throw new Error(data.message || 'Failed to fetch product details');
        }
      } catch (error) {
        toast.error('Could not load product details!', {
          style: { background: '#ffffff', color: '#1e293b', border: '1px solid #ffedd5' },
        });
      } finally {
        setLoading(false);
      }
    }

    fetchProductDetails();
  }, [_id]);

  const addToCart = () => {
    if (!product) return;

    const savedCart = JSON.parse(localStorage.getItem('store_cart')) || [];
    const existingIndex = savedCart.findIndex((item) => item._id === product._id);
    let updatedCart;

    if (existingIndex > -1) {
      updatedCart = savedCart.map((item, index) => 
        index === existingIndex ? { ...item, quantity: item.quantity + quantity } : item
      );
    } else {
      updatedCart = [...savedCart, { ...product, quantity }];
    }

    localStorage.setItem('store_cart', JSON.stringify(updatedCart));
    window.dispatchEvent(new Event('storage'));

    toast.success(`${product.name} added to cart!`, {
      style: { background: '#ffffff', color: '#1e293b', border: '1px solid #ffedd5' },
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-8 h-8 text-orange-600 animate-spin" />
        <p className="text-xs text-slate-500">Loading product details...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center space-y-4">
        <Package className="w-12 h-12 text-orange-300 mx-auto" />
        <h2 className="text-lg font-bold text-slate-900">Product Not Found</h2>
        <p className="text-xs text-slate-500">The product you are looking for doesn't exist or has been removed.</p>
        <button 
          onClick={() => router.back()}
          className="px-5 py-2.5 bg-orange-600 text-white text-xs font-semibold rounded-xl hover:bg-orange-500 transition-all shadow-sm"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 py-10 px-4 sm:px-8">
      <Toaster position="top-right" />

      <div className="max-w-6xl mx-auto space-y-6">
        
       
        <button 
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-orange-100 hover:bg-orange-50 text-slate-700 text-xs font-semibold rounded-xl shadow-sm transition-all"
        >
          <ArrowLeft className="w-4 h-4 text-orange-600" />
          <span>Back to Products</span>
        </button>

        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-white border border-orange-100 p-6 sm:p-10 rounded-3xl shadow-md items-start">
          
        
          <div className="lg:col-span-6 relative h-80 sm:h-[420px] w-full rounded-2xl overflow-hidden border border-orange-100 bg-slate-100 shadow-sm">
            <img 
              src={product.image || 'https://via.placeholder.com/600'} 
              alt={product.name} 
              className="w-full h-full object-cover" 
            />
            {product.category && (
              <span className="absolute top-4 right-4 px-3.5 py-1.5 bg-white/90 border border-orange-100 backdrop-blur-md rounded-full text-xs font-semibold text-orange-600 uppercase tracking-wider shadow-sm">
                {product.category}
              </span>
            )}
          </div>

        
          <div className="lg:col-span-6 space-y-6">
            
            <div className="space-y-3">
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900">{product.name}</h1>
              <div className="flex items-center gap-4">
                <span className="text-2xl font-black text-orange-600">৳{Number(product.price).toFixed(2)}</span>
                <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${product.stock > 0 ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : 'bg-rose-50 text-rose-600 border-rose-200'}`}>
                  {product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}
                </span>
              </div>
            </div>

            <hr className="border-orange-50" />

            <div className="space-y-2">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Description</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {product.description || 'No detailed description provided for this item.'}
              </p>
            </div>

           
            {product.stock > 0 && (
              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-4">
                  <span className="text-xs font-semibold text-slate-700">Quantity:</span>
                  <div className="flex items-center border border-orange-200 rounded-xl overflow-hidden bg-orange-50/30">
                    <button 
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-1.5 text-slate-700 hover:bg-orange-100 transition-all text-xs font-bold"
                    >
                      -
                    </button>
                    <span className="px-4 py-1.5 text-xs font-bold text-slate-800">{quantity}</span>
                    <button 
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      className="px-3 py-1.5 text-slate-700 hover:bg-orange-100 transition-all text-xs font-bold"
                    >
                      +
                    </button>
                  </div>
                </div>

                <button 
                  onClick={addToCart}
                  className="w-full py-3.5 px-6 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white text-xs font-semibold rounded-xl transition-all flex items-center justify-center gap-2 shadow-md shadow-orange-500/20"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>Add to Cart</span>
                </button>
              </div>
            )}

          
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-orange-50">
              <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
                <ShieldCheck className="w-4 h-4 text-orange-600 shrink-0" />
                <span>Verified Vendor Product</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
                <Truck className="w-4 h-4 text-orange-600 shrink-0" />
                <span>Fast Home Delivery</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}