'use client'
import Link from 'next/link';
import Logo from './Logo';
import { Send, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800/80 text-slate-400 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
  
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-900">
          
         
          <div className="lg:col-span-2 space-y-4">
            <Logo />
            <p className="text-sm leading-relaxed text-slate-400 max-w-sm">
              MarketPulse is the ultimate multi-vendor SaaS platform empowering independent sellers to launch, manage, and scale their custom storefronts seamlessly.
            </p>
            <div className="flex items-center space-x-3 pt-2">
             
           <a 
  href="mailto:marketpulse@gmail.com" 
  className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white transition-all"
  aria-label="Email"
>
  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
  </svg>
</a>
            </div>
          </div>

        
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-200">Platform</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="hover:text-blue-400 transition-colors">Home</Link>
              </li>
              <li>
                <Link href="/shops" className="hover:text-blue-400 transition-colors">Explore Shops</Link>
              </li>
              <li>
                <Link href="/register" className="hover:text-blue-400 transition-colors">Become a Seller</Link>
              </li>
              <li>
                <Link href="/dashboard/seller" className="hover:text-blue-400 transition-colors">Seller Dashboard</Link>
              </li>
            </ul>
          </div>

         
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-200">Support</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/help" className="hover:text-blue-400 transition-colors">Help Center</Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-blue-400 transition-colors">Terms of Service</Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-blue-400 transition-colors">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-blue-400 transition-colors">Contact Us</Link>
              </li>
            </ul>
          </div>

        
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-200">Stay Updated</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Get the latest updates, features, and tips directly to your inbox.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-2">
              <div className="relative">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-blue-500 transition-all"
                  required
                />
              </div>
              <button 
                type="submit" 
                className="w-full py-2.5 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-sm font-semibold rounded-xl shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-2"
              >
                <span>Subscribe</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>

        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} MarketPulse. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Connecting passionate sellers with  <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" /> everyday buyers, with a touch of care.
          </p>
        </div>

      </div>
    </footer>
  );
}