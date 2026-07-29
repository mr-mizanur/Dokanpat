'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, ShoppingBag, Store, User } from 'lucide-react';
import Logo from './Logo';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-slate-950/80 border-b border-slate-800/80 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          
          <div className="flex-shrink-0">
            <Link 
              href="/" 
              className="text-2xl font-black tracking-wider bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent flex items-center gap-2"
            >
              
              <Logo/>
            </Link>
          </div>

      
          <nav className="hidden md:flex items-center space-x-8 font-medium text-sm">
            <Link href="/" className="hover:text-blue-400 transition-colors">
              Home
            </Link>
            <Link href="/shops" className="hover:text-blue-400 transition-colors">
              Explore Shops
            </Link>
            <Link href="/dashboard/seller" className="hover:text-blue-400 transition-colors flex items-center gap-1.5">
              <Store className="w-4 h-4 text-slate-400" />
              Seller Dashboard
            </Link>
          </nav>

         
          <div className="hidden md:flex items-center space-x-4">
            <Link 
              href="/cart" 
              className="relative p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all text-slate-300 hover:text-white"
              aria-label="Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute -top-1.5 -right-1.5 bg-blue-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-lg">
                0
              </span>
            </Link>

            <Link 
              href="/login" 
              className="px-4 py-2 text-sm font-semibold text-slate-300 hover:text-white transition-colors"
            >
              Login
            </Link>

            <Link 
              href="/register" 
              className="px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 rounded-xl shadow-lg shadow-blue-500/20 transition-all transform hover:-translate-y-0.5"
            >
              Become a Seller
            </Link>
          </div>

      
          <div className="md:hidden flex items-center gap-3">
            <Link 
              href="/cart" 
              className="relative p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300"
            >
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center">
                0
              </span>
            </Link>
            
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white focus:outline-none"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

     
      {isOpen && (
        <div className="md:hidden border-b border-slate-800 bg-slate-950/95 backdrop-blur-2xl px-4 pt-4 pb-6 space-y-3 animate-fadeIn">
          <Link 
            href="/" 
            onClick={() => setIsOpen(false)}
            className="block px-4 py-3 rounded-xl hover:bg-slate-900 text-slate-300 hover:text-white font-medium transition-colors"
          >
            Home
          </Link>
          <Link 
            href="/shops" 
            onClick={() => setIsOpen(false)}
            className="block px-4 py-3 rounded-xl hover:bg-slate-900 text-slate-300 hover:text-white font-medium transition-colors"
          >
            Explore Shops
          </Link>
          <Link 
            href="/dashboard/seller" 
            onClick={() => setIsOpen(false)}
            className="block px-4 py-3 rounded-xl hover:bg-slate-900 text-slate-300 hover:text-white font-medium transition-colors"
          >
            Seller Dashboard
          </Link>
          <div className="pt-4 border-t border-slate-900 flex flex-col gap-2">
            <Link 
              href="/login" 
              onClick={() => setIsOpen(false)}
              className="w-full text-center py-3 rounded-xl font-semibold bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
            >
              Login
            </Link>
            <Link 
              href="/register" 
              onClick={() => setIsOpen(false)}
              className="w-full text-center py-3 rounded-xl font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/20"
            >
              Become a Seller
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}