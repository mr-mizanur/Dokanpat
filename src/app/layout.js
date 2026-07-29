import Navbar from '@/components/Navbar';
import './globals.css';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'MarketPulse - Ultimate Multi-Vendor SaaS Platform',
  description: 'Empowering independent sellers to launch, manage, and scale their custom storefronts seamlessly.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-slate-100">
       
        <Navbar />
        
        <main>{children}</main>
        
        <Footer />
      </body>
    </html>
  );
}