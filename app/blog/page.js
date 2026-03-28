"use client"; // 👈 Obavezno jer se oslanjamo na useEffect, useState i rutiranje

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // 👈 Next.js navigacija umjesto react-router-dom
import { supabase } from '@/supabaseClient';
import { motion } from 'framer-motion';
import Image from 'next/image';

// Ikona za strelicu
import { IoArrowForwardOutline } from "react-icons/io5";

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter(); // 👈 Next.js router

  useEffect(() => {
    let mounted = true;
    const fetchPosts = async () => {
      try {
        const { data, error } = await supabase
          .from('blogs')
          .select('*')
          .order('created_at', { ascending: false });
        if (error) throw error;
        if (mounted) setPosts(data || []);
      } catch (err) {
        console.error('Error fetching blog posts:', err);
        if (mounted) setPosts([]);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    fetchPosts();
    return () => { mounted = false; };
  }, []);

  const openDetails = (item) => {
    router.push(`/blog/${item.id}`); // 👈 Next.js push metoda
  };

  return (
    <section className="min-h-screen bg-[#faf9f6] pt-32 pb-20">
      <div className="container mx-auto px-6 lg:px-12">
        
        {/* Header sekcija */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mx-auto text-center mb-16"
        >
          <span className="text-sm uppercase tracking-[0.25em] text-slate-400">Modni žurnal</span>
          <h1 className="text-4xl md:text-5xl font-serif text-slate-900 mt-2 mb-4">
            Novosti & Savjeti
          </h1>
          <p className="text-slate-600 text-lg font-light">
            Zavirite iza kulisa mog malog ateljea, pratite trendove i pronađite inspiraciju za svoj stil.
          </p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center h-64 text-slate-500 font-light tracking-wide">
            Učitavanje objava...
          </div>
        ) : (
          <>
            {posts.length === 0 ? (
              <p className="text-center text-slate-500 py-10 tracking-wide font-light">
                Trenutno nema objavljenih članaka.
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {posts.map((p, index) => {
                  const imageUrl = p.image_urls && Array.isArray(p.image_urls) && p.image_urls[0] 
                    ? p.image_urls[0] 
                    : p.image_url || "/fallback-image.jpg"; // Osiguraj se da nema problema sa starim nazivom baze

                  const excerpt = (p.text || '').slice(0, 120);

                  return (
                    <motion.article
                      key={p.id}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: (index % 3) * 0.1 }}
                      className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col h-[480px] border border-slate-100/50 cursor-pointer"
                      onClick={() => openDetails(p)}
                    >
                      {/* Slika bloga sa Next.js Image */}
                      <div className="relative h-60 w-full overflow-hidden bg-slate-100">
                        <Image
                          src={imageUrl}
                          alt={p.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      </div>

                      {/* Sadržaj kartice */}
                      <div className="p-6 flex flex-col justify-between flex-grow">
                        <div>
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-xs font-medium tracking-wider text-slate-400 uppercase">
                              Novosti
                            </span>
                            <span className="text-xs text-slate-400">
                              {p.created_at ? new Date(p.created_at).toLocaleDateString('bs-BA') : ''}
                            </span>
                          </div>

                          <h2 className="text-xl font-serif text-slate-900 mb-3 line-clamp-2 group-hover:text-slate-700 transition-colors">
                            {p.title}
                          </h2>

                          <p className="text-sm text-slate-600 leading-relaxed font-light line-clamp-3">
                            {excerpt}{excerpt.length >= 120 ? '...' : ''}
                          </p>
                        </div>

                        {/* Čitaj više dugme */}
                        <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
                          <span className="text-sm font-medium tracking-wider uppercase text-slate-900 group-hover:underline">
                            Čitaj više
                          </span>
                          <div className="w-9 h-9 bg-slate-900 text-white rounded-full flex items-center justify-center group-hover:translate-x-1 transition-all duration-300">
                            <IoArrowForwardOutline size={18} />
                          </div>
                        </div>
                      </div>
                    </motion.article>
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}