'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  DollarSign, 
  Loader2, 
  Store, 
  ShieldAlert, 
  CheckCircle, 
  Truck, 
  Clock, 
  Trash2, 
  Ban, 
  ArrowUpRight 
} from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import { useSession } from '@/lib/auth-client'; 

export default function AdminDashboard() {
  const { data: session, isPending } = useSession();
  const [activeTab, setActiveTab] = useState('overview'); 
  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState({ revenue: 0, orders: 0, products: 0, users: 0 });
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  
  const fetchAdminData = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/all-data`);
      const data = await res.json();

      if (data.success) {
        setStats(data.stats);
        setUsers(data.users);
        setProducts(data.products);
        setOrders(data.orders);
      }
    } catch (error) {
      toast.error('Failed to load admin data!', { style: { background: '#ffffff', color: '#1e293b', border: '1px solid #ffedd5' } });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session?.user?.role === 'admin') {
      fetchAdminData();
    }
  }, [session]);

  if (isPending) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-orange-600" />
      </div>
    );
  }

  if (!session?.user || session.user.role !== 'admin') {
    notFound();
  }


  const handleToggleUserStatus = async (userId, currentStatus) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/users/${userId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isBlacklisted: !currentStatus })
      });
      const data = await res.json();
      if (data.success) {
        toast.success('User status updated!');
        fetchAdminData();
      }
    } catch (error) {
      toast.error('Action failed!');
    }
  };

  
  const handleDeleteProduct = async (productId) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${productId}`, {
        method: 'DELETE'
      });
      const data = await res.json();
      if (data.success) {
        toast.success('Product deleted successfully!');
        fetchAdminData();
      }
    } catch (error) {
      toast.error('Failed to delete product!');
    }
  };

  
  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      const data = await res.json();
      if (data.success) {
        toast.success(`Order status changed to ${newStatus}`);
        fetchAdminData();
      }
    } catch (error) {
      toast.error('Failed to update order status!');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex">
      <Toaster position="top-right" />

      
      <aside className="w-64 border-r border-orange-100 bg-white hidden md:flex flex-col justify-between p-6 shadow-sm">
        <div className="space-y-6">
          <div className="flex items-center gap-2 px-2">
            <div className="w-9 h-9 rounded-xl bg-orange-50 border border-orange-200 flex items-center justify-center text-orange-600">
              <Store className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-black tracking-wider text-slate-900">দোকানপাট</h2>
              <p className="text-[10px] text-orange-600 uppercase tracking-widest font-bold">Admin Portal</p>
            </div>
          </div>

          <nav className="space-y-1.5 pt-4">
            <button onClick={() => setActiveTab('overview')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all ${activeTab === 'overview' ? 'bg-orange-50 border border-orange-200 text-orange-600 shadow-sm' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}>
              <LayoutDashboard className="w-4 h-4" /> <span>Dashboard Overview</span>
            </button>
            <button onClick={() => setActiveTab('orders')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold transition-all ${activeTab === 'orders' ? 'bg-orange-50 border border-orange-200 text-orange-600 shadow-sm' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}>
              <ShoppingCart className="w-4 h-4" /> <span>All Orders</span>
            </button>
            <button onClick={() => setActiveTab('products')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold transition-all ${activeTab === 'products' ? 'bg-orange-50 border border-orange-200 text-orange-600 shadow-sm' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}>
              <Package className="w-4 h-4" /> <span>All Products</span>
            </button>
            <button onClick={() => setActiveTab('users')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold transition-all ${activeTab === 'users' ? 'bg-orange-50 border border-orange-200 text-orange-600 shadow-sm' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}>
              <Users className="w-4 h-4" /> <span>Users & Shops</span>
            </button>
          </nav>
        </div>

        <div className="pt-4 border-t border-orange-100">
          <Link href="/" className="w-full flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:text-orange-600 hover:bg-slate-50 transition-colors">
            <span>← Back to Store</span>
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 sm:p-10 space-y-8 overflow-y-auto">
        <div className="flex items-center justify-between pb-6 border-b border-orange-100">
          <div>
            <h1 className="text-2xl font-black tracking-tight text-slate-900 flex items-center gap-2">
              <span>Admin Control Center</span>
              <ShieldAlert className="w-6 h-6 text-orange-600" />
            </h1>
            <p className="text-xs text-slate-500 mt-1">Manage global platform stats, orders, products, and user blacklists.</p>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-3 text-slate-500">
            <Loader2 className="w-8 h-8 animate-spin text-orange-600" />
            <p className="text-xs">Loading admin database...</p>
          </div>
        ) : (
          <>
            {/* 1. OVERVIEW TAB */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="p-6 rounded-2xl bg-white border border-orange-100 space-y-2 shadow-sm">
                    <span className="text-xs font-semibold text-slate-500 uppercase">Total Revenue</span>
                    <p className="text-2xl font-black text-slate-900">৳ {stats.revenue.toLocaleString()}</p>
                  </div>
                  <div className="p-6 rounded-2xl bg-white border border-orange-100 space-y-2 shadow-sm">
                    <span className="text-xs font-semibold text-slate-500 uppercase">Total Orders</span>
                    <p className="text-2xl font-black text-slate-900">{stats.orders}</p>
                  </div>
                  <div className="p-6 rounded-2xl bg-white border border-orange-100 space-y-2 shadow-sm">
                    <span className="text-xs font-semibold text-slate-500 uppercase">Total Products</span>
                    <p className="text-2xl font-black text-slate-900">{stats.products}</p>
                  </div>
                  <div className="p-6 rounded-2xl bg-white border border-orange-100 space-y-2 shadow-sm">
                    <span className="text-xs font-semibold text-slate-500 uppercase">Total Users</span>
                    <p className="text-2xl font-black text-slate-900">{stats.users}</p>
                  </div>
                </div>
              </div>
            )}

            {/* 2. ORDERS TAB (Pending, Shipping, Confirmed) */}
            {activeTab === 'orders' && (
              <div className="space-y-4">
                <h2 className="text-lg font-bold text-slate-900">All Platform Orders</h2>
                <div className="rounded-2xl bg-white border border-orange-100 overflow-hidden shadow-sm">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="bg-slate-50 text-slate-500 uppercase border-b border-orange-100">
                        <th className="p-4">Order ID</th>
                        <th className="p-4">Buyer Email</th>
                        <th className="p-4">Total Amount</th>
                        <th className="p-4">Status</th>
                        <th className="p-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-orange-100">
                      {orders.map(order => (
                        <tr key={order._id} className="hover:bg-slate-50/60">
                          <td className="p-4 font-mono text-orange-600">{order._id}</td>
                          <td className="p-4 text-slate-700">{order.buyerEmail}</td>
                          <td className="p-4 font-bold text-slate-900">৳ {order.totalAmount}</td>
                          <td className="p-4">
                            <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase ${
                              order.status === 'Confirmed' ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' :
                              order.status === 'Shipping' ? 'bg-blue-50 text-blue-600 border border-blue-200' :
                              'bg-amber-50 text-amber-600 border border-amber-200'
                            }`}>
                              {order.status || 'Pending'}
                            </span>
                          </td>
                          <td className="p-4 text-right space-x-2">
                            <button onClick={() => handleUpdateOrderStatus(order._id, 'Confirmed')} className="px-2.5 py-1 bg-emerald-50 text-emerald-600 border border-emerald-200 rounded-lg font-semibold hover:bg-emerald-100">Confirm</button>
                            <button onClick={() => handleUpdateOrderStatus(order._id, 'Shipping')} className="px-2.5 py-1 bg-blue-50 text-blue-600 border border-blue-200 rounded-lg font-semibold hover:bg-blue-100">Ship</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* 3. PRODUCTS TAB (Delete Products) */}
            {activeTab === 'products' && (
              <div className="space-y-4">
                <h2 className="text-lg font-bold text-slate-900">All Products Management</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {products.map(product => (
                    <div key={product._id} className="p-4 rounded-2xl bg-white border border-orange-100 space-y-3 flex flex-col justify-between shadow-sm">
                      <div className="space-y-2">
                        <img src={product.image} alt={product.name} className="w-full h-36 object-cover rounded-xl border border-orange-100 bg-slate-50" />
                        <h3 className="font-bold text-slate-900 truncate">{product.name}</h3>
                        <p className="text-xs text-orange-600 font-bold">৳ {product.price}</p>
                        <p className="text-[10px] text-slate-500">Seller: {product.sellerEmail}</p>
                      </div>
                      <button onClick={() => handleDeleteProduct(product._id)} className="w-full py-2 bg-red-50 border border-red-200 text-red-600 hover:bg-red-100 text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-all">
                        <Trash2 className="w-4 h-4" /> Delete Product
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 4. USERS & SHOPS TAB (Blacklist Users & Shops) */}
            {activeTab === 'users' && (
              <div className="space-y-4">
                <h2 className="text-lg font-bold text-slate-900">User & Shop Control (Blacklist)</h2>
                <div className="rounded-2xl bg-white border border-orange-100 overflow-hidden shadow-sm">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="bg-slate-50 text-slate-500 uppercase border-b border-orange-100">
                        <th className="p-4">Name</th>
                        <th className="p-4">Email</th>
                        <th className="p-4">Shop Username</th>
                        <th className="p-4">Status</th>
                        <th className="p-4 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-orange-100">
                      {users.map(u => (
                        <tr key={u._id} className="hover:bg-slate-50/60">
                          <td className="p-4 font-semibold text-slate-900">{u.name}</td>
                          <td className="p-4 text-slate-600">{u.email}</td>
                          <td className="p-4 text-orange-600">{u.shopUsername || 'N/A'}</td>
                          <td className="p-4">
                            <span className={`px-2 py-1 rounded text-[10px] font-bold ${u.isBlacklisted ? 'bg-red-50 text-red-600 border border-red-200' : 'bg-emerald-50 text-emerald-600 border border-emerald-200'}`}>
                              {u.isBlacklisted ? 'Blacklisted' : 'Active'}
                            </span>
                          </td>
                          <td className="p-4 text-right">
                            <button onClick={() => handleToggleUserStatus(u._id, u.isBlacklisted)} className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 ml-auto transition-all ${u.isBlacklisted ? 'bg-emerald-50 border border-emerald-200 text-emerald-600 hover:bg-emerald-100' : 'bg-red-50 border border-red-200 text-red-600 hover:bg-red-100'}`}>
                              <Ban className="w-3.5 h-3.5" /> {u.isBlacklisted ? 'Unblock' : 'Blacklist'}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}