import Navbar from '@/components/Navbar';
import './globals.css';
import Footer from '@/components/Footer';

export const metadata = {
  title: {
    default: "Dokanpat - Modern E-Commerce & Online Marketplace",
    template: "%s | Dokanpat"
  },
  description: "Discover top-tier products from trusted sellers on Dokanpat. Enjoy seamless shopping, secure checkout, and exclusive collections in Bangladesh.",
  keywords: [
    "Dokanpat",
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
  authors: [{ name: "Dokanpat Team" }],
  creator: "Dokanpat",
  publisher: "Dokanpat",
  metadataBase: new URL('https://dokanpat.vercel.app/'), 
  alternates: {
    canonical: '/',
  },
  verification: {
    google: 'chDhbXsqdq3gt6mJi7A_-jdAMjmDWra_vE4TOdIU46Q', 
  },
  openGraph: {
    title: "Dokanpat - Modern E-Commerce & Online Marketplace",
    description: "Discover top-tier products from trusted sellers on Dokanpat. Enjoy seamless shopping and secure checkout.",
    url: 'https://dokanpat.vercel.app/',
    siteName: 'Dokanpat',
    images: [
      {
        url: '/image/dokanpat.PNG', 
        width: 1200,
        height: 630,
        alt: 'Dokanpat Marketplace',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Dokanpat - Modern E-Commerce & Online Marketplace",
    description: "Discover top-tier products from trusted sellers on Dokanpat.",
    images: ['/image/dokanpat.PNG'],
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
    <html lang="en" className="dark">
      <body className="bg-[#bdc3c7] text-slate-100 antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}