"use client"; // 👈 Obavezno zbog stanja paginacije i framer-motion-a

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ProjectCard from "@/components/ProjectCard";
import { supabase } from "@/supabaseClient";
import { motion } from "framer-motion";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 6;
  const router = useRouter();

  // 1. Učitavanje kreacija direktno iz Supabase tabele 'posts'
  useEffect(() => {
    let mounted = true;
    const fetchProjects = async () => {
      try {
        const { data, error } = await supabase
          .from("posts")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) throw error;
        if (mounted) setProjects(data || []);
      } catch (err) {
        console.error("Greška pri učitavanju projekata:", err);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchProjects();
    return () => { mounted = false; };
  }, []);

  const handleDemoClick = (item) => {
    // Next.js navigacija na dinamičku rutu koju smo ranije napravili
    router.push(`/kreacije/${item.id}`);
  };

  // Logika za paginaciju
  const totalProjects = projects.length;
  const totalPages = Math.ceil(totalProjects / projectsPerPage);
  const startIndex = (currentPage - 1) * projectsPerPage;
  const currentProjects = projects.slice(startIndex, startIndex + projectsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="min-h-screen bg-[#faf9f6] pt-28 pb-20">
      <div className="container mx-auto px-6 lg:px-12">
        
        {/* Header Sekcija */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-sm uppercase tracking-[0.25em] text-slate-400">Atelje Portfolio</span>
          <h1 className="text-4xl md:text-5xl font-serif text-slate-900 mt-2 mb-4">
            Moja Kolekcija Radova
          </h1>
          <p className="text-slate-600 text-lg font-light">
            Pregledajte kreacije rađene s ljubavlju. Svaki komad je priča za sebe, skrojen po mjeri vaših snova.
          </p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center h-64 text-slate-500 font-light tracking-wide">
            Učitavanje kolekcije...
          </div>
        ) : currentProjects.length === 0 ? (
          <div className="text-center text-slate-500 py-10 tracking-wide font-light">
            Trenutno nema dostupnih projekata u kolekciji.
          </div>
        ) : (
          <>
            {/* Grid sa projektima */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {currentProjects.map((item, index) => (
                <motion.div
                  key={item.id || `${item.title}-${index}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: (index % 3) * 0.1 }}
                  className="flex justify-center"
                >
                  <div className="w-full max-w-sm">
                    <ProjectCard
                      imgPath={item.image_url || "/fallback-image.jpg"}
                      title={item.title || "Bezimeni Projekat"}
                      onDemoClick={() => handleDemoClick(item)} // 👈 Poziva se naša Next.js navigacija
                    />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Luksuzna Paginacija */}
            {totalPages > 1 && (
              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="flex justify-center items-center space-x-3 mt-20 mb-10"
              >
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`h-12 w-12 rounded-full flex items-center justify-center text-sm font-medium tracking-wider transition-all duration-300 ${
                      page === currentPage
                        ? "bg-slate-900 text-white shadow-lg scale-110"
                        : "bg-white text-slate-700 border border-slate-200 hover:border-slate-900 hover:bg-slate-50"
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </motion.div>
            )}
          </>
        )}
      </div>
    </section>
  );
}