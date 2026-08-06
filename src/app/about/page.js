'use client';

import { Sparkles, ShoppingBag, ShieldCheck, Zap, Store, Users, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Logo from '@/components/Logo';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#7f8c8d] text-slate-100 py-16 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto space-y-16">
       
        <div className="text-center space-y-4">
         
          <h1 className="text-2xl sm:text-5xl font-black tracking-tight text-slate-900 flex items-center justify-center gap-3">
            <span>Welcome to</span> <Logo />
          </h1>
          <p className="text-sm sm:text-base text-slate-100 max-w-2xl mx-auto leading-relaxed">
           MarketPulse হলো একটি সর্বাধুনিক প্রযুক্তি ও সর্বোচ্চ নিরাপত্তা সম্বলিত মাল্টি-ভেন্ডর ইকমাস প্ল্যাটফর্ম, যা ক্রেতা এবং বিক্রেতাদের মেলবন্ধনে তৈরি করেছে একটি বিশ্বস্ত ডিজিটাল শপিং ইকোসিস্টেম।

আমাদের প্ল্যাটফর্মে ক্রেতারা এক ছাদের নিচে খুঁজে পান দেশের বিভিন্ন ভেরিফাইড ও ট্রাস্টেড সেলারদের হ্যান্ডপিকড সব প্রিমিয়াম কালেকশন—ফ্যাশন থেকে শুরু করে টেক গ্যাজেট বা লাইফস্টাইল পণ্য। রিয়েল-টাইম কার্ট ম্যানেজমেন্ট, সুপার-ফাস্ট ও সিকিউর চেকআউট এবং ঝামেলাহীন অর্ডার ট্র্যাকিংয়ের মাধ্যমে আমরা নিশ্চিত করি একটি প্রিমিয়াম অনলাইন শপিং অভিজ্ঞতা।

অন্যদিকে, উদ্যোক্তা ও সেলারদের জন্য MarketPulse নিয়ে এসেছে নিজেদের ব্যবসা ডিজিটাল মাধ্যমে প্রসারিত করার সুবর্ণ সুযোগ। খুব সহজেই নিজস্ব শপ ক্রিয়েট করা, প্রোডাক্ট ক্যাটালগ ম্যানেজ করা এবং কাস্টমার রিচ বাড়ানোর জন্য আমাদের প্ল্যাটফর্মে রয়েছে চমৎকার সব ড্যাশবোর্ড ও টুলস।

মানসম্মত পণ্য, স্বচ্ছতা এবং গ্রাহক সন্তুষ্টিকে সর্বোচ্চ প্রাধান্য দিয়ে MarketPulse অনলাইন কেনাকাটার অভিজ্ঞতাকে নিয়ে যাচ্ছে এক অনন্য উচ্চতায়।
          </p>
        </div>

     
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-slate-900/80 border border-slate-600/50 p-8 rounded-3xl backdrop-blur-xl shadow-2xl space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-slate-800 border border-slate-600/50 flex items-center justify-center text-slate-100 font-bold">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-100">Our Mission</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              আমাদের লক্ষ্য হলো অনলাইন শপিং অভিজ্ঞতাকে আরও দ্রুত, সহজ এবং নিরাপদ করা। গ্রাহকরা যেন ঘরে বসেই তাদের পছন্দের প্রিমিয়াম পণ্যগুলো অত্যন্ত সহজেই অর্ডার করতে পারেন এবং দ্রুত হাতে পান।
            </p>
          </div>

          <div className="bg-slate-900/80 border border-slate-600/50 p-8 rounded-3xl backdrop-blur-xl shadow-2xl space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-slate-800 border border-slate-600/50 flex items-center justify-center text-slate-100 font-bold">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-100">Why Choose Us?</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              আমরা শতভাগ নিরাপদ, রিয়েল-টাইম কার্ট ম্যানেজমেন্ট, ভেরিফাইড সেলার এবং সুপার-ফাস্ট চেকআউট সিস্টেম নিশ্চিত করি যাতে আপনার প্রতিটি শপিং অভিজ্ঞতা হয় চমৎকার।
            </p>
          </div>
        </div>

      
        <div className="bg-slate-900/60 border border-slate-600/50 rounded-3xl p-8 sm:p-12 backdrop-blur-xl space-y-8">
          <h2 className="text-2xl font-bold text-center text-slate-100">What Makes MarketPulse Unique?</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-slate-950/80 border border-slate-700/60 p-6 rounded-2xl space-y-2">
              <Store className="w-8 h-8 text-slate-200 mb-3" />
              <h4 className="font-bold text-slate-100 text-base">Multi-Vendor Support</h4>
              <p className="text-xs text-slate-300">বিভিন্ন ভেন্ডর বা সেলাররা তাদের নিজস্ব পণ্য সহজেই পাবলিশ ও ম্যানেজ করতে পারেন।</p>
            </div>

            <div className="bg-slate-950/80 border border-slate-700/60 p-6 rounded-2xl space-y-2">
              <ShoppingBag className="w-8 h-8 text-slate-200 mb-3" />
              <h4 className="font-bold text-slate-100 text-base">Instant Cart & Checkout</h4>
              <p className="text-xs text-slate-300">লোকালস্টোরেজ সিঙ্কসহ রিয়েল-টাইম কার্ট আপডেট ও ঝামেলাহীন চেকআউট সিস্টেম।</p>
            </div>

            <div className="bg-slate-950/80 border border-slate-700/60 p-6 rounded-2xl space-y-2">
              <Users className="w-8 h-8 text-slate-200 mb-3" />
              <h4 className="font-bold text-slate-100 text-base">User Friendly</h4>
              <p className="text-xs text-slate-300">খুবই চমৎকার ও রেসপন্সিভ ইউজার ইন্টারফেস যা যেকোনো ডিভাইসে দারুণ কাজ করে।</p>
            </div>
          </div>
        </div>

       
        <div className="text-center bg-slate-900/80 border border-slate-600/50 p-10 rounded-3xl backdrop-blur-xl space-y-6 shadow-xl">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-100">Ready to Explore Our Store?</h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
            আজই কালেকশন ব্রাউজ করুন এবং আপনার প্রয়োজনীয় সেরা পণ্যটি সংগ্রহ করুন।
          </p>
          <div className="flex justify-center gap-4">
            <Link 
              href="/" 
              className="px-6 py-3 bg-slate-950 hover:bg-slate-800 text-white text-xs sm:text-sm font-semibold rounded-xl transition-all shadow-lg border border-slate-700 flex items-center gap-2"
            >
              <span>Explore Products</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}