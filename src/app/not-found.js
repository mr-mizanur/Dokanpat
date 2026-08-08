'use client';

import Link from 'next/link';
import { Home, ArrowLeft, AlertTriangle } from 'lucide-react';
import Logo from '@/components/Logo'; 

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col items-center justify-center px-4 sm:px-8">
      <div className="max-w-md w-full bg-white border border-orange-100 p-8 rounded-3xl shadow-sm text-center space-y-6">
        
       
        <div className="flex justify-center mb-2">
          <Logo />
        </div>

       
        <div className="relative w-16 h-16 mx-auto flex items-center justify-center bg-orange-50 border border-orange-100 rounded-full shadow-sm">
          <AlertTriangle className="w-8 h-8 text-orange-600 animate-pulse" />
        </div>

      
        <div className="space-y-2">
          <h1 className="text-5xl font-black tracking-widest text-orange-600">
            404
          </h1>
          <h2 className="text-xl font-bold text-slate-900">Page Not Found</h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Oops! The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
        </div>

        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={() => window.history.back()}
            className="w-full sm:w-auto px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-all flex items-center justify-center gap-2 border border-slate-200"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Go Back</span>
          </button>

          <Link
            href="/"
            className="w-full sm:w-auto px-6 py-2.5 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white text-xs font-semibold rounded-xl transition-all flex items-center justify-center gap-2 shadow-md shadow-orange-500/20"
          >
            <Home className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
        </div>

      </div>

      <div className="mt-8 text-center text-slate-400 text-xs">
        &copy; {new Date().getFullYear()} Dokanpat. All rights reserved.
      </div>
    </div>
  );
}