import { Store } from 'lucide-react';

export default function Logo() {
  return (
    <div className="text-2xl font-black tracking-wider bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent flex items-center gap-2 group cursor-pointer">
      <Store className="w-7 h-7 text-blue-400 transition-transform group-hover:scale-110" />
      MarketPulse
    </div>
  );
}