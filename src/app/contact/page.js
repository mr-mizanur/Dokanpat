'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

export default function ContactPage() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
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
        setSubmitted(true);
        toast.success('Message sent successfully! ', {
          style: { background: '#090d16', color: '#fff', border: '1px solid #1e293b' },
        });
      } else {
        toast.error(data.message || 'Something went wrong!', {
          style: { background: '#090d16', color: '#fff', border: '1px solid #1e293b' },
        });
      }
    } catch (error) {
      toast.error('Failed to send message. Please try again.', {
        style: { background: '#090d16', color: '#fff', border: '1px solid #1e293b' },
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-16 px-4 sm:px-6 lg:px-8">
      <Toaster position="top-right" />
      <div className="max-w-5xl mx-auto space-y-12">
        
        {/* পেজ হেডার */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider">
            <MessageSquare className="w-3.5 h-3.5" />
            Get in Touch
          </div>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent">
            We'd Love to Hear From You
          </h1>
          <p className="text-slate-400 max-w-xl mx-auto text-sm">
            Have questions about launching your storefront, managing orders, or partnering with MarketPulse? Reach out to our team.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* কন্টাক্ট ইনফো কার্ড */}
          <div className="space-y-6 lg:col-span-1">
            <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800/80 backdrop-blur-xl space-y-4">
              <div className="w-10 h-10 rounded-xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-200">Email Us</h3>
                <p className="text-xs text-slate-400 mt-1">marketpluse@gmail.com</p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800/80 backdrop-blur-xl space-y-4">
              <div className="w-10 h-10 rounded-xl bg-indigo-600/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-200">Call Us</h3>
                <p className="text-xs text-slate-400 mt-1">+8801820100221</p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800/80 backdrop-blur-xl space-y-4">
              <div className="w-10 h-10 rounded-xl bg-purple-600/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-200">Office Location</h3>
                <p className="text-xs text-slate-400 mt-1">Banani, Dhaka, Bangladesh</p>
              </div>
            </div>
          </div>

          {/* কন্টাক্ট ফর্ম */}
          <div className="lg:col-span-2 p-8 rounded-2xl bg-slate-900/80 border border-slate-800/80 backdrop-blur-xl shadow-2xl">
            {submitted ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 bg-blue-600/20 border border-blue-500/40 rounded-full flex items-center justify-center text-blue-400 mx-auto text-2xl font-bold">
                  ✓
                </div>
                <h3 className="text-2xl font-bold text-slate-200">Message Sent Successfully!</h3>
                <p className="text-sm text-slate-400 max-w-sm mx-auto">
                  Thank you for reaching out. Our support team will get back to you shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-6 py-2.5 text-sm font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl transition-all"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Your Name</label>
                    <input 
                      type="text" 
                      name="name"
                      placeholder="Mizanur Rahman"
                      required
                      className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-blue-500 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Your Email</label>
                    <input 
                      type="email" 
                      name="email"
                      placeholder="exampul@gmail.com"
                      required
                      className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-blue-500 transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Subject</label>
                  <input 
                    type="text" 
                    name="subject"
                    placeholder="Store setup or order query"
                    required
                    className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-blue-500 transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Message</label>
                  <textarea 
                    name="message"
                    rows="4" 
                    placeholder="Write your message here..."
                    required
                    className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-blue-500 transition-all resize-none"
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={submitting}
                  className="w-full py-3.5 px-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-sm font-semibold rounded-xl shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <span>{submitting ? 'Sending Message...' : 'Send Message'}</span>
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}