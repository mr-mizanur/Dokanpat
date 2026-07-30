//'use client';
//
//import { useState } from 'react';
//import Link from 'next/link';
//import { useRouter } from 'next/navigation';
//import { Store, Mail, Lock, User, Image as ImageIcon, ArrowRight, ShieldCheck, ShoppingBag } from 'lucide-react';
//import toast, { Toaster } from 'react-hot-toast';
//import { signUp } from '@/lib/auth-client';
//
//export default function RegisterPage() {
//  const router = useRouter();
//  const [formData, setFormData] = useState({ 
//    name: '', 
//    email: '', 
//    password: '', 
//    role: 'buyer', 
//    image: null 
//  });
//  const [previewImage, setPreviewImage] = useState(null);
//  const [loading, setLoading] = useState(false);
//
//  const handleImageChange = (e) => {
//    const file = e.target.files[0];
//    if (file) {
//      setFormData({ ...formData, image: file });
//      setPreviewImage(URL.createObjectURL(file));
//    }
//  };
//
//  const handleSubmit = async (e) => {
//    e.preventDefault();
//    setLoading(true);
//
//    try {
//      let imageUrl = '';
//
//      if (formData.image) {
//        const imageFormData = new FormData();
//        imageFormData.append('image', formData.image);
//
//        const imgbbRes = await fetch(`https://api.imgbb.com/1/upload?key=b169b50f1aa774fb19ee6f6e408f5819`, {
//          method: 'POST',
//          body: imageFormData,
//        });
//        const imgbbData = await imgbbRes.json();
//        
//        if (imgbbData.success) {
//          imageUrl = imgbbData.data.url;
//        } else {
//          throw new Error('Image upload failed');
//        }
//      }
//
//      // Better Auth দিয়ে সাইন আপ (role ফিল্ডটি এভাবে পাঠাতে হবে)
//      const { data, error } = await signUp.email({
//        email: formData.email,
//        password: formData.password,
//        name: formData.name,
//        image: imageUrl || undefined,
//        role: formData.role, // কাস্টম ফিল্ড এখানে যুক্ত হলো
//      }, {
//        onRequest: () => {
//          setLoading(true);
//        },
//        onSuccess: () => {
//          toast.success(`Successfully registered as ${formData.role.toUpperCase()}! 🎉`, {
//            style: {
//              background: '#090d16',
//              color: '#fff',
//              border: '1px solid #1e293b',
//            },
//          });
//
//          setTimeout(() => {
//            if (formData.role === 'seller') {
//              router.push('/dashboard/seller');
//            } else {
//              router.push('/');
//            }
//            router.refresh();
//          }, 1000);
//        },
//        onError: (ctx) => {
//          throw new Error(ctx.error.message || 'Registration failed');
//        },
//      });
//
//      if (error) {
//        throw new Error(error.message);
//      }
//
//    } catch (error) {
//      toast.error(error.message || 'Something went wrong. Please try again!', {
//        style: {
//          background: '#090d16',
//          color: '#fff',
//          border: '1px solid #1e293b',
//        },
//      });
//    } finally {
//      setLoading(false);
//    }
//  };
//
//  return (
//    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
//      <Toaster position="top-right" />
//      
//      <div className="max-w-md w-full space-y-6 bg-slate-900/80 border border-slate-800/80 p-8 rounded-2xl backdrop-blur-xl shadow-2xl">
//        
//        <div className="text-center space-y-2">
//          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-600/10 border border-blue-500/20 text-blue-400 mb-1">
//            <Store className="w-6 h-6" />
//          </div>
//          <h1 className="text-2xl font-black tracking-tight text-slate-100">Create Account</h1>
//          <p className="text-xs text-slate-400">Join MarketPulse as a Seller or Buyer</p>
//        </div>
//
//        <form onSubmit={handleSubmit} className="space-y-4">
//          <div className="space-y-1.5">
//            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Select Account Type</label>
//            <div className="grid grid-cols-2 gap-3">
//              <button
//                type="button"
//                onClick={() => setFormData({ ...formData, role: 'buyer' })}
//                className={`py-2.5 px-4 rounded-xl text-xs font-bold border transition-all flex items-center justify-center gap-2 ${
//                  formData.role === 'buyer'
//                    ? 'bg-blue-600/20 border-blue-500 text-blue-400 shadow-lg shadow-blue-500/10'
//                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
//                }`}
//              >
//                <ShoppingBag className="w-4 h-4" />
//                <span>Buyer</span>
//              </button>
//
//              <button
//                type="button"
//                onClick={() => setFormData({ ...formData, role: 'seller' })}
//                className={`py-2.5 px-4 rounded-xl text-xs font-bold border transition-all flex items-center justify-center gap-2 ${
//                  formData.role === 'seller'
//                    ? 'bg-blue-600/20 border-blue-500 text-blue-400 shadow-lg shadow-blue-500/10'
//                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
//                }`}
//              >
//                <ShieldCheck className="w-4 h-4" />
//                <span>Seller</span>
//              </button>
//            </div>
//          </div>
//
//          <div className="space-y-1.5">
//            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Full Name</label>
//            <div className="relative">
//              <User className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-500" />
//              <input 
//                type="text" 
//                placeholder="Mizanur Rahman"
//                value={formData.name}
//                onChange={(e) => setFormData({...formData, name: e.target.value})}
//                required
//                className="w-full pl-10 pr-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-blue-500 transition-all"
//              />
//            </div>
//          </div>
//
//          <div className="space-y-1.5">
//            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Email Address</label>
//            <div className="relative">
//              <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-500" />
//              <input 
//                type="email" 
//                placeholder="name@example.com"
//                value={formData.email}
//                onChange={(e) => setFormData({...formData, email: e.target.value})}
//                required
//                className="w-full pl-10 pr-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-blue-500 transition-all"
//              />
//            </div>
//          </div>
//
//          <div className="space-y-1.5">
//            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Password</label>
//            <div className="relative">
//              <Lock className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-500" />
//              <input 
//                type="password" 
//                placeholder="••••••••"
//                value={formData.password}
//                onChange={(e) => setFormData({...formData, password: e.target.value})}
//                required
//                className="w-full pl-10 pr-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-blue-500 transition-all"
//              />
//            </div>
//          </div>
//
//          <div className="space-y-1.5">
//            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
//              {formData.role === 'seller' ? 'Store Logo / Profile Picture' : 'Profile Picture'}
//            </label>
//            <div className="flex items-center gap-4">
//              <label className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-400 hover:border-slate-700 cursor-pointer transition-all">
//                <ImageIcon className="w-4 h-4 text-slate-500" />
//                <span className="truncate">{formData.image ? formData.image.name : 'Choose image...'}</span>
//                <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
//              </label>
//              {previewImage && (
//                <img src={previewImage} alt="Preview" className="w-11 h-11 rounded-xl object-cover border border-slate-700" />
//              )}
//            </div>
//          </div>
//
//          <button 
//            type="submit" 
//            disabled={loading}
//            className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-sm font-semibold rounded-xl shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-2 mt-2"
//          >
//            <span>{loading ? 'Creating Account...' : `Sign Up as ${formData.role.toUpperCase()}`}</span>
//            <ArrowRight className="w-4 h-4" />
//          </button>
//        </form>
//
//        <div className="text-center text-xs text-slate-400 pt-1">
//          Already have an account?{' '}
//          <Link href="/login" className="text-blue-400 font-semibold hover:underline">
//            Sign In
//          </Link>
//        </div>
//
//      </div>
//    </div>
//  );
//}




