'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation'; 
import { Menu, X, ShoppingBag, Store, User, LogOut, ChevronDown } from 'lucide-react';
import Logo from './Logo';
import { authClient } from '@/lib/auth-client'; 

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [totalItems, setTotalItems] = useState(0);

  const pathname = usePathname(); 
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  useEffect(() => {
    const updateCartCount = () => {
      try {
        const savedCart = JSON.parse(localStorage.getItem('store_cart')) || [];
        const count = savedCart.reduce((acc, item) => acc + item.quantity, 0);
        setTotalItems(count);
      } catch (error) {
        setTotalItems(0);
      }
    };

    updateCartCount();

    window.addEventListener('storage', updateCartCount);
    const interval = setInterval(updateCartCount, 1000);

    return () => {
      window.removeEventListener('storage', updateCartCount);
      clearInterval(interval);
    };
  }, []);

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          window.location.href = '/login';
        },
      },
    });
    setIsDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#2d3436] border-b border-slate-800/80 text-slate-100">
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

          
          {/* ডেক্সটপ নেভিগেশন */}
          <nav className="hidden md:flex items-center space-x-8 font-medium text-sm">
            <Link 
              href="/" 
              className={`transition-colors ${pathname === '/' ? 'text-blue-400 font-semibold' : 'text-slate-300 hover:text-blue-400'}`}
            >
              Home
            </Link>
            
            <Link 
              href="/shops" 
              className={`transition-colors ${pathname === '/shops' ? 'text-blue-400 font-semibold' : 'text-slate-300 hover:text-blue-400'}`}
            >
              Explore Shops
            </Link>
            
            <Link 
              href="/about" 
              className={`transition-colors ${pathname === '/about' ? 'text-blue-400 font-semibold' : 'text-slate-300 hover:text-blue-400'}`}
            >
              About 
            </Link>

            <Link 
              href="/updates" 
              className={`transition-colors ${pathname === '/updates' ? 'text-blue-400 font-semibold' : 'text-slate-300 hover:text-blue-400'}`}
            >
              Updates
            </Link>

            {user?.role === 'seller' && (
              <Link 
                href="/dashboard/seller" 
                className={`transition-colors flex items-center gap-1.5 ${pathname?.startsWith('/dashboard/seller') ? 'text-blue-400 font-semibold' : 'text-slate-300 hover:text-blue-400'}`}
              >
                <Store className={`w-4 h-4 ${pathname?.startsWith('/dashboard/seller') ? 'text-blue-400' : 'text-slate-400'}`} />
                Seller Dashboard
              </Link>
            )}
          </nav>

        
          <div className="hidden md:flex items-center space-x-4">
            <Link 
              href="/cart" 
              className="relative p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all text-slate-300 hover:text-white"
              aria-label="Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-blue-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                  {totalItems}
                </span>
              )}
            </Link>

            {isPending ? (
              <div className="w-24 h-9 bg-slate-900 animate-pulse rounded-xl border border-slate-800"></div>
            ) : user ? (
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-3 p-1.5 pl-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all"
                >
                  <div className="text-right">
                    <p className="text-xs font-bold text-slate-200 leading-none">{user.name}</p>
                    <span className="inline-block mt-1 px-1.5 py-0.5 text-[9px] font-extrabold uppercase tracking-wider rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                      {user.role || 'buyer'}
                    </span>
                  </div>

                  {user.image ? (
                    <img src={user.image} alt={user.name} className="w-9 h-9 rounded-lg object-cover border border-slate-700" />
                  ) : (
                    <div className="w-9 h-9 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 font-bold">
                      {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                    </div>
                  )}
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl py-2 z-50 backdrop-blur-2xl">
                    <div className="px-4 py-2 border-b border-slate-800">
                      <p className="text-xs text-slate-400">Signed in as</p>
                      <p className="text-xs font-semibold text-slate-200 truncate">{user.email}</p>
                    </div>

                    <div className="py-1">
                      {user.role === 'seller' ? (
                        <Link 
                          href="/dashboard/seller" 
                          onClick={() => setIsDropdownOpen(false)}
                          className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-slate-300 hover:bg-slate-800 hover:text-white"
                        >
                          <Store className="w-4 h-4 text-blue-400" />
                          Seller Dashboard
                        </Link>
                      ) : (
                        <Link 
                          href="/dashboard/buyer" 
                          onClick={() => setIsDropdownOpen(false)}
                          className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-slate-300 hover:bg-slate-800 hover:text-white"
                        >
                          <ShoppingBag className="w-4 h-4 text-blue-400" />
                          My Orders
                        </Link>
                      )}
                    </div>

                    <div className="border-t border-slate-800 pt-1">
                      <button 
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-4 py-2 text-xs font-medium text-red-400 hover:bg-slate-800 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link 
                  href="/login" 
                  className="px-4 py-2 text-sm font-semibold text-slate-300 hover:text-white transition-colors"
                >
                  Login
                </Link>

                <Link 
                  href="/register" 
                  className="px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 rounded-xl shadow-lg shadow-blue-500/25 transition-all transform hover:-translate-y-0.5"
                >
                  Register 
                </Link>
              </>
            )}
          </div>

         
          <div className="md:hidden flex items-center gap-3">
            <Link 
              href="/cart" 
              className="relative p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
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
          
          {user && (
            <div className="flex items-center gap-3 p-3 bg-slate-900/80 border border-slate-800 rounded-xl mb-4">
              {user.image ? (
                <img src={user.image} alt={user.name} className="w-10 h-10 rounded-lg object-cover border border-slate-700" />
              ) : (
                <div className="w-10 h-10 rounded-lg bg-blue-600/20 text-blue-400 font-bold flex items-center justify-center">
                  {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                </div>
              )}
              <div>
                <p className="text-sm font-bold text-slate-100">{user.name}</p>
                <span className="text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  {user.role || 'buyer'}
                </span>
              </div>
            </div>
          )}

          <Link 
            href="/" 
            onClick={() => setIsOpen(false)}
            className={`block px-4 py-3 rounded-xl font-medium transition-colors ${pathname === '/' ? 'bg-slate-900 text-blue-400 font-semibold' : 'hover:bg-slate-900 text-slate-300'}`}
          >
            Home
          </Link>
          <Link 
            href="/shops" 
            onClick={() => setIsOpen(false)}
            className={`block px-4 py-3 rounded-xl font-medium transition-colors ${pathname === '/shops' ? 'bg-slate-900 text-blue-400 font-semibold' : 'hover:bg-slate-900 text-slate-300'}`}
          >
            Explore Shops
          </Link>
          <Link 
            href="/about" 
            onClick={() => setIsOpen(false)}
            className={`block px-4 py-3 rounded-xl font-medium transition-colors ${pathname === '/about' ? 'bg-slate-900 text-blue-400 font-semibold' : 'hover:bg-slate-900 text-slate-300'}`}
          >
            About 
          </Link>
          
          {user?.role === 'seller' && (
            <Link 
              href="/dashboard/seller" 
              onClick={() => setIsOpen(false)}
              className={`block px-4 py-3 rounded-xl font-medium transition-colors ${pathname?.startsWith('/dashboard/seller') ? 'bg-slate-900 text-blue-400 font-semibold' : 'hover:bg-slate-900 text-slate-300'}`}
            >
              Seller Dashboard
            </Link>
          )}

          <div className="pt-4 border-t border-slate-900 flex flex-col gap-2">
            {user ? (
              <button 
                onClick={() => { handleLogout(); setIsOpen(false); }}
                className="w-full text-center py-3 rounded-xl font-semibold bg-red-600/10 border border-red-500/20 text-red-400 hover:bg-red-600/20"
              >
                Sign Out
              </button>
            ) : (
              <>
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
                  Register Now
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}