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
        sellerEmail: userEmail || 'unknown@dokanpat.com',
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

      toast.success('Product added successfully!', {
        style: { background: '#ffffff', color: '#1e293b', border: '1px solid #ffedd5' },
      });

      setTimeout(() => {
        router.push('/dashboard/seller');
        router.refresh();
      }, 1200);

    } catch (error) {
      toast.error(error.message || 'Something went wrong!', {
        style: { background: '#ffffff', color: '#1e293b', border: '1px solid #ffedd5' },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex items-center justify-center py-10 px-4 sm:px-6">
      <Toaster position="top-right" />

      <div className="max-w-2xl w-full space-y-6 bg-white border border-orange-100 p-8 rounded-2xl shadow-sm">
        
       
        <div className="flex items-center justify-between pb-4 border-b border-orange-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-200 flex items-center justify-center text-orange-600">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-black tracking-tight text-slate-900">Add New Product</h1>
              <p className="text-xs text-slate-500">Listing as: <span className="text-orange-600 font-semibold">{userEmail || 'Loading...'}</span></p>
            </div>
          </div>

          <Link href="/dashboard/seller" className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-50 border border-orange-100 text-slate-600 hover:text-orange-600 transition-all">
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </Link>
        </div>

       
        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">Product Name</label>
            <div className="relative">
              <Package className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="e.g. Premium Cotton Panjabi"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-orange-100 rounded-xl text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-orange-500 transition-all shadow-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">Category</label>
              <div className="relative">
                <Layers className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                <select 
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-orange-100 rounded-xl text-sm text-slate-800 focus:outline-none focus:border-orange-500 transition-all shadow-sm"
                >
                  <option value="Accessories">Accessories</option>
                  <option value="Gadgets">Gadgets</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Gaming Gear">Gaming Gear</option>
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">Price (৳)</label>
              <div className="relative">
                <DollarSign className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                <input 
                  type="number" 
                  step="0.01"
                  placeholder="1250"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  required
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-orange-100 rounded-xl text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-orange-500 transition-all shadow-sm"
                />
              </div>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">Stock Quantity</label>
            <input 
              type="number" 
              placeholder="15"
              value={formData.stock}
              onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
              required
              className="w-full px-4 py-3 bg-slate-50 border border-orange-100 rounded-xl text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-orange-500 transition-all shadow-sm"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">Product Image</label>
            <div className="flex items-center gap-4">
              <label className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-slate-50 border border-orange-100 rounded-xl text-sm text-slate-600 hover:border-orange-300 cursor-pointer transition-all shadow-sm">
                <ImageIcon className="w-4 h-4 text-orange-600" />
                <span className="truncate">{formData.image ? formData.image.name : 'Upload product image...'}</span>
                <input type="file" accept="image/*" onChange={handleImageChange} required className="hidden" />
              </label>
              {previewImage && (
                <img src={previewImage} alt="Preview" className="w-12 h-12 rounded-xl object-cover border border-orange-200 shadow-sm bg-white" />
              )}
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">Description</label>
            <textarea 
              rows="3"
              placeholder="Write a brief description about the product..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-3 bg-slate-50 border border-orange-100 rounded-xl text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-orange-500 transition-all resize-none shadow-sm"
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-3.5 px-4 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white text-sm font-semibold rounded-xl shadow-md shadow-orange-500/25 transition-all flex items-center justify-center gap-2 mt-2"
          >
            <span>{loading ? 'Publishing Product...' : 'Publish Product'}</span>
            <Send className="w-4 h-4" />
          </button>

        </form>

      </div>
    </div>
  );
}