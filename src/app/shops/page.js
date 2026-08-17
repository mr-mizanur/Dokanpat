'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Store, Loader2, ArrowRight, Package, Sparkles } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import Logo from '@/components/Logo';

export default function ShopsPage() {
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAllShops() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/shops`);
        const data = await res.json();
        
        if (res.ok) {
          setShops(Array.isArray(data) ? data : data.shops || data.data || []);
        } else {
          throw new Error(data.message || 'Failed to fetch shops');
        }
      } catch (error) {
        toast.error('Could not load stores!', {
          style: { background: '#ffffff', color: '#1e293b', border: '1px solid #fed7aa' },
        });
        setShops([]);
      } finally {
        setLoading(false);
      }
    }

    fetchAllShops();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <Toaster position="top-right" />

   
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 bg-white border border-orange-100 p-6 sm:p-8 rounded-3xl shadow-sm">
          <div className="space-y-3">
            
            
            <div className="space-y-2">
              <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-slate-900 flex flex-wrap items-center gap-2.5">
                <span>Explore All Stores on</span> <p><span className="text-orange-600">Dokan</span>pat</p>
                
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 max-w-xl">
                Discover verified merchant stores, browse unique collections, and shop directly from your favorite creators.
              </p>
            </div>
          </div>
        </div>
      </div>

     
      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-12 space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Active Shops</h2>
          <span className="text-xs font-semibold px-3 py-1 bg-white border border-orange-100 text-slate-600 rounded-lg shadow-sm">
            {shops.length} {shops.length === 1 ? 'Store' : 'Stores'} Available
          </span>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <Loader2 className="w-8 h-8 text-orange-600 animate-spin" />
            <p className="text-xs text-slate-500">Loading stores...</p>
          </div>
        ) : shops.length === 0 ? (
          <div className="text-center py-20 bg-white border border-orange-100 rounded-3xl p-8 space-y-3 shadow-sm">
            <Store className="w-12 h-12 text-orange-400 mx-auto" />
            <h3 className="text-base font-bold text-slate-900">No stores available</h3>
            <p className="text-xs text-slate-500">There are no active merchant shops published on the platform yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {shops.map((shop) => {
              const shopName = shop.shopName || shop.name || shop.username;
              const shopUsername = shop.username || shop.name;

              return (
                <div key={shop._id || shopUsername} className="bg-white border border-orange-100 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between group hover:border-orange-300 transition-all">
                  <div className="p-6 space-y-4">
                    <div className="w-12 h-12 rounded-2xl bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-600 group-hover:scale-110 transition-transform duration-300">
                      <Store className="w-6 h-6" />
                    </div>

                    <div className="space-y-1">
                      <h3 className="font-bold text-slate-900 text-lg truncate">{shopName}</h3>
                      <p className="text-xs text-orange-600 font-medium">@{shopUsername}</p>
                    </div>

                    <p className="text-xs text-slate-600 line-clamp-2">
                      {shop.description || 'Explore top-tier products and exclusive collections offered by this merchant store.'}
                    </p>
                  </div>

                  <div className="p-4 border-t border-orange-100 bg-orange-50/40">
                    <Link 
                      href={`/shop/${shopUsername}`}
                      className="w-full py-2.5 px-4 bg-white hover:bg-orange-50 text-slate-800 hover:text-orange-600 border border-orange-100 text-xs font-semibold rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm"
                    >
                      <span>Visit Store</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}