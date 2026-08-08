'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation'; 
import { Menu, X, Store, ShoppingBag, ShieldAlert, LogOut, ChevronDown, ShoppingCart } from 'lucide-react';
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
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/90 border-b border-orange-100 text-slate-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
        
          <div className="flex-shrink-0">
            <Link 
              href="/" 
              className="text-2xl font-black tracking-wider bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 bg-clip-text text-transparent flex items-center gap-2"
            >
              <Logo/>
            </Link>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8 font-medium text-sm">
            <Link 
              href="/" 
              className={`transition-colors ${pathname === '/' ? 'text-orange-600 font-semibold' : 'text-slate-600 hover:text-orange-600'}`}
            >
              Home
            </Link>
            
            <Link 
              href="/shops" 
              className={`transition-colors ${pathname === '/shops' ? 'text-orange-600 font-semibold' : 'text-slate-600 hover:text-orange-600'}`}
            >
              Explore Shops
            </Link>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <Link 
              href="/cart" 
              className="relative p-2.5 rounded-xl bg-slate-50 border border-orange-100 hover:border-orange-200 transition-all text-slate-600 hover:text-orange-600"
              aria-label="Cart"
            >
              <ShoppingCart className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-orange-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-md animate-pulse">
                  {totalItems}
                </span>
              )}
            </Link>

            {user && (
              <>
                {user.role === 'seller' && (
                  <Link 
                    href="/dashboard/seller" 
                    className={`p-2.5 rounded-xl bg-slate-50 border transition-all ${pathname?.startsWith('/dashboard/seller') ? 'border-orange-500 text-orange-600 shadow-md shadow-orange-500/10' : 'border-orange-100 text-slate-600 hover:border-orange-200 hover:text-orange-600'}`}
                    title="Seller Dashboard"
                    aria-label="Seller Dashboard"
                  >
                    <Store className="w-5 h-5" />
                  </Link>
                )}

                {user.role === 'admin' && (
                  <Link 
                    href="/dashboard/admin" 
                    className={`p-2.5 rounded-xl bg-slate-50 border transition-all ${pathname?.startsWith('/dashboard/admin') ? 'border-orange-500 text-orange-600 shadow-md shadow-orange-500/10' : 'border-orange-100 text-slate-600 hover:border-orange-200 hover:text-orange-600'}`}
                    title="Admin Dashboard"
                    aria-label="Admin Dashboard"
                  >
                    <ShieldAlert className="w-5 h-5" />
                  </Link>
                )}

                {user.role !== 'seller' && user.role !== 'admin' && (
                  <Link 
                    href="/dashboard/buyer" 
                    className={`p-2.5 rounded-xl bg-slate-50 border transition-all ${pathname?.startsWith('/dashboard/buyer') ? 'border-orange-500 text-orange-600 shadow-md shadow-orange-500/10' : 'border-orange-100 text-slate-600 hover:border-orange-200 hover:text-orange-600'}`}
                    title="My Orders"
                    aria-label="My Orders"
                  >
                    <ShoppingBag className="w-5 h-5" />
                  </Link>
                )}
              </>
            )}

            {isPending ? (
              <div className="w-24 h-9 bg-slate-100 animate-pulse rounded-xl border border-orange-100"></div>
            ) : user ? (
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-3 p-1.5 pl-3 rounded-xl bg-slate-50 border border-orange-100 hover:border-orange-200 transition-all"
                >
                  <div className="text-right">
                    <p className="text-xs font-bold text-slate-800 leading-none">{user.name}</p>
                    <span className="inline-block mt-1 px-1.5 py-0.5 text-[9px] font-extrabold uppercase tracking-wider rounded bg-orange-50 text-orange-600 border border-orange-200">
                      {user.role || 'buyer'}
                    </span>
                  </div>

                  {user.image ? (
                    <img src={user.image} alt={user.name} className="w-9 h-9 rounded-lg object-cover border border-orange-200" />
                  ) : (
                    <div className="w-9 h-9 rounded-lg bg-orange-100 border border-orange-200 flex items-center justify-center text-orange-600 font-bold">
                      {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                    </div>
                  )}
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white border border-orange-100 rounded-2xl shadow-xl py-2 z-50">
                    <div className="px-4 py-2 border-b border-orange-50">
                      <p className="text-xs text-slate-400">Signed in as</p>
                      <p className="text-xs font-semibold text-slate-800 truncate">{user.email}</p>
                    </div>

                    <div className="py-1">
                      {user.role === 'seller' ? (
                        <Link 
                          href="/dashboard/seller" 
                          onClick={() => setIsDropdownOpen(false)}
                          className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-slate-600 hover:bg-orange-50 hover:text-orange-600"
                        >
                          <Store className="w-4 h-4 text-orange-600" />
                          Seller Dashboard
                        </Link>
                      ) : user.role === 'admin' ? (
                        <Link 
                          href="/dashboard/admin" 
                          onClick={() => setIsDropdownOpen(false)}
                          className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-slate-600 hover:bg-orange-50 hover:text-orange-600"
                        >
                          <ShieldAlert className="w-4 h-4 text-orange-600" />
                          Admin Dashboard
                        </Link>
                      ) : (
                        <Link 
                          href="/dashboard/buyer" 
                          onClick={() => setIsDropdownOpen(false)}
                          className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-slate-600 hover:bg-orange-50 hover:text-orange-600"
                        >
                          <ShoppingBag className="w-4 h-4 text-orange-600" />
                          My Orders
                        </Link>
                      )}
                    </div>

                    <div className="border-t border-orange-50 pt-1">
                      <button 
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-4 py-2 text-xs font-medium text-red-500 hover:bg-red-50 transition-colors"
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
                  className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-orange-600 transition-colors"
                >
                  Login
                </Link>

                <Link 
                  href="/register" 
                  className="px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 rounded-xl shadow-md shadow-orange-500/20 transition-all transform hover:-translate-y-0.5"
                >
                  Register 
                </Link>
              </>
            )}
          </div>
         
          <div className="md:hidden flex items-center gap-3">
            <Link 
              href="/cart" 
              className="relative p-2.5 rounded-xl bg-slate-50 border border-orange-100 text-slate-600"
            >
              <ShoppingCart className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-600 text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>

            {user && (
              <>
                {user.role === 'seller' && (
                  <Link 
                    href="/dashboard/seller" 
                    className="p-2.5 rounded-xl bg-slate-50 border border-orange-100 text-slate-600"
                    aria-label="Seller Dashboard"
                  >
                    <Store className="w-5 h-5" />
                  </Link>
                )}
                {user.role === 'admin' && (
                  <Link 
                    href="/dashboard/admin" 
                    className="p-2.5 rounded-xl bg-slate-50 border border-orange-100 text-slate-600"
                    aria-label="Admin Dashboard"
                  >
                    <ShieldAlert className="w-5 h-5" />
                  </Link>
                )}
                {user.role !== 'seller' && user.role !== 'admin' && (
                  <Link 
                    href="/dashboard/buyer" 
                    className="p-2.5 rounded-xl bg-slate-50 border border-orange-100 text-slate-600"
                    aria-label="My Orders"
                  >
                    <ShoppingBag className="w-5 h-5" />
                  </Link>
                )}
              </>
            )}
            
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2.5 rounded-xl bg-slate-50 border border-orange-100 text-slate-600 hover:text-orange-600 focus:outline-none"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>
     
      {isOpen && (
        <div className="md:hidden border-b border-orange-100 bg-white/95 backdrop-blur-xl px-4 pt-4 pb-6 space-y-3 animate-fadeIn">
          
          {user && (
            <div className="flex items-center gap-3 p-3 bg-orange-50/50 border border-orange-100 rounded-xl mb-4">
              {user.image ? (
                <img src={user.image} alt={user.name} className="w-10 h-10 rounded-lg object-cover border border-orange-200" />
              ) : (
                <div className="w-10 h-10 rounded-lg bg-orange-100 text-orange-600 font-bold flex items-center justify-center">
                  {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                </div>
              )}
              <div>
                <p className="text-sm font-bold text-slate-800">{user.name}</p>
                <span className="text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-orange-100 text-orange-600 border border-orange-200">
                  {user.role || 'buyer'}
                </span>
              </div>
            </div>
          )}

          <Link 
            href="/" 
            onClick={() => setIsOpen(false)}
            className={`block px-4 py-3 rounded-xl font-medium transition-colors ${pathname === '/' ? 'bg-orange-50 text-orange-600 font-semibold' : 'hover:bg-orange-50 text-slate-600'}`}
          >
            Home
          </Link>
          <Link 
            href="/shops" 
            onClick={() => setIsOpen(false)}
            className={`block px-4 py-3 rounded-xl font-medium transition-colors ${pathname === '/shops' ? 'bg-orange-50 text-orange-600 font-semibold' : 'hover:bg-orange-50 text-slate-600'}`}
          >
            Explore Shops
          </Link>

          <div className="pt-4 border-t border-orange-50 flex flex-col gap-2">
            {user ? (
              <button 
                onClick={() => { handleLogout(); setIsOpen(false); }}
                className="w-full text-center py-3 rounded-xl font-semibold bg-red-50 border border-red-200 text-red-500 hover:bg-red-100"
              >
                Sign Out
              </button>
            ) : (
              <>
                <Link 
                  href="/login" 
                  onClick={() => setIsOpen(false)}
                  className="w-full text-center py-3 rounded-xl font-semibold bg-slate-50 border border-orange-100 text-slate-600 hover:text-orange-600"
                >
                  Login
                </Link>
                <Link 
                  href="/register" 
                  onClick={() => setIsOpen(false)}
                  className="w-full text-center py-3 rounded-xl font-semibold bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-md shadow-orange-500/20"
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