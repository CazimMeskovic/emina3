"use client"; // 👈 Obavezno jer koristimo stanja, useEffect i galeriju

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation"; // 👈 Umjesto useLocation
import { supabase } from '@/supabaseClient';
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image"; // 👈 Za brže učitavanje slika

// Ikone za navigaciju i zatvaranje
import { IoCloseOutline, IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";

export default function ProjectDetails() {
  const { id: postId } = useParams(); // 👈 Dohvata ID iz linka
  const [item, setItem] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imagesToShow, setImagesToShow] = useState([]);

  // 1. Fetchovanje podataka iz Supabase-a na osnovu ID-a
  useEffect(() => {
    if (!postId) return;
    let mounted = true;

    const fetchPost = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('posts')
          .select('*')
          .eq('id', postId)
          .single();

        if (error) {
          if (mounted) setError(error.message);
        } else {
          if (mounted) setItem(data);
        }
      } catch (err) {
        if (mounted) setError(err.message || 'Greška pri dohvaćanju posta');
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchPost();
    return () => { mounted = false; };
  }, [postId]);

  // 2. Normalizacija slika
  const rawImages = (() => {
    if (Array.isArray(item?.images) && item.images.length > 0) return item.images;
    if (Array.isArray(item?.image_urls) && item.image_urls.length > 0) return item.image_urls;
    if (typeof item?.image_urls === 'string' && item.image_urls.trim()) {
      try {
        const parsed = JSON.parse(item.image_urls);
        if (Array.isArray(parsed)) return parsed;
      } catch (e) {
        return item.image_urls.split(',').map(s => s.trim()).filter(Boolean);
      }
    }
    if (item?.image) return [item.image];
    if (item?.image_url) return [item.image_url];
    return [];
  })();

  const resolveImageUrl = async (img) => {
    if (!img) return null;
    if (typeof img === 'string' && (img.startsWith('data:') || img.startsWith('http://') || img.startsWith('https://'))) {
      return img;
    }
    let path = img;
    if (path.startsWith('project-images/')) path = path.replace(/^project-images\//, '');
    try {
      const { data } = await supabase.storage.from('project-images').getPublicUrl(path);
      if (data?.publicUrl) return data.publicUrl;
      const { data: signed, error: signedErr } = await supabase.storage.from('project-images').createSignedUrl(path, 60);
      if (signedErr) return null;
      return signed.signedUrl;
    } catch {
      return null;
    }
  };

  useEffect(() => {
    let mounted = true;
    const prepare = async () => {
      const resolved = [];
      for (const raw of rawImages) {
        const url = await resolveImageUrl(raw);
        if (url) resolved.push(url);
      }
      if (mounted) setImagesToShow(resolved);
    };
    prepare();
    return () => { mounted = false; };
  }, [item]);

  const openOverlay = (index) => setCurrentImageIndex(index);
  const closeOverlay = () => setCurrentImageIndex(null);

  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === 0 ? imagesToShow.length - 1 : prev - 1));
  };

  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === imagesToShow.length - 1 ? 0 : prev + 1));
  };

  if (loading) return <div className="min-h-screen bg-[#faf9f6] pt-32 text-center text-slate-500 font-light">Učitavanje kreacije...</div>;
  if (error) return <div className="min-h-screen bg-[#faf9f6] pt-32 text-center text-red-500">Greška: {error}</div>;
  if (!item) return <div className="min-h-screen bg-[#faf9f6] pt-32 text-center text-slate-500">Projekt nije pronađen.</div>;

  return (
    <>
      <section className="min-h-screen bg-[#faf9f6] pt-32 pb-20">
        <div className="container mx-auto px-6 lg:px-12">
          
          {/* Header sekcija - Luksuzna tipografija */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center mb-16"
          >
            <span className="text-sm uppercase tracking-[0.25em] text-slate-400">Pojedinosti o kreaciji</span>
            <h1 className="text-4xl md:text-5xl font-serif text-slate-900 mt-2 mb-6">
              {item.title || "Bez naslova"}
            </h1>
            <div className="h-1 w-20 bg-slate-900 mx-auto mb-6"></div>
            <p className="text-slate-600 text-lg leading-relaxed font-light whitespace-pre-wrap">
              {item.text || "Nema dostupnog opisa za ovu kreaciju."}
            </p>
          </motion.div>

          {/* Grid Slika (Galerija) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {imagesToShow.length > 0 ? (
              imagesToShow.map((img, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="relative group h-72 w-full rounded-2xl overflow-hidden shadow-sm cursor-pointer hover:shadow-2xl transition-all duration-500"
                  onClick={() => openOverlay(idx)}
                >
                  <Image
                    src={img || "/fallback-image.jpg"}
                    alt={item.title || "Kreacija"}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white border border-white px-4 py-2 rounded-full text-xs uppercase tracking-wider">
                      Uvećaj sliku
                    </span>
                  </div>
                </motion.div>
              ))
            ) : (
              <p className="col-span-full text-center text-slate-500 py-10">Nema slika za ovaj projekat.</p>
            )}
          </div>
        </div>
      </section>

      {/* Moderni Overlay Slider (Glassmorphism) */}
      <AnimatePresence>
        {currentImageIndex !== null && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-lg flex items-center justify-center"
            onClick={closeOverlay}
          >
            {/* Dugme za gašenje */}
            <button 
              onClick={closeOverlay} 
              className="absolute top-8 right-8 text-white/70 hover:text-white transition-colors"
            >
              <IoCloseOutline size={40} />
            </button>

            {/* Kontrole za prev/next */}
            {imagesToShow.length > 1 && (
              <>
                <button 
                  onClick={prevImage} 
                  className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-all active:scale-90"
                >
                  <IoChevronBackOutline size={24} />
                </button>
                <button 
                  onClick={nextImage} 
                  className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-all active:scale-90"
                >
                  <IoChevronForwardOutline size={24} />
                </button>
              </>
            )}

            <motion.div 
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-[90vw] h-[85vh] overflow-hidden rounded-2xl"
            >
              <Image
                src={imagesToShow[currentImageIndex]}
                alt={`Slika ${currentImageIndex + 1}`}
                fill
                className="object-contain rounded-2xl"
              />
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white/80 px-4 py-1.5 rounded-full text-xs tracking-widest uppercase">
                {currentImageIndex + 1} / {imagesToShow.length}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}