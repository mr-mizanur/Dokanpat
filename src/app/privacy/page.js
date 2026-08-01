export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-10">
        
      
        <div className="space-y-3 border-b border-slate-900 pb-8">
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent">
            Privacy Policy
          </h1>
          <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">
            Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </div>

       
        <div className="space-y-8 text-sm text-slate-300 leading-relaxed">
          
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-200">1. Introduction</h2>
            <p>
              At MarketPulse, we respect your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, and safeguard your information when you use our multi-vendor SaaS platform as a seller or buyer.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-200">2. Information We Collect</h2>
            <p>
              We collect information you provide directly to us when registering an account, setting up a storefront, making a purchase, or contacting support. This may include your name, email address, store details, and secure transaction records. We also utilize backend-handled authentication to securely manage user credentials.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-200">3. How We Use Your Information</h2>
            <p>
              Your information is used to operate and maintain the MarketPulse platform, process orders between buyers and independent sellers, provide customer support, and improve platform performance and security.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-200">4. Data Security</h2>
            <p>
              We implement advanced security protocols, encrypted databases, and backend-validated safeguards to protect your personal and business data against unauthorized access, alteration, disclosure, or destruction.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-200">5. Contact Us</h2>
            <p>
              If you have any questions or concerns about this Privacy Policy or how your data is handled, please reach out to us through our <a href="/contact" className="text-blue-400 hover:underline">Contact Page</a>.
            </p>
          </section>

        </div>

      </div>
    </div>
  );
}