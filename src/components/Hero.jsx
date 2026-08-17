'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingCart, Package, Sparkles, Loader2, ArrowRight, Megaphone, Search, X, Eye } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import Logo from './Logo';

export default function Hero() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const [searchQuery, setSearchQuery] = useState(''); 

  const adBanners = [
    {
      text: "দোকানপাট-এ স্বাগতম! সেরা বিক্রেতাদের প্রিমিয়াম পণ্য থেকে আজই আপনার পছন্দের কেনাকাটা করুন।",
      image: "/image/dokanpat.PNG"
    },
    {
      text: "সুপার ফাস্ট ও সিকিউর চেকআউট! পছন্দের জিনিস কার্টে যোগ করুন আর মুহূর্তেই অর্ডার কনফার্ম করুন।",
      image: "/image/dokanpat1.PNG"
    },
    {
      text: "বিশ্বস্ত সেলারদের এক্সক্লুসিভ কালেকশন! সেরা মূল্যে সেরা কোয়ালিটি পণ্য শুধু দোকানপাট-এ।",
      image: "/image/dokanpat2.PNG"
    },
    {
      text: "হ্যান্ডপিকড প্রিমিয়াম কালেকশন ও ইনস্ট্যান্ট শপিং অভিজ্ঞতা উপভোগ করুন দোকানপাট-এর সাথে।",
      image: "/image/dokanpat3.PNG"
    },
    {
      text: "ঘরে বসেই শত শত লোকাল ও ব্র্যান্ডেড শপ থেকে আপনার প্রয়োজনীয় পণ্য অর্ডার করুন দোকানপাট-এ।",
      image: "/image/dokanpat4.PNG"
    },
    {
      text: "নিরাপদ ও সহজ পেমেন্ট গেটওয়ে! ক্যাশ অন ডেলিভারি কিংবা অনলাইন পেমেন্টে কেনাকাটা করুন নির্দ্বিধায়।",
      image: "/image/dokanpat5.PNG"
    },
    {
      text: "প্রতিদিনের সেরা ডিসকাউন্ট ও অফার! বাজেট ফ্রেন্ডলি মূল্যে আপনার পছন্দের গ্যাজেট ও ফ্যাশন আইটেম কিনুন।",
      image: "/image/dokanpat6.PNG"
    },
    {
      text: "দেশজুড়ে দ্রুততম হোম ডেলিভারি সার্ভিস! আপনার অর্ডারকৃত পণ্য পৌঁছে যাবে একদম নিরাপদে আপনার দোরগোড়ায়।",
      image: "/image/dokanpat7.PNG"
    },
    {
      text: "যাচাইকৃত ও বিশ্বস্ত ভেন্ডরদের আসল পণ্যের নিশ্চয়তা। নকল বা লো-কোয়ালিটি পণ্যের কোনো সুযোগ নেই এখানে।",
      image: "/image/dokanpat8.PNG"
    },
    {
      text: "আপনার নিজস্ব দোকান বা অনলাইন শপ খুলুন দোকানপাট-এ খুব সহজেই এবং পৌঁছে যান লক্ষাধিক ক্রেতার কাছে।",
      image: "/image/dokanpat9.PNG"
    },
    {
      text: "২৪/৭ ডেডিকেটেড কাস্টমার সাপোর্ট! যেকোনো প্রশ্ন বা সহায়তায় আমরা সবসময় আছি আপনার পাশে।",
      image: "/image/dokanpat10.PNG"
    },
  ];

  const [currentAdIndex, setCurrentAdIndex] = useState(0);

  useEffect(() => {
    const adInterval = setInterval(() => {
      setCurrentAdIndex((prevIndex) => (prevIndex + 1) % adBanners.length);
    }, 4500); 

    return () => clearInterval(adInterval);
  }, [adBanners.length]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('store_cart')) || [];
    setCart(savedCart);

    async function fetchAllProducts() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`);
        const data = await res.json();
        
        if (res.ok) {
          const fetchedProducts = Array.isArray(data) ? data : data.products || data.data || [];
          const shuffledProducts = [...fetchedProducts].sort(() => Math.random() - 0.5);
          setProducts(shuffledProducts);
        } else {
          throw new Error(data.message || 'Failed to fetch products');
        }
      } catch (error) {
        toast.error('Could not load store products!', {
          style: { background: '#ffffff', color: '#1e293b', border: '1px solid #ffedd5' },
        });
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }
    fetchAllProducts();
  }, []);

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
    window.dispatchEvent(new Event('storage'));

    toast.success(`${product.name} added to cart!`, {
      style: { background: '#ffffff', color: '#1e293b', border: '1px solid #ffedd5' },
    });
  };

  const filteredProducts = products.filter((product) => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <Toaster position="top-right" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-white border border-orange-100 p-6 sm:p-10 rounded-3xl shadow-md items-center">
          
          <div className="lg:col-span-7 space-y-5">
            
            <div className="space-y-2">
             <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-slate-900 flex flex-col sm:flex-row gap-3 items-start sm:items-center">
  Welcome to <p><span className="text-orange-600">Dokan</span>pat</p>
</h1>
              <p className="text-xs sm:text-sm text-slate-600 max-w-xl leading-relaxed">
                Browse top-tier items from our sellers, add them to your cart, and proceed to instant checkout.
              </p>
            </div>

            <div className="flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-orange-50/60 border border-orange-100 text-slate-700 text-xs sm:text-sm font-semibold shadow-inner overflow-hidden w-full">
              <Megaphone className="w-5 h-5 text-orange-600 shrink-0 animate-bounce" />
              <div className="h-6 flex items-center relative w-full overflow-hidden">
                <span 
                  key={currentAdIndex} 
                  className="absolute w-full transition-all duration-700 truncate text-slate-700"
                >
                  {adBanners[currentAdIndex].text}
                </span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative h-60 sm:h-72 w-full rounded-2xl overflow-hidden border border-orange-100 bg-slate-100 shadow-md group">
            {adBanners.map((banner, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-all duration-1000 ease-in-out transform ${
                  index === currentAdIndex ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-105 z-0 pointer-events-none'
                }`}
              >
                <img 
                  src={banner.image} 
                  alt={`MarketPulse Banner ${index + 1}`} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent flex items-end p-4">
                  <span className="text-[11px] font-bold text-white bg-orange-600 px-3.5 py-1 rounded-full shadow-md">
                      #{index + 1}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-12 flex flex-col sm:flex-row items-center justify-between gap-4 bg-orange-50/40 border border-orange-100 px-6 py-4 rounded-2xl mt-2">
            <div className="flex items-center gap-4">
              <Link href="/cart" className="relative flex items-center gap-2">
                <ShoppingCart className="w-6 h-6 text-orange-600" />
                {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-600 text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Link>
              <div>
                <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Cart Total</p>
                <p className="text-base font-black text-slate-900">৳{totalPrice.toFixed(2)}</p>
              </div>
            </div>

            {totalItems > 0 && (
              <Link href="/checkout" className="w-full sm:w-auto px-6 py-2.5 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white text-xs font-semibold rounded-xl transition-all flex items-center justify-center gap-1 shadow-md shadow-orange-500/20">
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            )}
          </div>

        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-12 space-y-8">
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Available Products</h2>

          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search products by name or category..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-10 py-2.5 bg-white border border-orange-100 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-orange-500 transition-all shadow-sm"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <Loader2 className="w-8 h-8 text-orange-600 animate-spin" />
            <p className="text-xs text-slate-500">Loading products...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-white border border-orange-100 rounded-3xl p-8 space-y-3 shadow-sm">
            <Package className="w-12 h-12 text-orange-300 mx-auto" />
            <h3 className="text-base font-bold text-slate-900">No products found</h3>
            <p className="text-xs text-slate-500">
              {searchQuery ? `No items match "${searchQuery}"` : "Sellers haven't published any items to the store yet."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product, index) => (
              <div 
                key={product._id} 
                style={{ animationDelay: `${index * 100}ms` }}
                className="bg-white border border-orange-100 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between group hover:border-orange-300 hover:shadow-md transition-all"
              >
                <div>
                  <div className="relative h-52 w-full bg-slate-100 overflow-hidden">
                    <img 
                      src={product.image || 'https://via.placeholder.com/400'} 
                      alt={product.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                    <span className="absolute top-3 right-3 px-3 py-1 bg-white/90 border border-orange-100 backdrop-blur-md rounded-full text-[10px] font-semibold text-orange-600 uppercase tracking-wider shadow-sm">
                      {product.category}
                    </span>
                  </div>

                  <div className="p-5 space-y-2">
                    <h3 className="font-bold text-slate-900 text-base truncate">{product.name}</h3>
                    <p className="text-xs text-slate-500 line-clamp-2">{product.description || 'No description provided.'}</p>
                    
                    <div className="flex items-center justify-between pt-3">
                      <span className="text-lg font-black text-orange-600">৳{Number(product.price).toFixed(2)}</span>
                      <span className="text-xs text-slate-400">Stock: {product.stock}</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 border-t border-orange-50 bg-orange-50/30">
                 <div className="p-4 border-t border-orange-50 bg-orange-50/30 space-y-2">
                  <Link 
                    href={`/products/${product._id}`}
                    className="w-full py-2 px-4 bg-white border border-orange-200 hover:bg-orange-50 text-slate-700 text-xs font-semibold rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm"
                  >
                    <Eye className="w-4 h-4 text-orange-600" />
                    <span>View Details</span>
                  </Link>

                  <button 
                    onClick={() => addToCart(product)}
                    className="w-full py-2.5 px-4 bg-orange-600 hover:bg-orange-500 text-white text-xs font-semibold rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm shadow-orange-500/20"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span>Add to Cart</span>
                  </button>
                </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}