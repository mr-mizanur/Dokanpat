'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingBag, Package, ArrowLeft, Loader2, Clock, CheckCircle2, Truck } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import { authClient } from '@/lib/auth-client';

export default function BuyerDashboardPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    async function init() {
      try {
        const session = await authClient.getSession();
        const user = session?.data?.user;
        
        if (user && user.email) {
          setUserName(user.name || 'Buyer');
          fetchBuyerOrders(user.email);
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

  const fetchBuyerOrders = async (email) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/orders?email=${email}`);
      const data = await res.json();
      
      if (res.ok) {
        setOrders(Array.isArray(data) ? data : data.orders || data.data || []);
      } else {
        throw new Error(data.message || 'Failed to fetch orders');
      }
    } catch (error) {
      toast.error('Could not load your orders!', {
        style: { background: '#ffffff', color: '#1e293b', border: '1px solid #ffedd5' },
      });
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 p-4 sm:p-8">
      <Toaster position="top-right" />

      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white border border-orange-100 p-6 rounded-2xl shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-orange-50 border border-orange-200 flex items-center justify-center text-orange-600">
              <ShoppingBag className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900">Buyer Dashboard</h1>
              <p className="text-xs sm:text-sm text-slate-500">Welcome back, <span className="text-orange-600 font-semibold">{userName}</span>! Track your active orders.</p>
            </div>
          </div>

          <Link href="/" className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold bg-slate-50 border border-orange-100 text-slate-600 hover:text-orange-600 transition-all">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Store</span>
          </Link>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <Loader2 className="w-8 h-8 text-orange-600 animate-spin" />
            <p className="text-xs text-slate-500">Loading your orders...</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white border border-orange-100 rounded-2xl text-center p-6 space-y-4 shadow-sm">
            <div className="w-16 h-16 rounded-full bg-orange-50 border border-orange-200 flex items-center justify-center text-orange-600">
              <Package className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-bold text-slate-900">No orders placed yet</h3>
              <p className="text-xs text-slate-500 max-w-sm">You haven't purchased anything from the store yet. Explore products and start shopping.</p>
            </div>
            <Link href="/" className="px-5 py-2.5 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white text-xs font-semibold rounded-xl transition-all shadow-md shadow-orange-500/25">
              Explore Store
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            <h2 className="text-base font-bold text-slate-900">Your Order History</h2>
            
            <div className="grid grid-cols-1 gap-4">
              {orders.map((order) => {
                const status = order.status || 'Pending';
                
                return (
                  <div key={order._id} className="bg-white border border-orange-100 p-5 rounded-2xl shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-500">Order ID: #{order._id.slice(-6)}</span>
                        <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-semibold uppercase border ${
                          status === 'Completed' 
                            ? 'bg-emerald-50 text-emerald-600 border-emerald-200' 
                            : status === 'Shipped'
                            ? 'bg-blue-50 text-blue-600 border-blue-200'
                            : 'bg-amber-50 text-amber-600 border-amber-200'
                        }`}>
                          {status}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500">Total Items: <strong className="text-slate-900">{order.items?.length || 1}</strong></p>
                      <p className="text-xs text-slate-400">Placed on: {new Date(order.createdAt || Date.now()).toLocaleDateString()}</p>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4 pt-3 sm:pt-0 border-t sm:border-t-0 border-orange-100">
                      <span className="text-base font-black text-orange-600">৳ {Number(order.totalAmount || 0).toFixed(2)}</span>
                      <span className={`px-3 py-1.5 bg-slate-50 border border-orange-100 rounded-xl text-xs font-semibold flex items-center gap-1.5 ${
                        status === 'Completed' ? 'text-emerald-600' : status === 'Shipped' ? 'text-blue-600' : 'text-amber-600'
                      }`}>
                        {status === 'Completed' ? <CheckCircle2 className="w-3.5 h-3.5" /> : status === 'Shipped' ? <Truck className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}
                        <span>{status}</span>
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}