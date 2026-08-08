'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Store, Mail, Lock, ArrowRight, Loader2 } from 'lucide-react';
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
              background: '#ffffff',
              color: '#1e293b',
              border: '1px solid #ffedd5',
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
          background: '#ffffff',
          color: '#1e293b',
          border: '1px solid #ffedd5',
        },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Toaster position="top-right" />
      
      <div className="max-w-md w-full space-y-6 bg-white border border-orange-100 p-8 rounded-3xl shadow-md">
        
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-orange-50 border border-orange-100 text-orange-600 mb-1">
            <Store className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-black tracking-tight text-slate-900">Welcome Back</h1>
          <p className="text-xs text-slate-500">Sign in to your Dokanpat account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
              <input 
                type="email" 
                placeholder="name@example.com"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
                className="w-full pl-10 pr-4 py-3 bg-white border border-orange-100 rounded-xl text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-orange-500 transition-all shadow-sm"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">Password</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
              <input 
                type="password" 
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                required
                className="w-full pl-10 pr-4 py-3 bg-white border border-orange-100 rounded-xl text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-orange-500 transition-all shadow-sm"
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-3 px-4 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white text-xs font-semibold rounded-xl shadow-md shadow-orange-500/20 transition-all flex items-center justify-center gap-2 mt-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Signing In...</span>
              </>
            ) : (
              <>
                <span>Sign In</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="text-center text-xs text-slate-500 pt-1">
          Don't have an account?{' '}
          <Link href="/register" className="text-orange-600 font-semibold hover:underline">
            Sign Up
          </Link>
        </div>

      </div>
    </div>
  );
}