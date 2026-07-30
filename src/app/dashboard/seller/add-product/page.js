'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Store, Package, DollarSign, Layers, Image as ImageIcon, ArrowLeft, Send, Sparkles } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import { authClient } from '@/lib/auth-client';

export default function AddProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [userEmail, setUserEmail] = useState('');


  useEffect(() => {
    async function fetchUserSession() {
      try {
        const session = await authClient.getSession();
        if (session?.data?.user?.email) {
          setUserEmail(session.data.user.email);
        }
      } catch (error) {
        console.error('Failed to get session:', error);
      }
    }
    fetchUserSession();
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    category: 'Accessories',
    price: '',
    stock: '',
    description: '',
    image: null,
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = '';

     
      if (formData.image) {
        const imageFormData = new FormData();
        imageFormData.append('image', formData.image);

        const imgbbRes = await fetch(`https://api.imgbb.com/1/upload?key=b169b50f1aa774fb19ee6f6e408f5819`, {
          method: 'POST',
          body: imageFormData,
        });
        const imgbbData = await imgbbRes.json();
        
        if (imgbbData.success) {
          imageUrl = imgbbData.data.url;
        } else {
          throw new Error('Image upload failed to ImgBB');
        }
      }

     
      const productPayload = {
        name: formData.name,
        category: formData.category,
        price: formData.price,
        stock: formData.stock,
        description: formData.description,
        image: imageUrl,
        sellerEmail: userEmail || 'unknown@marketpulse.com',
      };

   
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productPayload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Failed to add product');
      }

      toast.success('Product added successfully! ', {
        style: { background: '#090d16', color: '#fff', border: '1px solid #1e293b' },
      });

      setTimeout(() => {
        router.push('/dashboard/seller');
        router.refresh();
      }, 1200);

    } catch (error) {
      toast.error(error.message || 'Something went wrong!', {
        style: { background: '#090d16', color: '#fff', border: '1px solid #1e293b' },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center py-10 px-4 sm:px-6">
      <Toaster position="top-right" />

      <div className="max-w-2xl w-full space-y-6 bg-slate-900/80 border border-slate-800/80 p-8 rounded-2xl backdrop-blur-xl shadow-2xl">
        
        {/* Top Header & Back Button */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-black tracking-tight text-slate-100">Add New Product</h1>
              <p className="text-xs text-slate-400">Listing as: <span className="text-blue-400 font-semibold">{userEmail || 'Loading...'}</span></p>
            </div>
          </div>

          <Link href="/dashboard/seller" className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-950 border border-slate-800 text-slate-400 hover:text-slate-200 transition-all">
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </Link>
        </div>

        {/* Product Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Product Name</label>
            <div className="relative">
              <Package className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-500" />
              <input 
                type="text" 
                placeholder="e.g. Cyberpunk Mechanical Keyboard"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="w-full pl-10 pr-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-blue-500 transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Category</label>
              <div className="relative">
                <Layers className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-500" />
                <select 
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-200 focus:outline-none focus:border-blue-500 transition-all"
                >
                  <option value="Accessories">Accessories</option>
                  <option value="Gadgets">Gadgets</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Gaming Gear">Gaming Gear</option>
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Price ($)</label>
              <div className="relative">
                <DollarSign className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-500" />
                <input 
                  type="number" 
                  step="0.01"
                  placeholder="85.00"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  required
                  className="w-full pl-10 pr-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-blue-500 transition-all"
                />
              </div>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Stock Quantity</label>
            <input 
              type="number" 
              placeholder="15"
              value={formData.stock}
              onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
              required
              className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-blue-500 transition-all"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Product Image</label>
            <div className="flex items-center gap-4">
              <label className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-400 hover:border-slate-700 cursor-pointer transition-all">
                <ImageIcon className="w-4 h-4 text-slate-500" />
                <span className="truncate">{formData.image ? formData.image.name : 'Upload product image...'}</span>
                <input type="file" accept="image/*" onChange={handleImageChange} required className="hidden" />
              </label>
              {previewImage && (
                <img src={previewImage} alt="Preview" className="w-12 h-12 rounded-xl object-cover border border-slate-700 shadow-md" />
              )}
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Description</label>
            <textarea 
              rows="3"
              placeholder="Write a brief description about the product..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-blue-500 transition-all resize-none"
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-3.5 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-sm font-semibold rounded-xl shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-2 mt-2"
          >
            <span>{loading ? 'Publishing Product...' : 'Publish Product'}</span>
            <Send className="w-4 h-4" />
          </button>

        </form>

      </div>
    </div>
  );
}