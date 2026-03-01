import { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Building2, 
  Mail, 
  MapPin, 
  Phone, 
  Plus, 
  Package, 
  Image as ImageIcon, 
  Video, 
  X,
  ChevronRight,
  CheckCircle2,
  Loader2
} from 'lucide-react';
import { Post, BLOCK_TYPES } from './types';

// --- Sub-components ---

const Header = () => (
  <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-zinc-100">
    <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 bg-zinc-900 flex items-center justify-center rounded-lg">
          <Building2 className="text-white w-6 h-6" />
        </div>
        <span className="font-bold text-xl tracking-tight text-zinc-900">SOLIDROCK</span>
      </div>
      <nav className="hidden md:flex items-center gap-8">
        <a href="#about" className="text-sm font-medium text-zinc-600 hover:text-zinc-900 transition-colors">About</a>
        <a href="#gallery" className="text-sm font-medium text-zinc-600 hover:text-zinc-900 transition-colors">Gallery</a>
        <a href="#order" className="text-sm font-medium text-zinc-600 hover:text-zinc-900 transition-colors">Order Blocks</a>
        <a href="#contact" className="text-sm font-medium text-zinc-600 hover:text-zinc-900 transition-colors">Contact</a>
      </nav>
      <a href="#order" className="bg-zinc-900 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-zinc-800 transition-colors">
        Place Order
      </a>
    </div>
  </header>
);

const Hero = () => (
  <section className="relative py-24 overflow-hidden bg-zinc-50">
    <div className="max-w-7xl mx-auto px-4 relative z-10">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl"
      >
        <span className="inline-block px-3 py-1 bg-zinc-200 text-zinc-700 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
          Established 1998
        </span>
        <h1 className="text-6xl font-bold text-zinc-900 leading-[1.1] mb-6">
          Building the Future, <br />
          <span className="text-zinc-400">One Block at a Time.</span>
        </h1>
        <p className="text-lg text-zinc-600 mb-10 leading-relaxed">
          Premium quality concrete blocks for residential and commercial construction. 
          Engineered for strength, durability, and precision.
        </p>
        <div className="flex flex-wrap gap-4">
          <a href="#order" className="px-8 py-4 bg-zinc-900 text-white rounded-2xl font-semibold flex items-center gap-2 hover:bg-zinc-800 transition-all">
            Start Your Project <ChevronRight className="w-4 h-4" />
          </a>
          <a href="#gallery" className="px-8 py-4 bg-white border border-zinc-200 text-zinc-900 rounded-2xl font-semibold hover:bg-zinc-50 transition-all">
            View Our Work
          </a>
        </div>
      </motion.div>
    </div>
    <div className="absolute top-0 right-0 w-1/2 h-full hidden lg:block">
      <img 
        src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=1000" 
        alt="Construction blocks"
        className="w-full h-full object-cover grayscale opacity-20"
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-gradient-to-l from-zinc-50 via-transparent to-zinc-50" />
    </div>
  </section>
);

