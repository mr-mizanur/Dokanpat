'use client';

import { Loader2, Sparkles } from 'lucide-react';
import Logo from '@/components/Logo'; 

export default function Loading() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col items-center justify-center px-4 sm:px-8">
      <div className="max-w-md w-full bg-white border border-orange-100 p-8 rounded-3xl shadow-sm text-center space-y-6">
        
        
        <div className="flex justify-center mb-2">
          <Logo />
        </div>

        
        <div className="relative w-16 h-16 mx-auto flex items-center justify-center bg-orange-50 border border-orange-100 rounded-full shadow-sm">
          <Loader2 className="w-8 h-8 text-orange-600 animate-spin" />
        </div>

        {/* Text Details */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 border border-orange-100 text-orange-600 text-xs font-semibold mx-auto">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Dokanpat Store</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900">Loading Content...</h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Please wait a moment while we fetch the latest products and secure data for you.
          </p>
        </div>

      </div>

      
      <div className="mt-8 text-center text-slate-400 text-xs">
        &copy; {new Date().getFullYear()} Dokanpat. All rights reserved.
      </div>
    </div>
  );
}