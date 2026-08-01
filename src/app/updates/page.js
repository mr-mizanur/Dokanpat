'use client';

import { useState } from 'react';
import { Rocket, ShieldAlert, CheckCircle2, GitBranch, Terminal, Layers, Bug, Send, Sparkles } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

export default function BetaUpdatesPage() {
  const [submitting, setSubmitting] = useState(false);

  const betaReleases = [
    {
      version: "v1.3.0-beta.2",
      date: "August 2026",
      status: "Active Testing",
      progress: 85,
      title: "Advanced Seller Analytics & Live Inventory Sync",
      description: "এই বেটা রিলিজে সেলারদের জন্য রিয়েল-টাইম সেলস গ্রাফ এবং অটো-ইনভেন্টরি আপডেট ফিচার যোগ করা হয়েছে। এটি বর্তমানে বেটা টেস্ট ফেইজে রয়েছে।",
      techStack: ["Next.js", "Tailwind CSS", "Node.js", "MongoDB"],
      changelog: [
        "সেলার ড্যাশবোর্ডে নতুন সেলস গ্রাফ ও চার্ট ইন্টিগ্রেশন",
        "লোকালস্টোরেজ সিঙ্ক লজিক অপ্টিমাইজেশন",
        "Better Auth সেশন এক্সপায়ার হ্যান্ডলিং ইমপ্রুভমেন্ট"
      ]
    },
    {
      version: "v1.3.0-beta.1",
      date: "July 2026",
      status: "Stable / Released",
      progress: 100,
      title: "Dark Mode Glassmorphism & Performance Revamp",
      description: "ইউজার ইন্টারফেসে ফিউচারিস্টিক লুক আনতে গ্লাসমরফিজম স্টাইল এবং ফাস্ট পেজ লোডিংয়ের জন্য কম্পোনেন্ট লেভেল ক্যাশিং যোগ করা হয়।",
      techStack: ["React", "Tailwind CSS", "Lucide Icons"],
      changelog: [
        "টেইলউইন্ড সিএসএস কালার প্যালেট রিফাইন্ড",
        "মোবাইল রেসপন্সিভ নেভবার টগল ফিক্স",
        "ডাইনামিক রাউট অ্যাক্টিভেশন লজিক আপডেট"
      ]
    }
  ];

  const handleBugSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const formData = new FormData(e.target);
    formData.append("access_key", "5e5a2838-5ef8-4376-9d35-34654686b085");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Thank you! Your bug report has been sent successfully.', {
          style: { background: '#090d16', color: '#fff', border: '1px solid #1e293b' },
        });
        e.target.reset();
      } else {
        toast.error(data.message || 'Something went wrong!', {
          style: { background: '#090d16', color: '#fff', border: '1px solid #1e293b' },
        });
      }
    } catch (error) {
      toast.error('Failed to submit report. Please try again.', {
        style: { background: '#090d16', color: '#fff', border: '1px solid #1e293b' },
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12 px-4 sm:px-8">
      <Toaster position="top-right" />
      <div className="max-w-4xl mx-auto space-y-10">
        
       
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-600/10 border border-blue-500/20 text-blue-400 text-xs font-semibold">
            <Rocket className="w-3.5 h-3.5" />
            <span>Experimental & Development Track</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-100">
            Beta Updates & Changelog
          </h1>
          <p className="text-sm text-slate-400 max-w-xl mx-auto">
            MarketPulse প্রজেক্টের রিয়েল-টাইম বেটা রিলিজ, নতুন ফিচার টেস্টিং এবং প্রি-রিলিজ আপডেটগুলো এখানে ট্র্যাক করা হয়।
          </p>
        </div>

       
        <div className="bg-amber-500/10 border border-amber-500/20 p-5 sm:p-6 rounded-2xl flex items-start gap-4 backdrop-blur-xl shadow-lg">
          <ShieldAlert className="w-6 h-6 text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-amber-300">Beta Version Notice</h3>
            <p className="text-xs text-amber-200/80 leading-relaxed">
              বেটা আপডেটগুলোতে পরীক্ষামূলক ফিচার থাকতে পারে। আপনি যদি কোনো বাগ বা আনএক্সপেক্টেড বিহেভিয়ার ফেস করেন, তবে নিচের ফর্মের মাধ্যমে আমাদের দ্রুত জানাতে পারেন।
            </p>
          </div>
        </div>

       
        <div className="space-y-6">
          {betaReleases.map((release, index) => (
            <div 
              key={index}
              className="bg-slate-900/80 border border-slate-800 p-6 sm:p-8 rounded-3xl backdrop-blur-xl space-y-6 hover:border-slate-700 transition-all shadow-xl"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-blue-600/20 border border-blue-500/30 text-blue-400">
                    <GitBranch className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-slate-100">{release.version}</h2>
                    <p className="text-xs text-slate-400">{release.date}</p>
                  </div>
                </div>
                <span className={`text-xs font-semibold px-3.5 py-1 rounded-full w-fit ${
                  release.status === 'Active Testing' 
                    ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20 animate-pulse' 
                    : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                }`}>
                  {release.status}
                </span>
              </div>

             
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Development & Testing Progress</span>
                  <span className="font-bold text-blue-400">{release.progress}%</span>
                </div>
                <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
                  <div 
                    className="bg-gradient-to-r from-blue-600 to-indigo-500 h-full rounded-full transition-all duration-1000"
                    style={{ width: `${release.progress}%` }}
                  ></div>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-bold text-slate-200">{release.title}</h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">{release.description}</p>
              </div>

           
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1 mr-1">
                  <Layers className="w-3.5 h-3.5 text-blue-400" /> Stack:
                </span>
                {release.techStack.map((tech, tIndex) => (
                  <span key={tIndex} className="px-2.5 py-1 rounded-lg bg-slate-950/60 border border-slate-800 text-[11px] text-slate-300 font-medium">
                    {tech}
                  </span>
                ))}
              </div>

             
              <div className="space-y-3 pt-3 border-t border-slate-800/60">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-300 uppercase tracking-wider">
                  <Terminal className="w-3.5 h-3.5 text-blue-400" />
                  <span>Changelog & Fixes:</span>
                </div>
                <div className="space-y-2">
                  {release.changelog.map((log, lIndex) => (
                    <div key={lIndex} className="flex items-center gap-2.5 text-xs text-slate-300 bg-slate-950/50 px-3.5 py-2.5 rounded-xl border border-slate-800/60">
                      <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                      <span>{log}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

       
        <div className="bg-slate-900/80 border border-slate-800 p-6 sm:p-8 rounded-3xl backdrop-blur-xl shadow-xl space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-blue-600/20 border border-blue-500/30 text-blue-400">
              <Bug className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-100">Report a Bug or Feedback</h3>
              <p className="text-xs text-slate-400">Help us improve MarketPulse by reporting issues you encounter in beta.</p>
            </div>
          </div>

          <form onSubmit={handleBugSubmit} className="space-y-4 pt-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input 
                type="text" 
                name="name" 
                placeholder="Your Name" 
                className="w-full p-3.5 bg-slate-950 border border-slate-800 rounded-2xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-all"
                required 
              />
              <input 
                type="email" 
                name="email" 
                placeholder="Your Email" 
                className="w-full p-3.5 bg-slate-950 border border-slate-800 rounded-2xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-all"
                required 
              />
            </div>

            <textarea 
              name="message"
              rows="3"
              placeholder="Describe the bug or share your suggestion here..."
              className="w-full p-3.5 bg-slate-950 border border-slate-800 rounded-2xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-all resize-none"
              required
            ></textarea>

            <div className="flex justify-end">
              <button 
                type="submit"
                disabled={submitting}
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-xl transition-all flex items-center gap-2 shadow-lg shadow-blue-600/20 disabled:opacity-50"
              >
                {submitting ? (
                  <span>Submitting...</span>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Report</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
}