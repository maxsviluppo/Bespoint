import React, { useState, useMemo, useEffect, useRef } from "react";
import { 
  Search, 
  ShoppingCart, 
  Menu, 
  X, 
  Star, 
  Plus, 
  Minus, 
  Maximize,
  ChevronRight, 
  ChevronLeft,
  ArrowLeft,
  Home,
  Grid,
  User,
  Heart,
  Check,
  Facebook,
  Instagram,
  Twitter,
  Mail,
  Phone,
  MapPin,
  MessageCircle,
  Compass,
  Box,
  Share2,
  Play,
  Youtube
} from "lucide-react";
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent, useSpring } from "motion/react";
import { PRODUCTS, CATEGORIES, SUBCATEGORIES } from "./data";
import { Product, CartItem } from "./types";

// --- Components ---

const CartSplash = ({ trigger, isMenuHidden, count }: { trigger: number; isMenuHidden: boolean; count: number; key?: string }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (trigger > 0 && isMenuHidden) {
      setIsVisible(true);
      const timer = setTimeout(() => setIsVisible(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [trigger, isMenuHidden]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="cart-splash-container"
          initial={{ opacity: 0, x: 200 }}
          animate={{ 
            opacity: 1, 
            x: 0,
            transition: { type: "spring", damping: 20, stiffness: 100 }
          }}
          exit={{ 
            opacity: 0, 
            x: 200,
            transition: { duration: 0.3 }
          }}
          className="fixed bottom-6 right-6 z-[100] flex items-center"
        >
          <div className="relative w-16 h-16 bg-brand-blue rounded-full shadow-[0_10px_40px_rgba(0,0,0,0.3)] flex items-center justify-center border-2 border-brand-yellow">
            {/* Stars Animation */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={`splash-star-${i}`}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ 
                  scale: [0, 1.2, 0],
                  opacity: [0, 1, 0],
                  x: Math.cos(i * 60 * Math.PI / 180) * 50,
                  y: Math.sin(i * 60 * Math.PI / 180) * 50,
                }}
                transition={{ 
                  duration: 1, 
                  delay: i * 0.05,
                  ease: "easeOut"
                }}
                className="absolute"
              >
                <Star className="w-4 h-4 text-brand-yellow fill-brand-yellow" />
              </motion.div>
            ))}
            
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, -10, 10, 0]
              }}
              transition={{ duration: 0.5, repeat: 1 }}
            >
              <ShoppingCart className="w-8 h-8 text-brand-yellow fill-brand-yellow" />
            </motion.div>

            {/* Yellow Bubble for Count (Bolla Gialla) */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
              className="absolute -top-1 -right-1 w-7 h-7 bg-brand-yellow text-brand-dark text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white shadow-lg"
            >
              {count}
            </motion.div>

            {/* Splash Ring */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0.5 }}
              animate={{ scale: 1.5, opacity: 0 }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="absolute inset-0 rounded-full border-2 border-brand-yellow"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

function ProductCard({ product, onClick, onAddToCart, index }: { product: Product; onClick: () => void; onAddToCart: (p: Product) => void; index: number }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration: 0.5, 
        delay: (index % 4) * 0.1,
        ease: [0.21, 1.02, 0.73, 1]
      }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      layoutId={`product-${product.id}`}
      className="bg-white p-3 rounded-xl shadow-sm border border-gray-100 flex flex-col h-full hover:shadow-xl transition-shadow duration-300"
    >
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: (index % 4) * 0.1 + 0.2 }}
        onClick={onClick}
        className="aspect-square mb-3 cursor-pointer overflow-hidden rounded-lg bg-gray-50"
      >
        <img src={product.image} alt={product.name} className="w-full h-full object-cover hover:scale-105 transition-transform" referrerPolicy="no-referrer" />
      </motion.div>
      <motion.h3 
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: (index % 4) * 0.1 + 0.3 }}
        onClick={onClick}
        className="text-sm font-medium text-brand-dark line-clamp-2 mb-1 cursor-pointer hover:text-brand-yellow"
      >
        {product.name}
      </motion.h3>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: (index % 4) * 0.1 + 0.4 }}
        className="flex items-center gap-1 mb-2"
      >
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <Star key={`card-star-${i}`} className={`w-3 h-3 ${i < Math.floor(product.rating) ? "text-brand-yellow fill-brand-yellow" : "text-gray-200"}`} />
          ))}
        </div>
        <span className="text-[10px] text-blue-600 font-medium">{product.reviews}</span>
      </motion.div>
      <div className="mt-auto">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: (index % 4) * 0.1 + 0.5 }}
          className="flex items-baseline gap-1 mb-3"
        >
          <span className="text-xs font-bold align-top">€</span>
          <span className="text-xl font-bold">{Math.floor(product.price)}</span>
          <span className="text-xs font-bold">{(product.price % 1).toFixed(2).substring(2)}</span>
        </motion.div>
        <motion.button 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: (index % 4) * 0.1 + 0.6 }}
          onClick={() => onAddToCart(product)}
          className="w-full bg-brand-yellow hover:bg-brand-orange text-brand-dark py-2 rounded-lg text-xs font-bold shadow-sm active:scale-95 transition-all"
        >
          Aggiungi al carrello
        </motion.button>
      </div>
    </motion.div>
  );
}

