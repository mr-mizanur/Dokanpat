'use client';

import Link from 'next/link';
import { Home, ArrowLeft, AlertTriangle } from 'lucide-react';
import Logo from '@/components/Logo'; 

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#7f8c8d] text-slate-100 flex flex-col items-center justify-center px-4 sm:px-8">
      <div className="max-w-md w-full bg-slate-900/80 border border-slate-800/80 p-8 rounded-3xl backdrop-blur-xl shadow-2xl text-center space-y-6">
        
       
        <div className="flex justify-center mb-2">
          <Logo />
        </div>

       
        <div className="relative w-16 h-16 mx-auto flex items-center justify-center bg-blue-600/10 border border-blue-500/20 rounded-full shadow-lg">
          <AlertTriangle className="w-8 h-8 text-blue-400 animate-pulse" />
        </div>

      
        <div className="space-y-2">
          <h1 className="text-5xl font-black tracking-widest bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent">
            404
          </h1>
          <h2 className="text-xl font-bold text-slate-200">Page Not Found</h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Oops! The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
        </div>

        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={() => window.history.back()}
            className="w-full sm:w-auto px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl transition-all flex items-center justify-center gap-2 border border-slate-700/60"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Go Back</span>
          </button>

          <Link
            href="/"
            className="w-full sm:w-auto px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20"
          >
            <Home className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
        </div>

      </div>

      <div className="mt-8 text-center text-slate-500 text-xs">
        &copy; {new Date().getFullYear()} MarketPulse. All rights reserved.
      </div>
    </div>
  );
}