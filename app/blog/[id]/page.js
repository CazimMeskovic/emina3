"use client"; // 👈 Obavezno jer se oslanjamo na useParams, useEffect i framer-motion

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation'; // 👈 Next.js rutiranje
import { supabase } from '@/supabaseClient';
import { motion } from 'framer-motion';
import Image from 'next/image'; // 👈 Optimizacija slika

// Ikona za povratak nazad
import { IoChevronBackOutline } from "react-icons/io5";

export default function BlogDetails() {
  const { id } = useParams();
  const router = useRouter(); // 👈 Zamjena za useNavigate
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const fetchPost = async () => {
      try {
        const { data, error } = await supabase
          .from('blogs')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;
        if (!mounted) return;

        const resolved = { ...data };
        if (Array.isArray(data.image_urls)) {
          resolved.image_urls = data.image_urls.map((img) => img);
        }

        setPost(resolved);
      } catch (err) {
        console.error('Error loading blog post:', err);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    if (id) fetchPost();
    return () => { mounted = false; };
  }, [id]);

  if (loading) return <div className="min-h-screen bg-[#faf9f6] pt-32 text-center text-slate-500 font-light">Učitavanje priče...</div>;
  if (!post) return <div className="min-h-screen bg-[#faf9f6] pt-32 text-center text-slate-500">Objava nije pronađena.</div>;

  // Određivanje glavne slike
  const heroImage = post.image_urls && Array.isArray(post.image_urls) && post.image_urls.length > 0
    ? post.image_urls[0]
    : post.image_url || null;

  // Određivanje sporednih slika (galerija unutar bloga)
  const galleryImages = post.image_urls && Array.isArray(post.image_urls) && post.image_urls.length > 1
    ? post.image_urls.slice(1)
    : [];

  return (
    <section className="min-h-screen bg-[#faf9f6] pt-28 pb-20">
      <div className="container mx-auto px-6 lg:px-12">
        
        {/* Dugme za nazad */}
        <motion.button 
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => router.back()} // 👈 Next.js način za povratak nazad
          className="flex items-center text-slate-500 hover:text-slate-900 transition-colors mb-8 group"
        >
          <IoChevronBackOutline size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm tracking-wider uppercase ml-1">Nazad na blog</span>
        </motion.button>

        <article className="max-w-4xl mx-auto bg-white rounded-3xl shadow-sm border border-slate-100/50 overflow-hidden">
          
          {/* Hero Slika Članka preko Next.js Image */}
          {heroImage && (
            <div className="relative h-[400px] md:h-[500px] w-full overflow-hidden">
              <Image 
                className="object-cover" 
                src={heroImage} 
                alt={post.title} 
                fill 
                priority
              />
            </div>
          )}

          <div className="p-8 md:p-12">
            {/* Naslov i Meta podaci */}
            <header className="mb-10 text-center md:text-left">
              <span className="text-sm uppercase tracking-[0.25em] text-slate-400">Inspiracija & Stil</span>
              <h1 className="text-3xl md:text-4xl font-serif text-slate-900 mt-2 mb-4 leading-tight">
                {post.title}
              </h1>
              <div className="flex items-center justify-center md:justify-start space-x-4">
                <span className="h-[1px] w-12 bg-slate-200"></span>
                <span className="text-xs text-slate-400 tracking-wider">
                  {post.created_at ? new Date(post.created_at).toLocaleDateString('bs-BA') : ''}
                </span>
              </div>
            </header>

            {/* Sadržaj bloga */}
            <div className="prose prose-slate max-w-none mb-12">
              <div 
                className="text-slate-700 text-lg leading-relaxed font-light whitespace-pre-wrap first-letter:text-4xl first-letter:font-serif first-letter:text-slate-900 first-letter:mr-1"
                dangerouslySetInnerHTML={{ __html: post.text }} 
              />
            </div>

            {/* Sekundarna galerija (ako ima više slika) */}
            {galleryImages.length > 0 && (
              <div className="mt-12 pt-8 border-t border-slate-100">
                <h3 className="text-xl font-serif text-slate-900 mb-6">Galerija slika</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  {galleryImages.map((src, idx) => (
                    <motion.div
                      key={idx}
                      whileHover={{ scale: 1.03 }}
                      className="relative h-48 rounded-xl overflow-hidden cursor-pointer shadow-sm"
                    >
                      <Image 
                        className="object-cover" 
                        src={src} 
                        alt={`${post.title} gallery item ${idx + 2}`} 
                        fill 
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </article>
      </div>
    </section>
  );
}