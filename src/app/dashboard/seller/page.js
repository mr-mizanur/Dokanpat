'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Store, Package, ShoppingBag, DollarSign, PlusCircle, TrendingUp, Users, ArrowUpRight, ShieldCheck, Loader2, ExternalLink } from 'lucide-react';
import { useSession } from '@/lib/auth-client'; 

export default function SellerDashboard() {
  const { data: session, isPending } = useSession();
  const [loading, setLoading] = useState(true);
  
  const [stats, setStats] = useState({
    totalRevenue: '৳ 0.00',
    totalOrders: '0',
    totalProducts: '0',
    activeCustomers: '0',
  });

  const [recentProducts, setRecentProducts] = useState([]);

  useEffect(() => {
    const fetchSellerData = async () => {
      if (!session?.user?.email) return; 

      try {
        setLoading(true);
        const sellerEmail = session.user.email;

        const productRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products?sellerEmail=${sellerEmail}`);
        const productData = await productRes.json();

        const orderRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/orders/seller?email=${sellerEmail}`);
        const orderData = await orderRes.json();

        if (productData.success && orderData.success) {
          const products = productData.products || [];
          const orders = orderData.orders || [];

          const revenue = orders.reduce((acc, order) => {
            const sellerItemsTotal = order.items
              .filter(item => item.sellerEmail === sellerEmail)
              .reduce((sum, item) => sum + (item.price * item.quantity), 0);
            return acc + sellerItemsTotal;
          }, 0);

          const uniqueCustomers = new Set(orders.map(order => order.buyerEmail)).size;

          setStats({
            totalRevenue: `৳ ${revenue.toLocaleString()}`,
            totalOrders: orders.length.toString(),
            totalProducts: products.length.toString(),
            activeCustomers: uniqueCustomers.toString(),
          });

          setRecentProducts(products.slice(0, 5));
        }
      } catch (error) {
        console.error("Failed to fetch seller metrics:", error);
      } finally {
        setLoading(false);
      }
    };

    if (session?.user?.role === 'seller') {
      fetchSellerData();
    }
  }, [session]);


  if (isPending) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

 
  if (!session?.user || session.user.role !== 'seller') {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex">
      
     
      <aside className="w-64 border-r border-slate-800/80 bg-slate-900/50 backdrop-blur-xl hidden md:flex flex-col justify-between p-6">
        <div className="space-y-6">
          <div className="flex items-center gap-2 px-2">
            <div className="w-9 h-9 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <Store className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-black tracking-wider bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">MarketPulse</h2>
              <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Seller Portal</p>
            </div>
          </div>

          <nav className="space-y-1.5 pt-4">
            <Link href="/dashboard/seller" className="flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold bg-blue-600/20 border border-blue-500/30 text-blue-400 shadow-lg shadow-blue-500/10">
              <TrendingUp className="w-4 h-4" />
              <span>Dashboard Overview</span>
            </Link>
            <Link href="/dashboard/seller/products" className="flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold text-slate-400 hover:text-slate-200 hover:bg-slate-900 transition-all">
              <Package className="w-4 h-4" />
              <span>My Products</span>
            </Link>
            <Link href="/dashboard/seller/orders" className="flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold text-slate-400 hover:text-slate-200 hover:bg-slate-900 transition-all">
              <ShoppingBag className="w-4 h-4" />
              <span>Orders</span>
            </Link>
          </nav>
        </div>

        <div className="pt-4 border-t border-slate-800 space-y-2">
          <Link href="/" className="w-full flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-slate-200 hover:bg-slate-900 transition-colors">
            <span>← Back to Store</span>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 sm:p-10 space-y-8 overflow-y-auto">
        
        {/* Top Header with Public Store Link */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800/80">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-100 flex items-center gap-2">
              <span>Seller Dashboard</span>
              <ShieldCheck className="w-6 h-6 text-blue-400" />
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Welcome back, <span className="text-blue-400 font-semibold">{session?.user?.name || 'Seller'}</span>! Here is your store summary.
            </p>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            {/* সেলারের পাবলিক শপ পেজের লিংক বাটন */}
            {session?.user?.shopUsername && (
              <Link 
                href={`/shop/${session.user.shopUsername}`}
                target="_blank"
                className="px-4 py-3 rounded-xl text-xs font-bold text-blue-400 bg-blue-600/10 border border-blue-500/30 hover:bg-blue-600/20 transition-all flex items-center gap-2"
              >
                <Store className="w-4 h-4" />
                <span>Visit Public Store</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            )}

            <Link 
              href="/dashboard/seller/add-product" 
              className="px-5 py-3 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center gap-2"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Add New Product</span>
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-xl space-y-2 shadow-xl">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-xs font-semibold uppercase tracking-wider">Total Revenue</span>
              <div className="p-2 rounded-xl bg-blue-600/10 text-blue-400 border border-blue-500/20"><DollarSign className="w-4 h-4" /></div>
            </div>
            <p className="text-2xl font-black text-slate-100">{loading ? <Loader2 className="w-5 h-5 animate-spin text-blue-400" /> : stats.totalRevenue}</p>
            <p className="text-[10px] text-emerald-400 flex items-center gap-1 font-semibold">
              <ArrowUpRight className="w-3 h-3" /> Your store earnings
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-xl space-y-2 shadow-xl">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-xs font-semibold uppercase tracking-wider">Total Orders</span>
              <div className="p-2 rounded-xl bg-indigo-600/10 text-indigo-400 border border-indigo-500/20"><ShoppingBag className="w-4 h-4" /></div>
            </div>
            <p className="text-2xl font-black text-slate-100">{loading ? <Loader2 className="w-5 h-5 animate-spin text-indigo-400" /> : stats.totalOrders}</p>
            <p className="text-[10px] text-emerald-400 flex items-center gap-1 font-semibold">
              <ArrowUpRight className="w-3 h-3" /> Orders containing your items
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-xl space-y-2 shadow-xl">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-xs font-semibold uppercase tracking-wider">Products Listed</span>
              <div className="p-2 rounded-xl bg-purple-600/10 text-purple-400 border border-purple-500/20"><Package className="w-4 h-4" /></div>
            </div>
            <p className="text-2xl font-black text-slate-100">{loading ? <Loader2 className="w-5 h-5 animate-spin text-purple-400" /> : stats.totalProducts}</p>
            <p className="text-[10px] text-slate-400 font-semibold">Your active catalog</p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-xl space-y-2 shadow-xl">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-xs font-semibold uppercase tracking-wider">Total Customers</span>
              <div className="p-2 rounded-xl bg-teal-600/10 text-teal-400 border border-teal-500/20"><Users className="w-4 h-4" /></div>
            </div>
            <p className="text-2xl font-black text-slate-100">{loading ? <Loader2 className="w-5 h-5 animate-spin text-teal-400" /> : stats.activeCustomers}</p>
            <p className="text-[10px] text-emerald-400 flex items-center gap-1 font-semibold">
              <ArrowUpRight className="w-3 h-3" /> Buyers of your items
            </p>
          </div>
        </div>

        {/* Recent Products Table */}
        <div className="space-y-4 pt-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-100 tracking-tight">Your Recent Products</h2>
            <Link href="/dashboard/seller/products" className="text-xs font-semibold text-blue-400 hover:underline">
              View All →
            </Link>
          </div>

          <div className="rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-xl overflow-hidden shadow-xl">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-16 gap-3 text-slate-400">
                <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
                <p className="text-xs">Loading your store inventory...</p>
              </div>
            ) : recentProducts.length === 0 ? (
              <div className="text-center py-16 text-slate-400 text-xs">
                No products found. Click &quot;Add New Product&quot; to list your items.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-800 text-[11px] font-extrabold uppercase tracking-wider text-slate-400 bg-slate-950/40">
                      <th className="py-3.5 px-6">Product Name</th>
                      <th className="py-3.5 px-6">Category</th>
                      <th className="py-3.5 px-6">Price</th>
                      <th className="py-3.5 px-6">Stock</th>
                      <th className="py-3.5 px-6">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-xs font-medium text-slate-300">
                    {recentProducts.map((product) => (
                      <tr key={product._id} className="hover:bg-slate-900/45 transition-colors">
                        <td className="py-4 px-6 font-semibold text-slate-200 flex items-center gap-3">
                          {product.image && (
                            <img src={product.image} alt={product.name} className="w-9 h-9 rounded-lg object-cover border border-slate-800" />
                          )}
                          <span className="truncate max-w-[200px]">{product.name}</span>
                        </td>
                        <td className="py-4 px-6 text-slate-400">{product.category || 'General'}</td>
                        <td className="py-4 px-6 font-bold text-blue-400">৳ {product.price}</td>
                        <td className="py-4 px-6">{product.stock} units</td>
                        <td className="py-4 px-6">
                          <span className={`inline-block px-2.5 py-1 rounded-lg text-[10px] font-extrabold uppercase ${
                            (product.stock || 0) > 0 
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                              : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                          }`}>
                            {(product.stock || 0) > 0 ? 'Active' : 'Out of Stock'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

      </main>
    </div>
  );
}