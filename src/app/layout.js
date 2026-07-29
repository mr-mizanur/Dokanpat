import Navbar from '@/components/Navbar';
import './globals.css';
import Footer from '@/components/Footer';


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