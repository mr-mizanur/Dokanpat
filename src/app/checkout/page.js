'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ShoppingBag, MapPin, Phone, User, CheckCircle2, ArrowLeft, Loader2, Mail } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import Link from 'next/link';
import { useSession } from '@/lib/auth-client'; 

export default function CheckoutPage() {
  const router = useRouter();
  const { data: session } = useSession(); 
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const [shippingInfo, setShippingInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    paymentMethod: 'cod' 
  });


  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('store_cart')) || [];
    if (savedCart.length === 0) {
      toast.error('Your cart is empty!');
      router.push('/');
      return;
    }
    setCart(savedCart);

   
    if (session?.user) {
      setShippingInfo((prev) => ({
        ...prev,
        name: session.user.name || '',
        email: session.user.email || '',
        phone: session.user.phone || '',      
        address: session.user.address || ''    
      }));
    }
  }, [session, router]);

  const subTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shippingFee = 120; 
  const totalPrice = subTotal + shippingFee;

 
  const handleCheckout = async (e) => {
    e.preventDefault();
    if (cart.length === 0) return;

    if (!shippingInfo.address.trim()) {
      toast.error('Delivery address is required!');
      return;
    }

    setLoading(true);

    const orderData = {
      buyerEmail: shippingInfo.email,
      buyerName: shippingInfo.name,
      buyerPhone: shippingInfo.phone,
      items: cart,
      subTotal: subTotal,
      shippingFee: shippingFee,
      totalAmount: totalPrice,
      shippingDetails: {
        address: shippingInfo.address,
        paymentMethod: 'Cash on Delivery'
      },
      status: 'Pending'
    };

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderData)
      });

      const data = await res.json();

      if (res.ok) {
        toast.success('Order placed successfully! 🎉', {
          style: { background: '#090d16', color: '#fff', border: '1px solid #1e293b' }
        });

        localStorage.removeItem('store_cart'); 

        setTimeout(() => {
          router.push('/dashboard/buyer'); 
        }, 1500);
      } else {
        throw new Error(data.message || 'Failed to place order');
      }
    } catch (error) {
      toast.error(error.message || 'Something went wrong!', {
        style: { background: '#090d16', color: '#fff', border: '1px solid #1e293b' }
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#7f8c8d] text-slate-100 py-12 px-4 sm:px-8">
      <Toaster position="top-right" />

      <div className="max-w-6xl mx-auto space-y-8">
        
       
        <div className="flex items-center justify-between bg-slate-900/80 border border-slate-800/80 p-6 rounded-2xl backdrop-blur-xl">
          <div className="space-y-1">
            <h1 className="text-2xl font-black tracking-tight text-slate-100 flex items-center gap-2">
              <ShoppingBag className="w-6 h-6 text-blue-400" />
              <span>Secure Checkout</span>
            </h1>
            <p className="text-xs text-slate-400">Review your details and confirm your delivery location.</p>
          </div>
          <Link href="/cart" className="flex items-center gap-2 px-4 py-2 bg-slate-950 border border-slate-800 text-slate-300 hover:text-white rounded-xl text-xs font-semibold transition-all">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Cart</span>
          </Link>
        </div>

       
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
     
          <div className="lg:col-span-7 bg-slate-900/80 border border-slate-800/80 p-6 sm:p-8 rounded-2xl backdrop-blur-xl shadow-xl space-y-6">
            <h2 className="text-lg font-bold text-slate-200">Billing & Shipping Details</h2>

            <form onSubmit={handleCheckout} className="space-y-4">
              
             
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-600" />
                  <input 
                    type="text" 
                    value={shippingInfo.name}
                    readOnly
                    className="w-full pl-10 pr-4 py-3 bg-slate-900 border border-slate-800/80 rounded-xl text-sm text-slate-400 cursor-not-allowed focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-600" />
                    <input 
                      type="email" 
                      value={shippingInfo.email}
                      readOnly
                      className="w-full pl-10 pr-4 py-3 bg-slate-900 border border-slate-800/80 rounded-xl text-sm text-slate-400 cursor-not-allowed focus:outline-none"
                    />
                  </div>
                </div>

                
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-600" />
                    <input 
                      type="tel" 
                      value={shippingInfo.phone}
                      readOnly
                      className="w-full pl-10 pr-4 py-3 bg-slate-900 border border-slate-800/80 rounded-xl text-sm text-slate-400 cursor-not-allowed focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Delivery Address</label>
                  <span className="text-[11px] text-blue-400 font-medium bg-blue-500/10 px-2 py-0.5 rounded-full">Customizable</span>
                </div>
                <div className="relative">
                  <MapPin className="absolute left-3.5 top-3.5 w-4 h-4 text-blue-400" />
                  <textarea 
                    rows="3"
                    placeholder="Enter your customized delivery address..."
                    value={shippingInfo.address}
                    onChange={(e) => setShippingInfo({...shippingInfo, address: e.target.value})}
                    required
                    className="w-full pl-10 pr-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-blue-500 transition-all resize-none shadow-inner"
                  />
                </div>
                <p className="text-[10px] text-slate-500 mt-1">* Your default address is loaded, but you can edit it for this specific order.</p>
              </div>

         
              <div className="space-y-1.5 pt-2">
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Payment Method</label>
                <div className="p-4 rounded-xl border border-blue-500 bg-blue-600/10 text-xs font-bold text-blue-400 flex items-center justify-between">
                  <span>Cash on Delivery (COD)</span>
                  <CheckCircle2 className="w-4 h-4" />
                </div>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full py-3.5 px-4 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-xl shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-2 mt-4"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <span>Confirm Order • ৳ {totalPrice.toFixed(2)}</span>}
              </button>
            </form>
          </div>

          <div className="lg:col-span-5 bg-slate-900/80 border border-slate-800/80 p-6 sm:p-8 rounded-2xl backdrop-blur-xl shadow-xl space-y-6 h-fit">
            <h2 className="text-lg font-bold text-slate-200">Order Summary</h2>

            <div className="space-y-4 max-h-72 overflow-y-auto pr-1">
              {cart.map((item) => (
                <div key={item._id || item.id} className="flex items-center justify-between gap-4 bg-slate-950 p-3 rounded-xl border border-slate-800/60">
                  <div className="flex items-center gap-3">
                    <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover border border-slate-800" />
                    <div>
                      <h4 className="text-xs font-bold text-slate-200 truncate max-w-[150px]">{item.name}</h4>
                      <p className="text-[11px] text-slate-400">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <span className="text-xs font-black text-blue-400">৳ {(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-slate-800 pt-4 space-y-2 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Subtotal</span>
                <span>৳ {subTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Shipping Fee</span>
                <span className="text-slate-200 font-semibold">৳ 120.00</span>
              </div>
              <div className="flex justify-between text-slate-200 text-sm font-black pt-2 border-t border-slate-800/80">
                <span>Total Amount</span>
                <span className="text-blue-400">৳ {totalPrice.toFixed(2)}</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}