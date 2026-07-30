'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingBag, ArrowLeft, Loader2, AlertCircle, Clock, CheckCircle2, Truck, Phone, MapPin, User } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import { authClient } from '@/lib/auth-client';

export default function SellerOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState('');
  const [updatingId, setUpdatingId] = useState(null);

 
  useEffect(() => {
    async function init() {
      try {
        const session = await authClient.getSession();
        const email = session?.data?.user?.email;
        
        if (email) {
          setUserEmail(email);
          fetchSellerOrders(email);
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


  const fetchSellerOrders = async (email) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/orders/seller?email=${email}`);
      const data = await res.json();
      
      if (res.ok) {
        setOrders(Array.isArray(data) ? data : data.orders || data.data || []);
      } else {
        throw new Error(data.message || 'Failed to fetch orders');
      }
    } catch (error) {
      toast.error('Could not load orders!', {
        style: { background: '#090d16', color: '#fff', border: '1px solid #1e293b' },
      });
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  
  const handleStatusUpdate = async (orderId, newStatus) => {
    setUpdatingId(orderId);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(`Order marked as ${newStatus}! 🎉`, {
          style: { background: '#090d16', color: '#fff', border: '1px solid #1e293b' },
        });
        
        setOrders(prevOrders => 
          prevOrders.map(order => 
            order._id === orderId ? { ...order, status: newStatus } : order
          )
        );
      } else {
        throw new Error(data.message || 'Failed to update status');
      }
    } catch (error) {
      toast.error('Could not update order status!', {
        style: { background: '#090d16', color: '#fff', border: '1px solid #1e293b' },
      });
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-8">
      <Toaster position="top-right" />

      <div className="max-w-6xl mx-auto space-y-6">
        
       
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900/80 border border-slate-800/80 p-6 rounded-2xl backdrop-blur-xl shadow-xl">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <ShoppingBag className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-black tracking-tight text-slate-100">Store Orders</h1>
              <p className="text-xs sm:text-sm text-slate-400">Manage order status and customer details for your products</p>
            </div>
          </div>

          <Link href="/dashboard/seller" className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold bg-slate-950 border border-slate-800 text-slate-400 hover:text-slate-200 transition-all">
            <ArrowLeft className="w-4 h-4" />
            <span>Dashboard</span>
          </Link>
        </div>

       
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
            <p className="text-xs text-slate-400">Loading your store orders...</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-slate-900/40 border border-slate-800/60 rounded-2xl text-center p-6 space-y-4">
            <div className="w-16 h-16 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500">
              <AlertCircle className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-bold text-slate-200">No orders found</h3>
              <p className="text-xs text-slate-400 max-w-sm">You haven't received any orders for your products yet.</p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => {
              const sellerItems = order.items?.filter(item => item.sellerEmail === userEmail) || [];
              const orderTotal = sellerItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

              return (
                <div key={order._id} className="bg-slate-900/80 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-xl shadow-xl space-y-5 hover:border-slate-700 transition-all">
                  
                  
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800/80">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-400">Order ID:</span>
                        <span className="text-xs font-mono bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800 text-slate-300">
                          {order._id}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Placed on: {new Date(order.createdAt || Date.now()).toLocaleDateString()}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Your Earnings</p>
                        <p className="text-base font-black text-indigo-400">৳ {orderTotal.toLocaleString()}</p>
                      </div>

                      <span className={`px-3 py-1.5 rounded-xl text-[10px] font-extrabold uppercase flex items-center gap-1.5 ${
                        order.status === 'Completed' 
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                          : order.status === 'Shipped'
                          ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                          : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                      }`}>
                        {order.status === 'Completed' ? <CheckCircle2 className="w-3 h-3" /> : order.status === 'Shipped' ? <Truck className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                        {order.status || 'Pending'}
                      </span>
                    </div>
                  </div>

                
                  <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-800/60 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-indigo-600/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 flex-shrink-0">
                        <User className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-slate-500 block text-[10px] uppercase font-semibold">Customer Name</span>
                        <strong className="text-slate-200">{order.shippingAddress?.fullName || order.buyerName || order.userName || 'N/A'}</strong>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-emerald-600/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 flex-shrink-0">
                        <Phone className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-slate-500 block text-[10px] uppercase font-semibold">Phone Number</span>
                        <span className="text-slate-200 font-mono">{order.shippingAddress?.phone || order.phone || order.buyerPhone || 'N/A'}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-amber-600/10 border border-amber-500/20 flex items-center justify-center text-amber-400 flex-shrink-0">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-slate-500 block text-[10px] uppercase font-semibold">Delivery Address</span>
                        <span className="text-slate-200 truncate max-w-[200px] block" title={order.shippingAddress?.address || order.address}>{order.shippingAddress?.address || order.address || 'N/A'}</span>
                      </div>
                    </div>
                  </div>

                  
                  <div className="space-y-2 pt-1">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Ordered Items ({sellerItems.length})</h4>
                    <div className="divide-y divide-slate-800/60 border border-slate-800/60 rounded-xl bg-slate-950/30 overflow-hidden">
                      {sellerItems.map((item, idx) => (
                        <div key={idx} className="p-3.5 flex items-center justify-between gap-4">
                          <div className="flex items-center gap-3">
                            {item.image ? (
                              <img src={item.image} alt={item.name} className="w-12 h-12 rounded-xl object-cover border border-slate-800 flex-shrink-0" />
                            ) : (
                              <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-600 text-xs">No Img</div>
                            )}
                            <div>
                              <p className="text-xs font-bold text-slate-200">{item.name}</p>
                              <p className="text-[11px] text-slate-400">Qty: {item.quantity} × ৳ {item.price}</p>
                            </div>
                          </div>
                          <span className="text-xs font-bold text-indigo-400">৳ {item.price * item.quantity}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                 
                  <div className="flex items-center justify-between pt-3 border-t border-slate-800/80 flex-wrap gap-3">
                    <span className="text-xs text-slate-400">Update Order Status:</span>
                    <div className="flex items-center gap-2">
                      <button
                        disabled={updatingId === order._id || order.status === 'Pending'}
                        onClick={() => handleStatusUpdate(order._id, 'Pending')}
                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border ${
                          order.status === 'Pending' 
                            ? 'bg-amber-500/20 border-amber-500/40 text-amber-300 cursor-default' 
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                        }`}
                      >
                        Pending
                      </button>

                      <button
                        disabled={updatingId === order._id || order.status === 'Shipped'}
                        onClick={() => handleStatusUpdate(order._id, 'Shipped')}
                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border flex items-center gap-1.5 ${
                          order.status === 'Shipped' 
                            ? 'bg-blue-500/20 border-blue-500/40 text-blue-300 cursor-default' 
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                        }`}
                      >
                        <Truck className="w-3.5 h-3.5" />
                        <span>Ship Order</span>
                      </button>

                      <button
                        disabled={updatingId === order._id || order.status === 'Completed'}
                        onClick={() => handleStatusUpdate(order._id, 'Completed')}
                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border flex items-center gap-1.5 ${
                          order.status === 'Completed' 
                            ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300 cursor-default' 
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                        }`}
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Complete</span>
                      </button>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
}