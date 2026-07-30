import Navbar from '@/components/Navbar';
import './globals.css';
import Footer from '@/components/Footer';




export const metadata = {
  title: {
    default: "MarketPulse - Modern E-Commerce & Online Marketplace",
    template: "%s | MarketPulse"
  },
  description: "Discover top-tier products from trusted sellers on MarketPulse. Enjoy seamless shopping, secure checkout, and exclusive collections.",
  keywords: [
    "MarketPulse",
    "online marketplace",
    "ecommerce store",
    "buy online",
    "shopping cart",
    "premium products",
    "online shopping Bangladesh",
    "multi-vendor ecommerce",
    "secure checkout store",
    "trending products online",
    "best e-commerce platform"
  ],
  authors: [{ name: "MarketPulse Team" }],
  creator: "MarketPulse",
  publisher: "MarketPulse",
  metadataBase: new URL('https://market-pulse-eosin.vercel.app/'), 
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "MarketPulse - Modern E-Commerce & Online Marketplace",
    description: "Discover top-tier products from trusted sellers on MarketPulse. Enjoy seamless shopping and secure checkout.",
    url: 'https://market-pulse-eosin.vercel.app/',
    siteName: 'MarketPulse',
    images: [
      {
        url: '/image/MarketPulse.png',
        width: 1200,
        height: 630,
        alt: 'MarketPulse Marketplace',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "MarketPulse - Modern E-Commerce & Online Marketplace",
    description: "Discover top-tier products from trusted sellers on MarketPulse.",
    images: ['/image/MarketPulse.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
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