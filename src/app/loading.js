'use client';

import { Loader2, Sparkles } from 'lucide-react';
import Logo from '@/components/Logo'; 

export default function Loading() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center px-4 sm:px-8">
      <div className="max-w-md w-full bg-slate-900/80 border border-slate-800/80 p-8 rounded-3xl backdrop-blur-xl shadow-2xl text-center space-y-6">
        
        
        <div className="flex justify-center mb-2">
          <Logo />
        </div>

        
        <div className="relative w-16 h-16 mx-auto flex items-center justify-center bg-blue-600/10 border border-blue-500/20 rounded-full shadow-lg">
          <Loader2 className="w-8 h-8 text-blue-400 animate-spin" />
        </div>

        {/* Text Details */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-600/10 border border-blue-500/20 text-blue-400 text-xs font-semibold mx-auto">
            <Sparkles className="w-3.5 h-3.5" />
            <span>MarketPulse Store</span>
          </div>
          <h2 className="text-xl font-bold text-slate-200">Loading Content...</h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Please wait a moment while we fetch the latest products and secure data for you.
          </p>
        </div>

      </div>

      
      <div className="mt-8 text-center text-slate-500 text-xs">
        &copy; {new Date().getFullYear()} MarketPulse. All rights reserved.
      </div>
    </div>
  );
}