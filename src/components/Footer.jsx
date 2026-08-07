'use client';

import { useState } from 'react';
import Link from 'next/link';
import Logo from './Logo';
import { Send } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

export default function Footer() {
  const [subscribing, setSubscribing] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setSubscribing(true);

    const formData = new FormData(e.target);
    formData.append("access_key", "5e5a2838-5ef8-4376-9d35-34654686b085");
    formData.append("subject", "New Newsletter Subscription - MarketPulse");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Successfully subscribed to newsletter! ', {
          style: { background: '#090d16', color: '#fff', border: '1px solid #1e293b' },
        });
        e.target.reset();
      } else {
        toast.error(data.message || 'Something went wrong!', {
          style: { background: '#090d16', color: '#fff', border: '1px solid #1e293b' },
        });
      }
    } catch (error) {
      toast.error('Failed to subscribe. Please try again.', {
        style: { background: '#090d16', color: '#fff', border: '1px solid #1e293b' },
      });
    } finally {
      setSubscribing(false);
    }
  };

  return (
    <footer className="bg-[#7f8c8d] border-t border-slate-600/50 text-slate-100 pt-16 pb-12">
      <Toaster position="top-right" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-600/40">
          
         
          <div className="lg:col-span-2 space-y-4">
            <Logo />
            <p className="text-sm leading-relaxed text-slate-100 max-w-sm">
              MarketPulse is the ultimate multi-vendor SaaS platform empowering independent sellers to launch, manage, and scale their custom storefronts seamlessly.
            </p>
            <div className="flex items-center space-x-3 pt-2">
              <a 
                href="mailto:marketpulse@gmail.com" 
                className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-600/50 hover:border-slate-500 text-slate-200 hover:text-white transition-all"
                aria-label="Email"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
              </a>
            </div>
          </div>

         
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-900">Platform</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="hover:text-slate-900 text-slate-100 transition-colors">Home</Link>
              </li>
              <li>
                <Link href="/shops" className="hover:text-slate-900 text-slate-100 transition-colors">Explore Shops</Link>
              </li>
              <li>
                <Link href="/register" className="hover:text-slate-900 text-slate-100 transition-colors">Become a Seller</Link>
              </li>
              <li>
                <Link href="/dashboard/seller" className="hover:text-slate-900 text-slate-100 transition-colors">Seller Dashboard</Link>
              </li>
            </ul>
          </div>

       
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-900">Support</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/help" className="hover:text-slate-900 text-slate-100 transition-colors">Help Center</Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-slate-900 text-slate-100 transition-colors">Terms of Service</Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-slate-900 text-slate-100 transition-colors">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-slate-900 text-slate-100 transition-colors">Contact Us</Link>
              </li>
            </ul>
          </div>

          
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-900">Stay Updated</h3>
            <p className="text-xs text-slate-100 leading-relaxed">
              Get the latest updates, features, and tips directly to your inbox.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input 
                  type="email" 
                  name="email"
                  placeholder="Enter your email" 
                  className="w-full px-4 py-2.5 bg-slate-900/80 border border-slate-600/50 rounded-xl text-sm text-slate-200 placeholder:text-slate-400 focus:outline-none focus:border-slate-400 transition-all"
                  required
                />
              </div>
              <button 
                type="submit" 
                disabled={subscribing}
                className="w-full py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <span>{subscribing ? 'Subscribing...' : 'Subscribe'}</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>

        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-100 gap-4">
          <p>© {new Date().getFullYear()} দোকানপাট || Dokanpat. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Connecting passionate sellers with everyday buyers, with a touch of care.
          </p>
        </div>

      </div>
    </footer>
  );
}