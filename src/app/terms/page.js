export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-10">
        
        {/* Header */}
        <div className="space-y-3 border-b border-slate-900 pb-8">
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent">
            Terms of Service
          </h1>
          <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">
            Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </div>

        {/* Content Sections */}
        <div className="space-y-8 text-sm text-slate-300 leading-relaxed">
          
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-200">1. Acceptance of Terms</h2>
            <p>
              Welcome to MarketPulse. By accessing or using our multi-vendor SaaS platform, launching a storefront, or purchasing products, you agree to be bound by these Terms of Service. If you do not agree to all of these terms, please do not use our platform.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-200">2. Seller Accounts & Responsibilities</h2>
            <p>
              Independent sellers on MarketPulse are solely responsible for the operation of their custom storefronts, accurate product descriptions, pricing, inventory management, and timely fulfillment of customer orders. Sellers must ensure that all items listed comply with local laws and do not infringe on intellectual property rights.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-200">3. Buyer Guidelines & Transactions</h2>
            <p>
              Buyers using MarketPulse to discover and purchase from independent shops agree to provide accurate billing and shipping information. All financial transactions processed through the platform are secured using advanced encryption and backend-validated protocols.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-200">4. Intellectual Property</h2>
            <p>
              The MarketPulse platform, including its original design, source code, logos, and features, is protected under intellectual property laws. Sellers retain ownership of their unique shop branding and product listings but grant MarketPulse a license to display them within the SaaS ecosystem.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-200">5. Limitation of Liability</h2>
            <p>
              MarketPulse acts as a SaaS infrastructure provider connecting sellers and buyers. We are not directly liable for disputes arising between individual sellers and buyers, though we reserve the right to mediate or suspend accounts that violate platform safety rules.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-200">6. Contact Information</h2>
            <p>
              If you have any questions regarding these Terms of Service, please reach out to our support team through our <a href="/contact" className="text-blue-400 hover:underline">Contact Page</a>.
            </p>
          </section>

        </div>

      </div>
    </div>
  );
}