const About = () => (
  <section id="about" className="py-24 bg-white">
    <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-16 items-center">
      <div className="relative">
        <div className="aspect-square rounded-[3rem] overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80&w=1000" 
            alt="Factory floor"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="absolute -bottom-8 -right-8 bg-zinc-900 text-white p-8 rounded-3xl shadow-2xl hidden md:block">
          <p className="text-4xl font-bold mb-1">25+</p>
          <p className="text-zinc-400 text-sm uppercase tracking-widest font-bold">Years Experience</p>
        </div>
      </div>
      <div>
        <h2 className="text-4xl font-bold mb-8">Quality You Can Trust</h2>
        <p className="text-zinc-600 text-lg mb-8 leading-relaxed">
          SolidRock Block Factory has been a leader in the construction supply industry since 1998. 
          We specialize in high-strength concrete blocks, pavers, and custom masonry solutions. 
          Our commitment to quality and customer service has made us the preferred choice for 
          builders across the region.
        </p>
        <div className="grid sm:grid-cols-2 gap-8">
          <div className="space-y-2">
            <h4 className="font-bold text-zinc-900">Our Mission</h4>
            <p className="text-sm text-zinc-500">To provide the strongest foundations for every home and infrastructure project.</p>
          </div>
          <div className="space-y-2">
            <h4 className="font-bold text-zinc-900">Our Vision</h4>
            <p className="text-sm text-zinc-500">To be the most innovative and sustainable block manufacturer in the industry.</p>
          </div>
        </div>
        
        <div className="mt-12 pt-12 border-t border-zinc-100 flex flex-col sm:flex-row gap-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-zinc-50 rounded-full flex items-center justify-center">
              <MapPin className="w-5 h-5 text-zinc-900" />
            </div>
            <div>
              <p className="text-xs font-bold text-zinc-400 uppercase">Location</p>
              <p className="text-sm font-medium">Concrete Valley, CV 45678</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-zinc-50 rounded-full flex items-center justify-center">
              <Mail className="w-5 h-5 text-zinc-900" />
            </div>
            <div>
              <p className="text-xs font-bold text-zinc-400 uppercase">Email</p>
              <p className="text-sm font-medium">sales@solidrockblocks.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Gallery = ({ posts, loading, onOpenModal }: { posts: Post[], loading: boolean, onOpenModal: (type?: 'image' | 'video') => void }) => (
  <section id="gallery" className="py-24 max-w-7xl mx-auto px-4">
    <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
      <div>
        <h2 className="text-3xl font-bold mb-2">Project Showcase</h2>
        <p className="text-zinc-500">Recent work and product updates from our factory.</p>
      </div>
      <div className="flex flex-wrap gap-3">
        <button 
          onClick={() => onOpenModal('image')}
          className="flex items-center gap-2 px-4 py-2 bg-zinc-100 hover:bg-zinc-200 rounded-lg text-sm font-semibold transition-colors"
        >
          <ImageIcon className="w-4 h-4" /> Add Image
        </button>
        <button 
          onClick={() => onOpenModal('video')}
          className="flex items-center gap-2 px-4 py-2 bg-zinc-100 hover:bg-zinc-200 rounded-lg text-sm font-semibold transition-colors"
        >
          <Video className="w-4 h-4" /> Add Video
        </button>
      </div>
    </div>

    {loading ? (
      <div className="flex justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-zinc-300" />
      </div>
    ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <motion.div 
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            key={post.id} 
            className="group relative bg-zinc-50 rounded-3xl overflow-hidden border border-zinc-100"
          >
            <div className="aspect-[4/5] overflow-hidden bg-zinc-200 relative">
              {post.type === 'image' ? (
                <img 
                  src={post.url} 
                  alt={post.caption} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-full h-full relative">
                  <video 
                    src={post.url} 
                    className="w-full h-full object-cover"
                    controls
                    playsInline
                  />
                </div>
              )}
            </div>
            <div className="p-6">
              <p className="text-zinc-700 text-sm leading-relaxed line-clamp-3">{post.caption}</p>
              <div className="mt-4 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                {post.type === 'image' ? <ImageIcon className="w-3 h-3" /> : <Video className="w-3 h-3" />}
                {new Date(post.created_at).toLocaleDateString()}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    )}
  </section>
);

const OrderForm = ({ orderStatus, onSubmit }: { orderStatus: string, onSubmit: (e: FormEvent<HTMLFormElement>) => void }) => (
  <section id="order" className="py-24 bg-zinc-900 text-white">
    <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-20 items-center">
      <div>
        <h2 className="text-4xl font-bold mb-6">Ready to start building?</h2>
        <p className="text-zinc-400 text-lg mb-10">
          Fill out the form to place your order. Our team will contact you within 
          24 hours to confirm delivery details and payment.
        </p>
        
        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-zinc-800 rounded-2xl flex items-center justify-center shrink-0">
              <Package className="w-6 h-6 text-zinc-400" />
            </div>
            <div>
              <h4 className="font-semibold mb-1">Bulk Discounts</h4>
              <p className="text-sm text-zinc-500">Special pricing available for orders over 5,000 blocks.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-zinc-800 rounded-2xl flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-6 h-6 text-zinc-400" />
            </div>
            <div>
              <h4 className="font-semibold mb-1">Quality Guaranteed</h4>
              <p className="text-sm text-zinc-500">All blocks meet national construction standards.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[2rem] p-8 lg:p-12 text-zinc-900">
        <form onSubmit={onSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-400">Full Name</label>
              <input 
                required
                name="name"
                type="text" 
                placeholder="John Doe"
                className="w-full px-4 py-3 bg-zinc-50 border border-zinc-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-zinc-900 transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-400">Email Address</label>
              <input 
                required
                name="email"
                type="email" 
                placeholder="john@example.com"
                className="w-full px-4 py-3 bg-zinc-50 border border-zinc-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-zinc-900 transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-400">Block Type</label>
            <select 
              required
              name="block_type"
              className="w-full px-4 py-3 bg-zinc-50 border border-zinc-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-zinc-900 transition-all appearance-none"
            >
              <option value="">Select a block type</option>
              {BLOCK_TYPES.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-400">Quantity</label>
            <input 
              required
              name="quantity"
              type="number" 
              min="100"
              placeholder="Minimum 100 blocks"
              className="w-full px-4 py-3 bg-zinc-50 border border-zinc-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-zinc-900 transition-all"
            />
          </div>

          <button 
            disabled={orderStatus !== 'idle'}
            type="submit"
            className="w-full py-4 bg-zinc-900 text-white rounded-xl font-bold hover:bg-zinc-800 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {orderStatus === 'submitting' && <Loader2 className="w-4 h-4 animate-spin" />}
            {orderStatus === 'success' ? 'Order Received!' : 'Place Order Now'}
          </button>
        </form>
      </div>
    </div>
  </section>
);

const Contact = () => (
  <section id="contact" className="py-24 max-w-7xl mx-auto px-4">
    <div className="grid md:grid-cols-3 gap-12">
      <div className="space-y-4">
        <div className="w-12 h-12 bg-zinc-100 rounded-2xl flex items-center justify-center">
          <MapPin className="w-6 h-6 text-zinc-900" />
        </div>
        <h3 className="text-xl font-bold">Visit Us</h3>
        <p className="text-zinc-500 leading-relaxed">
          123 Industrial Way, <br />
          Concrete Valley, CV 45678
        </p>
      </div>
      <div className="space-y-4">
        <div className="w-12 h-12 bg-zinc-100 rounded-2xl flex items-center justify-center">
          <Mail className="w-6 h-6 text-zinc-900" />
        </div>
        <h3 className="text-xl font-bold">Email Us</h3>
        <p className="text-zinc-500 leading-relaxed">
          sales@solidrockblocks.com<br />
          support@solidrockblocks.com
        </p>
      </div>
      <div className="space-y-4">
        <div className="w-12 h-12 bg-zinc-100 rounded-2xl flex items-center justify-center">
          <Phone className="w-6 h-6 text-zinc-900" />
        </div>
        <h3 className="text-xl font-bold">Call Us</h3>
        <p className="text-zinc-500 leading-relaxed">
          +1 (555) 123-4567<br />
          Mon - Sat: 8am - 6pm
        </p>
      </div>
    </div>
  </section>
);

const PostModal = ({ isOpen, onClose, onSubmit, initialType }: { isOpen: boolean, onClose: () => void, onSubmit: (e: FormEvent<HTMLFormElement>) => void, initialType?: 'image' | 'video' }) => {
  const [uploadType, setUploadType] = useState<'file' | 'url'>('file');
  const [mediaType, setMediaType] = useState<'image' | 'video'>(initialType || 'image');

  useEffect(() => {
    if (initialType) setMediaType(initialType);
  }, [initialType]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-zinc-900/60 backdrop-blur-sm" 
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative bg-white rounded-[2rem] p-8 w-full max-w-md shadow-2xl overflow-y-auto max-h-[90vh]"
          >
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 p-2 hover:bg-zinc-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-2xl font-bold mb-6">Post an Update</h3>
            <form onSubmit={onSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-400">Media Type</label>
                <select 
                  name="type"
                  value={mediaType}
                  onChange={(e) => setMediaType(e.target.value as 'image' | 'video')}
                  className="w-full px-4 py-3 bg-zinc-50 border border-zinc-100 rounded-xl focus:outline-none"
                >
                  <option value="image">Image</option>
                  <option value="video">Video</option>
                </select>
              </div>

              <div className="flex gap-4 mb-4">
                <button
                  type="button"
                  onClick={() => setUploadType('file')}
                  className={`flex-1 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${uploadType === 'file' ? 'bg-zinc-900 text-white' : 'bg-zinc-100 text-zinc-400'}`}
                >
                  Upload File
                </button>
                <button
                  type="button"
                  onClick={() => setUploadType('url')}
                  className={`flex-1 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${uploadType === 'url' ? 'bg-zinc-900 text-white' : 'bg-zinc-100 text-zinc-400'}`}
                >
                  Use URL
                </button>
              </div>

              {uploadType === 'file' ? (
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-400">Select File</label>
                  <input 
                    required
                    name="file"
                    type="file" 
                    accept={mediaType === 'image' ? "image/*" : "video/*"}
                    className="w-full px-4 py-3 bg-zinc-50 border border-zinc-100 rounded-xl focus:outline-none file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-zinc-900 file:text-white hover:file:bg-zinc-800"
                  />
                </div>
              ) : (
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-400">Media URL</label>
                  <input 
                    required
                    name="url"
                    type="url" 
                    placeholder={mediaType === 'image' ? "https://images.unsplash.com/..." : "https://example.com/video.mp4"}
                    className="w-full px-4 py-3 bg-zinc-50 border border-zinc-100 rounded-xl focus:outline-none"
                  />
                </div>
              )}

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-400">Caption</label>
                <textarea 
                  required
                  name="caption"
                  placeholder="Describe the update..."
                  className="w-full px-4 py-3 bg-zinc-50 border border-zinc-100 rounded-xl focus:outline-none min-h-[100px]"
                />
              </div>
              <button 
                type="submit"
                className="w-full py-4 bg-zinc-900 text-white rounded-xl font-bold hover:bg-zinc-800 transition-all flex items-center justify-center gap-2"
              >
                Publish Update
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

// --- Main App Component ---

export default function App() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [showPostModal, setShowPostModal] = useState(false);
  const [modalInitialType, setModalInitialType] = useState<'image' | 'video'>('image');
  const [orderStatus, setOrderStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await fetch('/api/posts');
      const data = await res.json();
      setPosts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handlePostSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    try {
      await fetch('/api/posts', {
        method: 'POST',
        body: formData, // Send FormData directly for file upload
      });
      setShowPostModal(false);
      fetchPosts();
    } catch (err) {
      console.error(err);
    }
  };

  const handleOpenModal = (type?: 'image' | 'video') => {
    if (type) setModalInitialType(type);
    setShowPostModal(true);
  };

  const handleOrderSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setOrderStatus('submitting');
    const formData = new FormData(e.currentTarget);
    const orderData = {
      customer_name: formData.get('name'),
      customer_email: formData.get('email'),
      block_type: formData.get('block_type'),
      quantity: parseInt(formData.get('quantity') as string),
    };

    try {
      await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });
      setOrderStatus('success');
      setTimeout(() => setOrderStatus('idle'), 3000);
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      console.error(err);
      setOrderStatus('idle');
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-zinc-900">
      <Header />
      <Hero />
      <About />
      <Gallery posts={posts} loading={loading} onOpenModal={handleOpenModal} />
      <OrderForm orderStatus={orderStatus} onSubmit={handleOrderSubmit} />
      <Contact />
      
      <footer className="py-12 border-t border-zinc-100 text-center">
        <p className="text-zinc-400 text-sm">© 2024 SolidRock Block Factory. All rights reserved.</p>
      </footer>

      <PostModal 
        isOpen={showPostModal} 
        onClose={() => setShowPostModal(false)} 
        onSubmit={handlePostSubmit} 
        initialType={modalInitialType}
      />
    </div>
  );
}