const ProductSheet = ({ product, onClose, onAddToCart }: { product: Product; onClose: () => void; onAddToCart: (p: Product) => void; key?: string }) => {
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(product.image);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = carouselRef.current.offsetWidth * 0.8;
      carouselRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  const relatedProducts = useMemo(() => {
    return PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 8);
  }, [product]);

  return (
    <>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
      />
      <motion.div 
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="fixed inset-x-0 bottom-0 bg-white rounded-t-[32px] z-50 shadow-2xl flex flex-col max-h-[95vh]"
      >
        <div 
          onClick={onClose}
          className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto my-3 flex-shrink-0 cursor-pointer hover:bg-gray-300 transition-colors" 
        />
        
        <div className="overflow-y-auto pb-32 px-6">
          {/* Main Image & Gallery */}
          <div 
            className="relative aspect-square rounded-3xl overflow-hidden mb-4 bg-gray-50 border border-gray-100 cursor-pointer group"
            onClick={() => setIsLightboxOpen(true)}
          >
            <AnimatePresence mode="wait">
              <motion.img 
                key={activeImage}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                src={activeImage} 
                alt={product.name} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </AnimatePresence>
            
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
              <div className="bg-white/80 backdrop-blur-md p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
                <Maximize className="w-6 h-6 text-brand-dark" />
              </div>
            </div>
            
            <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
              <button 
                onClick={() => setIsFavorite(!isFavorite)}
                className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg backdrop-blur-md transition-all ${isFavorite ? "bg-red-500 text-white" : "bg-white/80 text-gray-400"}`}
              >
                <Heart className={`w-5 h-5 ${isFavorite ? "fill-white" : ""}`} />
              </button>
              <button className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-md text-gray-400 flex items-center justify-center shadow-lg">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Thumbnails */}
          <div className="flex gap-3 mb-6 overflow-x-auto no-scrollbar pb-2">
            <button 
              key="main-thumb"
              onClick={() => setActiveImage(product.image)}
              className={`w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 border-2 transition-all ${activeImage === product.image ? "border-brand-yellow" : "border-transparent"}`}
            >
              <img src={product.image} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </button>
            {product.gallery.map((img, idx) => (
              <button 
                key={`gallery-${idx}`}
                onClick={() => setActiveImage(img)}
                className={`w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 border-2 transition-all ${activeImage === img ? "border-brand-yellow" : "border-transparent"}`}
              >
                <img src={img} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </button>
            ))}
            {product.has3D && (
              <button className="w-16 h-16 rounded-xl bg-brand-blue flex flex-col items-center justify-center text-white flex-shrink-0 group hover:bg-brand-yellow hover:text-brand-dark transition-colors">
                <Box className="w-6 h-6 mb-1" />
                <span className="text-[8px] font-bold uppercase">3D View</span>
              </button>
            )}
          </div>

          {/* Info */}
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-xs font-semibold text-brand-yellow uppercase tracking-widest mb-1">{product.category}</p>
              <h2 className="text-2xl font-black text-brand-dark leading-tight">{product.name}</h2>
            </div>
            <div className="flex items-center bg-brand-yellow/10 px-3 py-1.5 rounded-full">
              <Star className="w-4 h-4 text-brand-yellow fill-brand-yellow mr-1" />
              <span className="text-sm font-black text-brand-dark">{product.rating}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 mb-8">
            <span className="text-3xl font-black text-brand-blue">€{product.price.toFixed(2)}</span>
            <span className="text-sm text-gray-400 line-through">€{(product.price * 1.2).toFixed(2)}</span>
            <span className="bg-red-100 text-red-600 text-[10px] font-black px-2 py-1 rounded-md uppercase">-20%</span>
          </div>

          {/* Description with interspersed images */}
          <div className="space-y-6 mb-12">
            <h4 className="font-black text-sm uppercase tracking-widest text-brand-dark border-l-4 border-brand-yellow pl-3">Descrizione Prodotto</h4>
            <div className="text-gray-600 text-sm leading-relaxed space-y-4">
              <p>{product.description}</p>
              {product.gallery[0] && (
                <div className="rounded-2xl overflow-hidden h-48 w-full shadow-lg">
                  <img src={product.gallery[0]} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
              )}
              <p>Progettato per durare nel tempo, questo prodotto unisce materiali di alta qualità a un design funzionale che si adatta a ogni ambiente domestico o professionale.</p>
              {product.gallery[1] && (
                <div className="rounded-2xl overflow-hidden h-48 w-full shadow-lg">
                  <img src={product.gallery[1]} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
              )}
              <p>La facilità di installazione e la manutenzione ridotta lo rendono la scelta ideale per chi cerca praticità senza rinunciare all'estetica.</p>
            </div>
          </div>

          {/* Technical Specs */}
          <div className="space-y-6 mb-12">
            <h4 className="font-black text-sm uppercase tracking-widest text-brand-dark border-l-4 border-brand-yellow pl-3">Caratteristiche Tecniche</h4>
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(product.specs).map(([key, value]) => (
                <div key={key} className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                  <p className="text-[10px] text-gray-400 uppercase font-black mb-1">{key}</p>
                  <p className="text-sm font-bold text-brand-dark">{value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Video Tutorial Section */}
          {product.videoUrl && (
            <div className="space-y-6 mb-12">
              <h4 className="font-black text-sm uppercase tracking-widest text-brand-dark border-l-4 border-brand-yellow pl-3">Video Tutorial</h4>
              <a 
                href={product.videoUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="group relative block aspect-video w-full rounded-3xl overflow-hidden shadow-xl border border-gray-100"
              >
                <img 
                  src={`https://img.youtube.com/vi/${product.videoUrl.includes('v=') ? product.videoUrl.split('v=')[1].split('&')[0] : product.videoUrl.split('/').pop()}/maxresdefault.jpg`} 
                  alt="Video Tutorial Thumbnail" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                  <div className="w-16 h-16 bg-brand-yellow rounded-full flex items-center justify-center shadow-2xl transform group-hover:scale-110 transition-transform">
                    <Play className="w-8 h-8 text-brand-dark fill-brand-dark ml-1" />
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2 bg-black/60 backdrop-blur-md p-3 rounded-2xl">
                  <Youtube className="w-5 h-5 text-red-500" />
                  <span className="text-xs font-bold text-white">Guarda il tutorial su YouTube</span>
                </div>
              </a>
            </div>
          )}

          {/* Reviews Section (Amazon Style) */}
          <div className="space-y-8 mb-12">
            <h4 className="font-black text-sm uppercase tracking-widest text-brand-dark border-l-4 border-brand-yellow pl-3">Recensioni Clienti</h4>
            
            <div className="flex flex-col md:flex-row gap-8">
              {/* Rating Summary */}
              <div className="w-full md:w-1/3 space-y-4">
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className={`w-5 h-5 ${s <= Math.round(product.rating) ? "text-brand-yellow fill-brand-yellow" : "text-gray-200"}`} />
                    ))}
                  </div>
                  <span className="text-xl font-black text-brand-dark">{product.rating} su 5</span>
                </div>
                <p className="text-xs text-gray-500 font-bold">{product.reviews} valutazioni globali</p>
                
                <div className="space-y-2">
                  {[
                    { stars: 5, percentage: 75 },
                    { stars: 4, percentage: 15 },
                    { stars: 3, percentage: 5 },
                    { stars: 2, percentage: 3 },
                    { stars: 1, percentage: 2 },
                  ].map((row) => (
                    <div key={row.stars} className="flex items-center gap-3 text-xs">
                      <span className="w-12 font-bold text-blue-600 hover:underline cursor-pointer">{row.stars} stelle</span>
                      <div className="flex-1 h-4 bg-gray-100 rounded-sm overflow-hidden border border-gray-200">
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: `${row.percentage}%` }}
                          className="h-full bg-brand-yellow"
                        />
                      </div>
                      <span className="w-8 text-right text-gray-500 font-bold">{row.percentage}%</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Individual Reviews */}
              <div className="flex-1 space-y-6">
                {[
                  { user: "Marco R.", date: "15 Marzo 2026", title: "Qualità eccellente", text: "Prodotto arrivato in anticipo. La qualità dei materiali è superiore alle aspettative. Bespoint non delude mai.", rating: 5 },
                  { user: "Elena V.", date: "2 Febbraio 2026", title: "Ottimo rapporto qualità/prezzo", text: "Facile da installare e molto funzionale. Lo consiglio vivamente per chi cerca affidabilità.", rating: 4 },
                ].map((rev, i) => (
                  <div key={i} className="space-y-2 pb-6 border-b border-gray-100 last:border-0">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-gray-400" />
                      </div>
                      <span className="text-sm font-bold text-brand-dark">{rev.user}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star key={s} className={`w-3 h-3 ${s <= rev.rating ? "text-brand-yellow fill-brand-yellow" : "text-gray-200"}`} />
                        ))}
                      </div>
                      <span className="text-xs font-black text-brand-dark">{rev.title}</span>
                    </div>
                    <p className="text-[10px] text-gray-400 font-bold">Recensito il {rev.date}</p>
                    <p className="text-xs text-gray-600 leading-relaxed">{rev.text}</p>
                    <div className="flex items-center gap-4 pt-2">
                      <button className="px-4 py-1 border border-gray-300 rounded-lg text-[10px] font-bold hover:bg-gray-50 transition-colors">Utile</button>
                      <button className="text-[10px] text-gray-400 font-bold hover:underline">Segnala</button>
                    </div>
                  </div>
                ))}
                <button className="text-sm font-bold text-blue-600 hover:underline">Leggi tutte le {product.reviews} recensioni</button>
              </div>
            </div>
          </div>

          {/* Related Products Carousel */}
          <div className="space-y-4 mb-12">
            <div className="flex items-center justify-between pr-6">
              <h4 className="font-black text-[10px] uppercase tracking-widest text-brand-dark border-l-4 border-brand-yellow pl-3">Prodotti Correlati</h4>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => scroll('left')}
                  className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-brand-dark active:scale-90 transition-transform"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => scroll('right')}
                  className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-brand-dark active:scale-90 transition-transform"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div 
              ref={carouselRef}
              className="flex overflow-x-auto no-scrollbar gap-3 pb-4 snap-x snap-mandatory px-0.5 scroll-smooth"
            >
              {relatedProducts.map((p, idx) => (
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  viewport={{ once: true }}
                  key={p.id} 
                  className="flex-shrink-0 w-[calc(50%-6px)] snap-start bg-white border border-gray-100 rounded-2xl p-3 shadow-sm flex flex-col"
                >
                  <div className="aspect-square rounded-xl overflow-hidden mb-2 bg-gray-50">
                    <img src={p.image} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <h5 className="text-[10px] font-bold text-brand-dark line-clamp-2 mb-1 h-8">{p.name}</h5>
                  <div className="mt-auto pt-2 border-t border-gray-50 flex items-center justify-between">
                    <p className="text-xs font-black text-brand-blue">€{p.price.toFixed(2)}</p>
                    <div className="flex items-center gap-0.5">
                      <Star className="w-2 h-2 text-brand-yellow fill-brand-yellow" />
                      <span className="text-[8px] font-bold">{p.rating}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Action Bar */}
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-white/90 backdrop-blur-xl border-t border-gray-100 flex items-center justify-between gap-4 z-20">
          <div className="flex items-center bg-gray-100 rounded-2xl p-1">
            <button 
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-10 h-10 flex items-center justify-center rounded-xl bg-white shadow-sm active:scale-90 transition-transform"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-10 text-center font-black">{quantity}</span>
            <button 
              onClick={() => setQuantity(quantity + 1)}
              className="w-10 h-10 flex items-center justify-center rounded-xl bg-white shadow-sm active:scale-90 transition-transform"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          <button 
            onClick={() => {
              for(let i=0; i<quantity; i++) onAddToCart(product);
              onClose();
            }}
            className="flex-1 bg-brand-yellow hover:bg-brand-orange text-brand-dark h-12 rounded-2xl font-black flex items-center justify-center gap-2 active:scale-95 transition-transform uppercase text-xs tracking-widest"
          >
            Aggiungi €{(product.price * quantity).toFixed(2)}
          </button>
        </div>
      </motion.div>

      {/* Fullscreen Lightbox */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-[100] flex flex-col items-center justify-center p-4"
          >
            <div className="absolute top-6 right-6 flex gap-4">
              <button 
                onClick={() => setIsLightboxOpen(false)}
                className="p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-4xl aspect-square sm:aspect-video rounded-2xl overflow-hidden shadow-2xl"
            >
              <img 
                src={activeImage} 
                alt={product.name} 
                className="w-full h-full object-contain bg-black"
                referrerPolicy="no-referrer"
              />
            </motion.div>
            
            <div className="mt-8 flex gap-3 overflow-x-auto no-scrollbar max-w-full px-4">
              {[product.image, ...product.gallery].map((img, idx) => (
                <button 
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 border-2 transition-all ${activeImage === img ? "border-brand-yellow" : "border-white/20"}`}
                >
                  <img src={img} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const CartDrawer = ({ items, onClose, onUpdateQuantity, onRemove }: { 
  items: CartItem[]; 
  onClose: () => void;
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
  key?: string;
}) => {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
      />
      <motion.div 
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-white z-50 shadow-2xl flex flex-col"
      >
        <div className="p-6 flex items-center justify-between border-b border-gray-100">
          <h2 className="text-xl font-bold">Il tuo Carrello</h2>
          <button onClick={onClose} className="p-2 bg-gray-100 rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                <ShoppingCart className="w-10 h-10 text-gray-300" />
              </div>
              <p className="text-gray-500 font-medium">Il carrello è vuoto</p>
              <button onClick={onClose} className="mt-4 text-accent font-bold">Inizia lo shopping</button>
            </div>
          ) : (
            items.map((item, idx) => (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                key={item.id} 
                className="flex gap-4"
              >
                <div className="w-20 h-20 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-bold text-sm line-clamp-1">{item.name}</h4>
                    <p className="text-accent font-bold text-sm">€{item.price.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center bg-gray-100 rounded-lg p-0.5">
                      <button onClick={() => onUpdateQuantity(item.id, -1)} className="p-1 hover:bg-white rounded-md transition-colors"><Minus className="w-3 h-3" /></button>
                      <span className="w-8 text-center text-xs font-bold">{item.quantity}</span>
                      <button onClick={() => onUpdateQuantity(item.id, 1)} className="p-1 hover:bg-white rounded-md transition-colors"><Plus className="w-3 h-3" /></button>
                    </div>
                    <button onClick={() => onRemove(item.id)} className="text-xs text-red-500 font-medium">Rimuovi</button>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="p-6 bg-gray-50 border-t border-gray-100 space-y-4"
          >
            <div className="flex justify-between items-center">
              <span className="text-gray-500 font-medium">Totale</span>
              <span className="text-2xl font-bold">€{total.toFixed(2)}</span>
            </div>
            <button className="w-full bg-brand-yellow hover:bg-brand-orange text-brand-dark h-14 rounded-2xl font-bold text-lg active:scale-95 transition-transform">
              Procedi al Pagamento
            </button>
          </motion.div>
        )}
      </motion.div>
    </>
  );
};

const SideMenu = ({ isOpen, onClose, onSelectCategory }: { isOpen: boolean; onClose: () => void; onSelectCategory: (c: string) => void; key?: string }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-80 bg-brand-blue text-white z-[70] shadow-2xl flex flex-col p-6"
          >
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-brand-yellow rounded-lg flex items-center justify-center">
                  <span className="text-brand-dark font-black text-lg italic">B</span>
                </div>
                <h2 className="text-xl font-bold italic tracking-tighter">BESPOINT</h2>
              </div>
              <button onClick={onClose} className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-6 overflow-y-auto no-scrollbar flex-1">
              <div className="space-y-4">
                <h3 className="text-xs font-black text-brand-yellow uppercase tracking-widest">Account</h3>
                <button className="flex items-center gap-3 w-full p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
                  <User className="w-5 h-5 text-brand-yellow" />
                  <span className="font-bold">Il mio profilo</span>
                </button>
                <button className="flex items-center gap-3 w-full p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
                  <ShoppingCart className="w-5 h-5 text-brand-yellow" />
                  <span className="font-bold">I miei ordini</span>
                </button>
              </div>

              <div className="space-y-4">
                <h3 className="text-xs font-black text-brand-yellow uppercase tracking-widest">Categorie</h3>
                {CATEGORIES.map(cat => (
                  <button 
                    key={cat} 
                    onClick={() => {
                      onSelectCategory(cat);
                      onClose();
                    }}
                    className="flex items-center justify-between w-full p-3 hover:bg-white/5 rounded-xl transition-colors"
                  >
                    <span className="font-bold">{cat}</span>
                    <ChevronRight className="w-4 h-4 text-white/40" />
                  </button>
                ))}
              </div>

              <div className="space-y-4">
                <h3 className="text-xs font-black text-brand-yellow uppercase tracking-widest">Supporto</h3>
                <button className="flex items-center gap-3 w-full p-3 hover:bg-white/5 rounded-xl transition-colors">
                  <Phone className="w-5 h-5 text-white/40" />
                  <span className="font-bold">Contattaci</span>
                </button>
                <button className="flex items-center gap-3 w-full p-3 hover:bg-white/5 rounded-xl transition-colors">
                  <Mail className="w-5 h-5 text-white/40" />
                  <span className="font-bold">Email</span>
                </button>
              </div>
            </div>

            <div className="pt-6 border-t border-white/10">
              <button className="w-full bg-brand-yellow text-brand-dark py-4 rounded-2xl font-black uppercase text-xs tracking-widest shadow-xl active:scale-95 transition-all">
                Esci
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// --- Main App ---

const HERO_IMAGES = [
  "https://picsum.photos/seed/electronics-1/1200/600",
  "https://picsum.photos/seed/electronics-2/1200/600",
  "https://picsum.photos/seed/electronics-3/1200/600",
  "https://picsum.photos/seed/electronics-4/1200/600",
  "https://picsum.photos/seed/electronics-5/1200/600",
];

const PROMO_ITEMS = [
  { id: 1, title: "Nuovi Arrivi", subtitle: "Scopri la collezione", color: "bg-brand-blue", seed: "gadgets" },
  { id: 2, title: "Best Seller", subtitle: "I più amati", color: "bg-brand-yellow", seed: "tech-best" },
  { id: 3, title: "Sconti Flash", subtitle: "Solo per oggi", color: "bg-red-500", seed: "flash" },
  { id: 4, title: "Illuminazione", subtitle: "Luce perfetta", color: "bg-green-600", seed: "light" },
  { id: 5, title: "Audio Pro", subtitle: "Suono puro", color: "bg-purple-600", seed: "audio" },
  { id: 6, title: "Smart Home", subtitle: "Casa connessa", color: "bg-orange-500", seed: "smart" },
  { id: 7, title: "Gaming", subtitle: "Livello pro", color: "bg-indigo-600", seed: "gaming" },
  { id: 8, title: "Accessori", subtitle: "Tutto il resto", color: "bg-gray-800", seed: "acc" },
];

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState("Tutti");
  const [selectedSubcategory, setSelectedSubcategory] = useState("Tutti");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [sortBy, setSortBy] = useState("newest");
  const [heroIndex, setHeroIndex] = useState(0);
  const [cartTrigger, setCartTrigger] = useState(0);
  const [isHeaderHidden, setIsHeaderHidden] = useState(false);
  const lastScrollY = useRef(0);

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsHeaderHidden(latest > 100);

    lastScrollY.current = latest;
  });
  useEffect(() => {
    const timer = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    setSelectedSubcategory("Tutti");
  }, [selectedCategory]);

  const filteredProducts = useMemo(() => {
    const filtered = PRODUCTS.filter(p => {
      const matchesCategory = selectedCategory === "Tutti" || p.category === selectedCategory;
      const matchesSubcategory = selectedSubcategory === "Tutti" || p.subcategory === selectedSubcategory;
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSubcategory && matchesSearch;
    });

    return [...filtered].sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "newest") return parseInt(b.id) - parseInt(a.id);
      return 0;
    });
  }, [selectedCategory, selectedSubcategory, searchQuery, sortBy]);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setCartTrigger(prev => prev + 1);
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  
  // Smooth scroll-driven animations
  const smoothScrollY = useSpring(scrollY, { stiffness: 100, damping: 30, restDelta: 0.001 });
  
  const heroOpacity = useTransform(smoothScrollY, [0, 150], [1, 0]);
  const heroY = useTransform(smoothScrollY, [0, 150], [0, -40]);

  // Header animations with springs for "weight"
  const headerTopHeightRaw = useTransform(smoothScrollY, [0, 100], [64, 0]);
  const headerTopHeight = useSpring(headerTopHeightRaw, { stiffness: 400, damping: 40 });
  
  const headerTopOpacityRaw = useTransform(smoothScrollY, [0, 80], [1, 0]);
  const headerTopOpacity = useSpring(headerTopOpacityRaw, { stiffness: 400, damping: 40 });
  
  const headerTopScaleRaw = useTransform(smoothScrollY, [0, 100], [1, 0.98]);
  const headerTopScale = useSpring(headerTopScaleRaw, { stiffness: 400, damping: 40 });

  const headerShadowOpacity = useTransform(smoothScrollY, [0, 100], [0, 0.2]);
  const headerBgColor = useTransform(smoothScrollY, [0, 100], ["rgba(1, 31, 75, 1)", "rgba(1, 31, 75, 0.95)"]);
  
  const parallaxY = useTransform(smoothScrollY, [500, 1500], [0, -100]);

  return (
    <div className="min-h-screen pb-24 bg-gray-100">
      {/* Top Bar (Amazon Style) */}
      <div className="bg-brand-dark text-white px-4 py-2 flex items-center justify-between text-xs font-medium">
        <div className="flex items-center gap-2">
          <span>Consegna a Massimo - Roma 00100</span>
        </div>
        <div className="flex items-center gap-4">
          <span>Aiuto</span>
          <span>Resi e Ordini</span>
        </div>
      </div>

      {/* Header */}
      <motion.header 
        style={{ 
          backgroundColor: headerBgColor,
          boxShadow: useTransform(headerShadowOpacity, (v) => `0 10px 30px -10px rgba(0,0,0,${v})`)
        }}
        className="sticky top-0 z-40"
      >
        {/* Animated Top Section (Logo, Desktop Search, Actions) */}
        <motion.div 
          style={{ height: headerTopHeight, opacity: headerTopOpacity, scale: headerTopScale }}
          className="px-4 flex items-center justify-between gap-4 overflow-hidden origin-top"
        >
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-brand-yellow rounded-lg flex items-center justify-center">
              <span className="text-brand-dark font-black text-lg">B</span>
            </div>
            <h1 className="text-xl font-bold tracking-tight text-white">Bespoint</h1>
          </div>
          
          <div className="flex-1 relative hidden md:block">
            <input 
              type="text" 
              placeholder="Cerca su Bespoint..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 bg-white rounded-md pl-4 pr-10 text-base md:text-sm focus:outline-none focus:ring-2 focus:ring-brand-yellow"
            />
            <button className="absolute right-0 top-0 h-full px-3 bg-brand-yellow rounded-r-md">
              <Search className="w-5 h-5 text-brand-dark" />
            </button>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <button className="flex flex-col items-center text-white">
              <User className="w-5 h-5" />
              <span className="text-[10px] font-bold uppercase">Accedi</span>
            </button>
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center text-white gap-1"
            >
              <motion.div 
                key={cartTrigger}
                animate={cartTrigger > 0 ? { scale: [1, 1.25, 1], rotate: [0, -10, 10, 0] } : {}}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="relative"
              >
                <ShoppingCart className="w-7 h-7" />
                {cartCount > 0 && (
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 bg-brand-yellow text-brand-dark text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-brand-blue"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </motion.div>
              <span className="text-sm font-bold hidden sm:inline">Carrello</span>
            </button>
            <button 
              onClick={() => setIsSideMenuOpen(true)}
              className="text-white hover:text-brand-yellow transition-colors"
            >
              <Menu className="w-8 h-8" />
            </button>
          </div>
        </motion.div>

        {/* Secondary Nav / Categories (NOW ABOVE SEARCH) */}
        <div className="bg-brand-blue border-t border-white/10 px-4 py-2 flex items-center text-xs font-bold text-white/90 overflow-hidden">
          {selectedCategory !== "Tutti" && (
            <div className="flex-shrink-0 bg-brand-blue pr-4 z-20 shadow-[10px_0_15px_-5px_rgba(0,0,0,0.3)] relative">
              <button 
                onClick={() => setSelectedCategory("Tutti")}
                className="text-brand-yellow uppercase tracking-widest flex items-center gap-1"
              >
                <ArrowLeft className="w-3 h-3" />
                {selectedCategory}
              </button>
            </div>
          )}
          
          <div className="flex overflow-x-auto no-scrollbar gap-4 items-center flex-1 scroll-smooth">
            {(selectedCategory === "Tutti" ? CATEGORIES : ["Tutti", ...(SUBCATEGORIES[selectedCategory] || [])]).map((cat, idx) => (
              <motion.button
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                key={`${selectedCategory}-${cat}-${idx}`}
                onClick={() => selectedCategory === "Tutti" ? setSelectedCategory(cat) : setSelectedSubcategory(cat)}
                className={`whitespace-nowrap pb-1 border-b-2 transition-all ${
                  (selectedCategory === "Tutti" ? selectedCategory === cat : selectedSubcategory === cat)
                    ? "border-brand-yellow text-white" 
                    : "border-transparent hover:text-white"
                }`}
              >
                {cat}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Mobile Search Bar (NOW BELOW CATEGORIES) */}
        <div className="px-4 py-2 md:hidden border-t border-white/5">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Cerca su Bespoint..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-11 bg-white rounded-lg pl-4 pr-12 text-base shadow-inner focus:outline-none"
            />
            <button className="absolute right-0 top-0 h-full px-4 bg-brand-yellow rounded-r-lg">
              <Search className="w-5 h-5 text-brand-dark" />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Hero Banner (Amazon Style) */}
      {selectedCategory === "Tutti" ? (
        <motion.section 
          initial={{ height: 0 }}
          animate={{ height: "auto" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          style={{ opacity: heroOpacity, y: heroY }}
          className="relative w-full overflow-hidden mb-8 origin-top"
        >
          <div className="h-64 sm:h-80 w-full relative">
            <div className="absolute inset-0 bg-gradient-to-b from-brand-blue/40 to-transparent z-10" />
            <AnimatePresence mode="wait">
              <motion.img 
                key={heroIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
                src={HERO_IMAGES[heroIndex]} 
                alt="Hero Context" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </AnimatePresence>
            <div className="absolute inset-0 flex flex-col items-center justify-end pb-12 px-6 z-20">
              <h2 className="text-3xl font-black text-white mb-2 uppercase tracking-tighter drop-shadow-lg">Offerte del Giorno</h2>
              <p className="text-sm text-white/90 mb-4 font-bold drop-shadow-md">Risparmia fino al 40% su tutta la tecnologia Bespoint.</p>
            </div>
          </div>
        </motion.section>
      ) : (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative w-full h-48 sm:h-64 overflow-hidden mb-8"
        >
          <img 
            src={`https://picsum.photos/seed/${selectedCategory.toLowerCase()}/1200/600`} 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/90 via-brand-dark/40 to-transparent flex flex-col justify-center px-6 sm:px-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-4xl sm:text-5xl font-black text-white uppercase tracking-tighter mb-2">
                {selectedCategory}
              </h2>
              <div className="w-16 h-1 bg-brand-yellow mb-4" />
              <p className="text-white/80 font-bold text-sm max-w-md">
                Esplora la nostra selezione premium di prodotti per {selectedCategory.toLowerCase()}. Qualità garantita Bespoint.
              </p>
            </motion.div>
          </div>
        </motion.section>
      )}

      {/* Promo Horizontal Scroll */}
      {selectedCategory === "Tutti" && (
        <section className="px-4 mb-12">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-between mb-4"
          >
            <h2 className="text-lg font-bold text-brand-dark">Offerte del giorno</h2>
            <button className="text-xs font-bold text-blue-600">Vedi tutte</button>
          </motion.div>
          <div className="flex overflow-x-auto no-scrollbar gap-4 pb-4">
            {PROMO_ITEMS.map((item, idx) => (
              <motion.div 
                initial={{ opacity: 0, scale: 0.8, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 100, 
                  damping: 15, 
                  delay: idx * 0.1 
                }}
                key={item.id}
                className={`${item.color} rounded-2xl p-4 h-40 min-w-[160px] sm:min-w-[200px] flex flex-col justify-between overflow-hidden relative group cursor-pointer flex-shrink-0 shadow-lg`}
              >
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 + 0.2 }}
                  className="z-10"
                >
                  <h3 className={`${item.color === "bg-brand-yellow" ? "text-brand-dark" : "text-white"} font-bold text-sm mb-1`}>
                    {item.title}
                  </h3>
                  <p className={`${item.color === "bg-brand-yellow" ? "text-brand-blue" : "text-brand-yellow"} text-[10px] font-bold`}>
                    {item.subtitle}
                  </p>
                </motion.div>
                <motion.img 
                  initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
                  animate={{ opacity: 0.5, scale: 1, rotate: 0 }}
                  transition={{ delay: idx * 0.1 + 0.3, type: "spring" }}
                  src={`https://picsum.photos/seed/${item.seed}/300/300`} 
                  className="absolute right-[-20px] bottom-[-20px] w-24 h-24 object-cover rounded-full group-hover:scale-110 transition-transform" 
                  referrerPolicy="no-referrer"
                />
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* Product Grid Section */}
      <section className="px-4 relative z-10 mb-16">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6"
        >
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-brand-dark">Prodotti in vetrina</h2>
            <span className="text-xs text-gray-400 font-medium">({filteredProducts.length} risultati)</span>
          </div>
          
          <div className="flex items-center gap-3">
            <label htmlFor="sort" className="text-xs font-bold text-gray-500 uppercase tracking-widest">Ordina per:</label>
            <div className="relative">
              <select 
                id="sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2 pr-10 text-sm font-bold text-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-yellow shadow-sm cursor-pointer"
              >
                <option value="newest">Novità</option>
                <option value="price-asc">Prezzo: dal più basso</option>
                <option value="price-desc">Prezzo: dal più alto</option>
                <option value="rating">Valutazione</option>
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                <ChevronRight className="w-4 h-4 rotate-90" />
              </div>
            </div>
          </div>
        </motion.div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredProducts.length === 0 ? (
            <div className="col-span-full py-12 text-center bg-white rounded-xl shadow-sm">
              <p className="text-gray-400 font-medium">Nessun prodotto trovato</p>
            </div>
          ) : (
            filteredProducts.map((product, index) => (
              <div key={product.id}>
                <ProductCard 
                  product={product} 
                  onClick={() => setSelectedProduct(product)} 
                  onAddToCart={addToCart}
                  index={index}
                />
              </div>
            ))
          )}
        </div>
      </section>

      {/* Parallax Floating Banner */}
      {selectedCategory === "Tutti" && (
        <section className="px-4 mb-16 overflow-hidden">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative h-64 rounded-3xl overflow-hidden shadow-2xl border border-white/20"
          >
            <motion.div 
              style={{ y: parallaxY }}
              className="absolute inset-0 w-full h-[120%]"
            >
              <img 
                src="https://picsum.photos/seed/parallax-tech/1200/800" 
                alt="Parallax" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </motion.div>
            <div className="absolute inset-0 bg-brand-blue/40 backdrop-blur-[2px] flex flex-col items-center justify-center text-center p-8">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-3xl font-black text-white uppercase tracking-tighter mb-2 drop-shadow-lg"
              >
                Bespoint Experience
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="text-white/90 font-bold max-w-md drop-shadow-md mb-6"
              >
                La tecnologia che si adatta al tuo stile di vita. Scopri l'innovazione senza compromessi.
              </motion.p>
              <motion.button 
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="bg-white text-brand-blue px-8 py-3 rounded-full font-black uppercase text-sm tracking-widest hover:bg-brand-yellow hover:text-brand-dark transition-all transform hover:scale-105 shadow-xl"
              >
                Esplora il Brand
              </motion.button>
            </div>
          </motion.div>
        </section>
      )}

      {/* Footer */}
      <footer className="bg-brand-dark text-white pt-16 pb-32 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-brand-yellow rounded-xl flex items-center justify-center">
                <span className="text-brand-dark font-black text-xl italic">B</span>
              </div>
              <h1 className="text-2xl font-black italic tracking-tighter">BESPOINT</h1>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Il tuo punto di riferimento per la tecnologia e l'illuminazione di design. Qualità, innovazione e assistenza dedicata.
            </p>
            <div className="flex gap-4">
              <button className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-blue transition-colors">
                <Facebook className="w-5 h-5" />
              </button>
              <button className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-blue transition-colors">
                <Instagram className="w-5 h-5" />
              </button>
              <button className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-blue transition-colors">
                <Twitter className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-brand-yellow">Link Rapidi</h3>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li className="hover:text-white cursor-pointer transition-colors">Chi Siamo</li>
              <li className="hover:text-white cursor-pointer transition-colors">Prodotti</li>
              <li className="hover:text-white cursor-pointer transition-colors">Offerte</li>
              <li className="hover:text-white cursor-pointer transition-colors">Blog</li>
              <li className="hover:text-white cursor-pointer transition-colors">Lavora con noi</li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-brand-yellow">Supporto</h3>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li className="hover:text-white cursor-pointer transition-colors">Centro Assistenza</li>
              <li className="hover:text-white cursor-pointer transition-colors">Spedizioni</li>
              <li className="hover:text-white cursor-pointer transition-colors">Resi e Rimborsi</li>
              <li className="hover:text-white cursor-pointer transition-colors">Privacy Policy</li>
              <li className="hover:text-white cursor-pointer transition-colors">Termini e Condizioni</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-brand-yellow">Contatti</h3>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-brand-blue" />
                <span>Via della Tecnologia 123, Roma</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-brand-blue" />
                <span>+39 06 1234567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-brand-blue" />
                <span>info@bespoint.it</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 text-center text-gray-500 text-xs">
          <p>&copy; 2026 BESPOINT S.r.l. - Tutti i diritti riservati - P.IVA 12345678901</p>
        </div>
      </footer>

      {/* Modals & Sheets */}
      <AnimatePresence>
        {selectedProduct && (
          <ProductSheet 
            key="product-sheet"
            product={selectedProduct} 
            onClose={() => setSelectedProduct(null)} 
            onAddToCart={addToCart}
          />
        )}
        {isCartOpen && (
          <CartDrawer 
            key="cart-drawer"
            items={cart} 
            onClose={() => setIsCartOpen(false)} 
            onUpdateQuantity={updateQuantity}
            onRemove={removeFromCart}
          />
        )}
        <SideMenu 
          key="side-menu"
          isOpen={isSideMenuOpen} 
          onClose={() => setIsSideMenuOpen(false)} 
          onSelectCategory={setSelectedCategory}
        />
        <CartSplash 
          key="cart-splash"
          trigger={cartTrigger} 
          isMenuHidden={isHeaderHidden} 
          count={cartCount} 
        />
      </AnimatePresence>
    </div>
  );
}
