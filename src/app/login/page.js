'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Store, Mail, Lock, ArrowRight } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import { signIn } from '@/lib/auth-client'; 

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
    
      const { data, error } = await signIn.email({
        email: formData.email,
        password: formData.password,
      }, {
        onRequest: () => {
          setLoading(true);
        },
        onSuccess: async (ctx) => {
          toast.success('Successfully signed in! 🎉', {
            style: {
              background: '#090d16',
              color: '#fff',
              border: '1px solid #1e293b',
            },
          });

         
          const sessionRes = await fetch('/api/auth/get-session');
          const session = await sessionRes.json();
          const userRole = session?.user?.role;

          setTimeout(() => {
            if (userRole === 'seller') {
              router.push('/dashboard/seller');
            } else {
              router.push('/');
            }
            router.refresh();
          }, 1000);
        },
        onError: (ctx) => {
          throw new Error(ctx.error.message || 'Invalid email or password');
        },
      });

      if (error) {
        throw new Error(error.message);
      }

    } catch (error) {
      toast.error(error.message || 'Failed to sign in. Please check your credentials!', {
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
      
      <div className="max-w-md w-full space-y-8 bg-slate-900/80 border border-slate-800/80 p-8 rounded-2xl backdrop-blur-xl shadow-2xl">
        
        
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-600/10 border border-blue-500/20 text-blue-400 mb-2">
            <Store className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-black tracking-tight text-slate-100">Welcome Back</h1>
          <p className="text-xs text-slate-400">Sign in to your MarketPulse account</p>
        </div>

       
        <form onSubmit={handleSubmit} className="space-y-5">
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

          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-sm font-semibold rounded-xl shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-2"
          >
            <span>{loading ? 'Signing In...' : 'Sign In'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Footer Link */}
        <div className="text-center text-xs text-slate-400 pt-2">
          Don't have an account?{' '}
          <Link href="/register" className="text-blue-400 font-semibold hover:underline">
            Sign Up
          </Link>
        </div>

      </div>
    </div>
  );
}