'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Store, Mail, Lock, User, Phone, Image as ImageIcon, ArrowRight, ShieldCheck, ShoppingBag, MapPin, Loader2, Tag } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import { signUp } from '@/lib/auth-client';

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    password: '', 
    phone: '', 
    role: 'buyer', 
    image: null,
    address: '',
    shopName: '',       // দোকানের নাম
    shopUsername: ''    // অটো-জেনারেটেড শপ ইউজারনেম
  });
  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [locating, setLocating] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  // দোকানের নাম থেকে অটো ইউজারনেম জেনারেট করার ফাংশন
  const handleShopNameChange = (e) => {
    const name = e.target.value;
    // স্পেস রিমুভ করে লোয়ারকেস এবং স্পেশাল ক্যারেক্টার বাদ দিয়ে ইউজারনেম তৈরি
    const generatedUsername = name
      .toLowerCase()
      .trim()
      .replace(/[^\w\s]/gi, '')
      .replace(/\s+/g, '_');

    setFormData({
      ...formData,
      shopName: name,
      shopUsername: generatedUsername ? `${generatedUsername}_${Math.floor(100 + Math.random() * 900)}` : ''
    });
  };

  // ব্রাউজার থেকে অটো লোকেশন ডিটেক্ট করার ফাংশন
  const handleAutoDetectLocation = () => {
    if (!navigator.geolocation) {
      toast.error('Geolocation is not supported by your browser');
      return;
    }

    setLocating(true);
    toast.loading('Detecting your location...', { id: 'locating' });

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
          const data = await res.json();

          if (data && data.display_name) {
            setFormData((prev) => ({ ...prev, address: data.display_name }));
            toast.success('Location detected successfully! 📍', { id: 'locating' });
          } else {
            throw new Error('Failed to resolve address');
          }
        } catch (error) {
          setFormData((prev) => ({ ...prev, address: `Lat: ${latitude}, Lng: ${longitude}` }));
          toast.success('Coordinates captured!', { id: 'locating' });
        } finally {
          setLocating(false);
        }
      },
      (error) => {
        setLocating(false);
        toast.error('Unable to retrieve your location. Please check permissions.', { id: 'locating' });
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.phone.trim()) {
      toast.error('Phone number is required!');
      return;
    }
    if (!formData.address.trim()) {
      toast.error('Shipping address is required! Please auto-detect or type your address.');
      return;
    }

    // সেলার হলে শপ নেম বাধ্যতামূলক করা
    if (formData.role === 'seller' && !formData.shopName.trim()) {
      toast.error('Store name is required for sellers!');
      return;
    }

    setLoading(true);

    try {
      let imageUrl = '';

      if (formData.image) {
        const imageFormData = new FormData();
        imageFormData.append('image', formData.image);

        const imgbbRes = await fetch(`https://api.imgbb.com/1/upload?key=b169b50f1aa774fb19ee6f6e408f5819`, {
          method: 'POST',
          body: imageFormData,
        });
        const imgbbData = await imgbbRes.json();
        
        if (imgbbData.success) {
          imageUrl = imgbbData.data.url;
        } else {
          throw new Error('Image upload failed');
        }
      }

      // Better Auth দিয়ে সাইন আপ (shopName এবং shopUsername সহ)
      const { data, error } = await signUp.email({
        email: formData.email,
        password: formData.password,
        name: formData.name,
        phone: formData.phone,
        image: imageUrl || undefined,
        role: formData.role, 
        address: formData.address,
        shopName: formData.role === 'seller' ? formData.shopName : undefined,
        shopUsername: formData.role === 'seller' ? formData.shopUsername : undefined,
      }, {
        onRequest: () => {
          setLoading(true);
        },
        onSuccess: () => {
          toast.success(`Successfully registered as ${formData.role.toUpperCase()}! 🎉`, {
            style: {
              background: '#090d16',
              color: '#fff',
              border: '1px solid #1e293b',
            },
          });

          setTimeout(() => {
            if (formData.role === 'seller') {
              router.push('/dashboard/seller');
            } else {
              router.push('/');
            }
            router.refresh();
          }, 1000);
        },
        onError: (ctx) => {
          throw new Error(ctx.error.message || 'Registration failed');
        },
      });

      if (error) {
        throw new Error(error.message);
      }

    } catch (error) {
      toast.error(error.message || 'Something went wrong. Please try again!', {
        style: {
          background: '#090d16',
          color: '#fff',
          border: '1px solid #1e293b',
        },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Toaster position="top-right" />
      
      <div className="max-w-md w-full space-y-6 bg-slate-900/80 border border-slate-800/80 p-8 rounded-2xl backdrop-blur-xl shadow-2xl">
        
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-600/10 border border-blue-500/20 text-blue-400 mb-1">
            <Store className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-black tracking-tight text-slate-100">Create Account</h1>
          <p className="text-xs text-slate-400">Join MarketPulse as a Seller or Buyer</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Select Account Type</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, role: 'buyer' })}
                className={`py-2.5 px-4 rounded-xl text-xs font-bold border transition-all flex items-center justify-center gap-2 ${
                  formData.role === 'buyer'
                    ? 'bg-blue-600/20 border-blue-500 text-blue-400 shadow-lg shadow-blue-500/10'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Buyer</span>
              </button>

              <button
                type="button"
                onClick={() => setFormData({ ...formData, role: 'seller' })}
                className={`py-2.5 px-4 rounded-xl text-xs font-bold border transition-all flex items-center justify-center gap-2 ${
                  formData.role === 'seller'
                    ? 'bg-blue-600/20 border-blue-500 text-blue-400 shadow-lg shadow-blue-500/10'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Seller</span>
              </button>
            </div>
          </div>

          {/* সেলার সিলেক্ট করলে শপ নেম ফিল্ড শো করবে */}
          {formData.role === 'seller' && (
            <div className="space-y-3 p-4 bg-slate-950/60 border border-slate-800/80 rounded-xl">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Store Name <span className="text-red-500">*</span></label>
                <div className="relative">
                  <Store className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-500" />
                  <input 
                    type="text" 
                    placeholder="e.g. Mizan Gadgets Store"
                    value={formData.shopName}
                    onChange={handleShopNameChange}
                    required={formData.role === 'seller'}
                    className="w-full pl-10 pr-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-blue-500 transition-all"
                  />
                </div>
              </div>

              {formData.shopUsername && (
                <div className="flex items-center justify-between text-[11px] text-slate-400 bg-slate-900 px-3 py-2 rounded-lg border border-slate-800">
                  <span>Auto-generated Username:</span>
                  <strong className="text-blue-400 font-mono">@{formData.shopUsername}</strong>
                </div>
              )}
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Full Name</label>
            <div className="relative">
              <User className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-500" />
              <input 
                type="text" 
                placeholder="Mizanur Rahman"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
                className="w-full pl-10 pr-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-blue-500 transition-all"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-500" />
              <input 
                type="email" 
                placeholder="name@example.com"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
                className="w-full pl-10 pr-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-blue-500 transition-all"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Phone Number</label>
            <div className="relative">
              <Phone className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-500" />
              <input 
                type="tel" 
                placeholder="+880 1700000000"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                required
                className="w-full pl-10 pr-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-blue-500 transition-all"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Password</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-500" />
              <input 
                type="password" 
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                required
                className="w-full pl-10 pr-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-blue-500 transition-all"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Shipping Address <span className="text-red-500">*</span></label>
              <button
                type="button"
                onClick={handleAutoDetectLocation}
                disabled={locating}
                className="text-[11px] text-blue-400 hover:underline flex items-center gap-1 font-semibold"
              >
                {locating ? <Loader2 className="w-3 h-3 animate-spin" /> : <MapPin className="w-3 h-3" />}
                <span>Auto-detect Location</span>
              </button>
            </div>
            <div className="relative">
              <textarea 
                rows="2"
                placeholder="Click 'Auto-detect Location' or type address manually..."
                value={formData.address}
                onChange={(e) => setFormData({...formData, address: e.target.value})}
                required
                className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-blue-500 transition-all resize-none"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
              {formData.role === 'seller' ? 'Store Logo / Profile Picture' : 'Profile Picture'}
            </label>
            <div className="flex items-center gap-4">
              <label className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-400 hover:border-slate-700 cursor-pointer transition-all">
                <ImageIcon className="w-4 h-4 text-slate-500" />
                <span className="truncate">{formData.image ? formData.image.name : 'Choose image...'}</span>
                <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
              </label>
              {previewImage && (
                <img src={previewImage} alt="Preview" className="w-11 h-11 rounded-xl object-cover border border-slate-700" />
              )}
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-sm font-semibold rounded-xl shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-2 mt-2"
          >
            <span>{loading ? 'Creating Account...' : `Sign Up as ${formData.role.toUpperCase()}`}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center text-xs text-slate-400 pt-1">
          Already have an account?{' '}
          <Link href="/login" className="text-blue-400 font-semibold hover:underline">
            Sign In
          </Link>
        </div>

      </div>
    </div>
  );
}