'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

export default function HelpCenter() {
  const [searchQuery, setSearchQuery] = useState('');
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      category: 'Seller',
      question: 'How can I launch my own custom storefront on Dokanpat?',
      answer: 'To launch your store, click on "Become a Seller" in the navbar, register your account, and complete your shop details from the Seller Dashboard. You can start adding products immediately after setup.'
    },
    {
      category: 'Seller',
      question: 'How do I manage my products and track orders?',
      answer: 'You have full control through the Seller Dashboard. Navigate to the Products section to add or update items, and check the Orders section to monitor pending and delivered customer purchases in real-time.'
    },
    {
      category: 'Buyer',
      question: 'How can I explore different independent shops?',
      answer: 'You can browse all available independent storefronts by clicking on the "Explore Shops" link in the top navigation bar to view unique shops and their products.'
    },
    {
      category: 'General',
      question: 'Is Dokanpat secure for online transactions?',
      answer: 'Yes, Dokanpat utilizes advanced security protocols, backend-handled authentication, and encrypted databases to ensure all buyer and seller data remains completely safe.'
    }
  ];

  const filteredFaqs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-10">
        
       
        <div className="space-y-3 border-b border-orange-100 pb-8">
         
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900">
            Help Center & FAQs
          </h1>
          <p className="text-sm text-slate-500 leading-relaxed">
            Find answers to common questions about setting up your custom storefront, managing orders, or navigating Dokanpat.
          </p>
        </div>

   
        <div className="relative">
          <input 
            type="text" 
            placeholder="Search for answers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 bg-white border border-orange-100 rounded-xl text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-orange-500 shadow-sm transition-all"
          />
        </div>

      
        <div className="space-y-4">
          <div className="space-y-3">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq, index) => (
                <div 
                  key={index}
                  className="rounded-xl bg-white border border-orange-100 overflow-hidden shadow-sm transition-all"
                >
                  <button
                    onClick={() => toggleAccordion(index)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between font-semibold text-sm text-slate-800 hover:text-orange-600 transition-colors"
                  >
                    <span className="flex items-center gap-3">
                      <span className="text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-orange-50 text-orange-600 font-bold border border-orange-100">
                        {faq.category}
                      </span>
                      {faq.question}
                    </span>
                    {openIndex === index ? (
                      <ChevronUp className="w-4 h-4 text-slate-400 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400 flex-shrink-0" />
                    )}
                  </button>
                  {openIndex === index && (
                    <div className="px-6 pb-4 pt-1 text-sm text-slate-600 leading-relaxed border-t border-orange-100/60">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p className="text-center text-slate-400 py-8 text-sm">No matching questions found.</p>
            )}
          </div>
        </div>

        
        <div className="pt-6 border-t border-orange-100 text-sm text-slate-500">
          <p>
            Still need assistance? Reach out to our support team through our <a href="/contact" className="text-orange-600 font-semibold hover:underline">Contact Page</a>.
          </p>
        </div>

      </div>
    </div>
  );
}