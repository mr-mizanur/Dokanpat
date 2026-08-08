'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingCart, Trash2, Plus, Minus, ArrowLeft, ArrowRight, ShoppingBag } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

export default function CartPage() {
  const [cart, setCart] = useState([]);

 
  useEffect(() => {
    const savedCart = localStorage.getItem('store_cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error('Failed to parse cart data', error);
      }
    }
  }, []);

 
  const updateCartStorage = (updatedCart) => {
    setCart(updatedCart);
    localStorage.setItem('store_cart', JSON.stringify(updatedCart));
  };

 
  const handleQuantityChange = (productId, delta) => {
    const updatedCart = cart.map((item) => {
      if (item._id === productId) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : null;
      }
      return item;
    }).filter(Boolean);

    updateCartStorage(updatedCart);
  };

  
  const handleRemoveItem = (productId) => {
    const updatedCart = cart.filter((item) => item._id !== productId);
    updateCartStorage(updatedCart);
    toast.success('Item removed from cart', {
      style: { background: '#ffffff', color: '#1e293b', border: '1px solid #ffedd5' },
    });
  };

 
  const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shipping = cart.length > 0 ? 10.00 : 0; 
  const total = subtotal + (cart.length > 0 ? shipping : 0);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 p-4 sm:p-8">
      <Toaster position="top-right" />

      <div className="max-w-5xl mx-auto space-y-6">
        
        
        <div className="flex items-center justify-between bg-white border border-orange-100 p-6 rounded-2xl shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-orange-50 border border-orange-200 flex items-center justify-center text-orange-600">
              <ShoppingCart className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900">Shopping Cart</h1>
              <p className="text-xs sm:text-sm text-slate-500">Review your selected items before checkout</p>
            </div>
          </div>

          <Link href="/" className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold bg-slate-50 border border-orange-100 text-slate-600 hover:text-orange-600 transition-all">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Store</span>
          </Link>
        </div>

       
        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white border border-orange-100 rounded-2xl text-center p-6 space-y-4 shadow-sm">
            <div className="w-16 h-16 rounded-full bg-orange-50 border border-orange-200 flex items-center justify-center text-orange-400">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-bold text-slate-900">Your cart is empty</h3>
              <p className="text-xs text-slate-500 max-w-sm">Looks like you haven't added anything to your cart yet. Explore our store and find top items.</p>
            </div>
            <Link href="/" className="px-5 py-2.5 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white text-xs font-semibold rounded-xl transition-all shadow-md shadow-orange-500/20">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => (
                <div key={item._id} className="bg-white border border-orange-100 p-4 rounded-2xl shadow-sm flex items-center justify-between gap-4">
                  
                  <div className="flex items-center gap-4">
                    <img 
                      src={item.image || 'https://via.placeholder.com/150'} 
                      alt={item.name} 
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover bg-slate-100 border border-orange-100" 
                    />
                    <div className="space-y-1">
                      <h3 className="font-bold text-slate-900 text-sm sm:text-base line-clamp-1">{item.name}</h3>
                      <p className="text-xs text-orange-600 font-bold">৳{Number(item.price).toFixed(2)}</p>
                      <span className="text-[10px] px-2 py-0.5 bg-orange-50 border border-orange-100 rounded-md text-orange-600 uppercase">
                        {item.category}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                  
                    <div className="flex items-center gap-2 bg-slate-50 border border-orange-100 p-1 rounded-xl">
                      <button 
                        onClick={() => handleQuantityChange(item._id, -1)}
                        className="p-1 rounded-lg hover:bg-orange-50 text-slate-500 hover:text-orange-600 transition-all"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="text-xs font-bold w-5 text-center text-slate-800">{item.quantity}</span>
                      <button 
                        onClick={() => handleQuantityChange(item._id, 1)}
                        className="p-1 rounded-lg hover:bg-orange-50 text-slate-500 hover:text-orange-600 transition-all"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                   
                    <button 
                      onClick={() => handleRemoveItem(item._id)}
                      className="p-2 rounded-xl bg-red-50 border border-red-200 text-red-500 hover:bg-red-100 transition-all"
                      title="Remove Item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                </div>
              ))}
            </div>

            
            <div className="bg-white border border-orange-100 p-6 rounded-2xl shadow-sm space-y-4 h-fit">
              <h3 className="text-base font-bold text-slate-900 pb-3 border-b border-orange-100">Order Summary</h3>
              
              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-slate-500">
                  <span>Subtotal</span>
                  <span className="text-slate-800 font-semibold">৳{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Estimated Shipping</span>
                  <span className="text-slate-800 font-semibold">৳{shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-500 pt-2 border-t border-orange-100 text-sm">
                  <span className="font-bold text-slate-900">Total</span>
                  <span className="font-black text-orange-600">৳{total.toFixed(2)}</span>
                </div>
              </div>

              <Link 
                href="/checkout" 
                className="w-full py-3 px-4 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white text-xs font-semibold rounded-xl shadow-md shadow-orange-500/20 transition-all flex items-center justify-center gap-2"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}