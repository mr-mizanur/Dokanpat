'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Package, Plus, Trash2, Edit, Store, ArrowLeft, Loader2, Sparkles, AlertCircle } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import { authClient } from '@/lib/auth-client';

export default function SellerProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState('');

  
  useEffect(() => {
    async function init() {
      try {
        const session = await authClient.getSession();
        const email = session?.data?.user?.email;
        
        if (email) {
          setUserEmail(email);
          fetchProducts(email);
        } else {
          setLoading(false);
        }
      } catch (error) {
        console.error('Session error:', error);
        setLoading(false);
      }
    }
    init();
  }, []);

  
  const fetchProducts = async (email) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products?sellerEmail=${email}`);
      const data = await res.json();
      
      if (res.ok) {
        setProducts(Array.isArray(data) ? data : data.products || data.data || []);
      } else {
        throw new Error(data.message || 'Failed to fetch products');
      }
    } catch (error) {
      toast.error('Could not load products!', {
        style: { background: '#090d16', color: '#fff', border: '1px solid #1e293b' },
      });
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  
  const handleDelete = async (productId) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${productId}`, {
        method: 'DELETE',
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Failed to delete product');
      }

      setProducts(products.filter((item) => item._id !== productId));
      toast.success('Product deleted successfully!', {
        style: { background: '#090d16', color: '#fff', border: '1px solid #1e293b' },
      });
    } catch (error) {
      toast.error(error.message || 'Error deleting product', {
        style: { background: '#090d16', color: '#fff', border: '1px solid #1e293b' },
      });
    }
  };

  return (
    <div className="min-h-screen  bg-[#7f8c8d] text-slate-100 p-4 sm:p-8">
      <Toaster position="top-right" />

      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900/80 border border-slate-800/80 p-6 rounded-2xl backdrop-blur-xl shadow-xl">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <Store className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-black tracking-tight text-slate-100">My Products</h1>
              <p className="text-xs sm:text-sm text-slate-400">Manage your inventory and store listings</p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Link href="/dashboard/seller" className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold bg-slate-950 border border-slate-800 text-slate-400 hover:text-slate-200 transition-all">
              <ArrowLeft className="w-4 h-4" />
              <span>Dashboard</span>
            </Link>
            
            <Link href="/dashboard/seller/add-product" className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-lg shadow-blue-500/20 transition-all">
              <Plus className="w-4 h-4" />
              <span>Add Product</span>
            </Link>
          </div>
        </div>

       
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
            <p className="text-xs text-slate-400">Loading your products...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-slate-900/40 border border-slate-800/60 rounded-2xl text-center p-6 space-y-4">
            <div className="w-16 h-16 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500">
              <AlertCircle className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-bold text-slate-200">No products found</h3>
              <p className="text-xs text-slate-400 max-w-sm">You haven't added any products to your store yet. Get started by adding your first product.</p>
            </div>
            <Link href="/dashboard/seller/add-product" className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-xl transition-all">
              Add New Product
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div key={product._id} className="bg-slate-900/80 border border-slate-800/80 rounded-2xl overflow-hidden backdrop-blur-xl shadow-xl flex flex-col justify-between group hover:border-slate-700 transition-all">
                
                <div>
                 
                  <div className="relative h-48 w-full bg-slate-950 overflow-hidden">
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
                    
                    <div className="flex items-center justify-between pt-2">
                      <span className="text-lg font-black text-blue-400">${Number(product.price).toFixed(2)}</span>
                      <span className="text-xs px-2.5 py-1 bg-slate-950 border border-slate-800 rounded-lg text-slate-300">
                        Stock: <strong className="text-slate-100">{product.stock}</strong>
                      </span>
                    </div>
                  </div>
                </div>

               
                <div className="p-4 border-t border-slate-800/80 flex items-center justify-between gap-2 bg-slate-950/40">
                  <span className="text-[10px] text-slate-500 truncate max-w-[140px]">{product.sellerEmail}</span>
                  
                  <div className="flex items-center gap-1.5">
                    <button 
                      onClick={() => handleDelete(product._id)}
                      className="p-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition-all"
                      title="Delete Product"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}