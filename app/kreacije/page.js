"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ProjectCard from "@/components/ProjectCard";
import { supabase } from "@/supabaseClient";
import { motion } from "framer-motion";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const projectsPerPage = 6;
  const router = useRouter();

  // 👉 ukupno stranica
  const totalPages = Math.ceil(totalCount / projectsPerPage);

  useEffect(() => {
    let mounted = true;

    const fetchProjects = async () => {
      try {
        const from = (currentPage - 1) * projectsPerPage;
        const to = from + projectsPerPage - 1;

        const { data, error, count } = await supabase
          .from("posts")
          .select("id, title, image_url, created_at", { count: "exact" })
          .order("created_at", { ascending: false })
          .range(from, to);

        if (error) throw error;

        if (mounted) {
          setTotalCount(count || 0);

          if (data) {
            const baseUrl =
              "https://lwcgfqhdtzbamoklrjlx.supabase.co/storage/v1/object/public/project-images/";

            const resolved = data.map((p) => {
              let img = p.image_url;
              let finalImg = "/fallback-image.jpg";

              if (img) {
                if (img.startsWith("http")) finalImg = img;
                else {
                  const cleanedPath = img.replace(/^project-images\//, "");
                  finalImg = `${baseUrl}${cleanedPath}`;
                }
              }

              return { ...p, resolvedImage: finalImg };
            });

            setProjects(resolved);
          }
        }
      } catch (err) {
        console.error("Greška pri učitavanju projekata:", err);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchProjects();
    return () => {
      mounted = false;
    };
  }, [currentPage]);

  const handleDemoClick = (item) => {
    router.push(`/kreacije/${item.id}`);
  };

  const handlePageChange = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // 👉 generiše brojeve stranica + ...
  const getPagination = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
      }
    }

    return pages;
  };

  return (
    <section className="min-h-screen bg-[#faf9f6] pt-28 pb-20">
      <div className="container mx-auto px-6 lg:px-12">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-sm uppercase tracking-[0.25em] text-slate-400">
            Atelje Portfolio
          </span>
          <h1 className="text-4xl md:text-5xl font-serif text-slate-900 mt-2 mb-4">
            Moja Kolekcija Radova
          </h1>
          <p className="text-slate-600 text-lg font-light">
            Pregledajte kreacije rađene s ljubavlju. Svaki komad je priča za sebe.
          </p>
        </motion.div>

        {/* LOADING */}
        {loading ? (
          <div className="flex justify-center items-center h-64 text-slate-500 font-light tracking-wide">
            Učitavanje kolekcije...
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center text-slate-500 py-10 tracking-wide font-light">
            Trenutno nema dostupnih projekata u kolekciji.
          </div>
        ) : (
          <>
            {/* GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {projects.map((item, index) => (
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
                      imgPath={item.resolvedImage}
                      title={item.title || "Bezimeni Projekat"}
                      onDemoClick={() => handleDemoClick(item)}
                      isFirstRow={index < 3}
                    />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* ✨ PREMIUM PAGINATION */}
            <div className="flex justify-center items-center mt-24">
              <div className="flex items-center gap-2">

                 <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`px-5 py-3 font-bold rounded-full text-sm tracking-wider transition-all duration-300 border
                  ${currentPage === 1
                    ? "opacity-40 cursor-not-allowed border-slate-200"
                    : "border-slate-300 hover:border-slate-900 hover:bg-white hover:shadow-md"
                  }`}
                >
                  ← 
                </button> 

                {getPagination().map((page, i) =>
                  page === "..." ? (
                    <span key={i} className="px-3 text-slate-400">…</span>
                  ) : (
                    <motion.button
                      key={i}
                      onClick={() => handlePageChange(page)}
                      whileTap={{ scale: 0.9 }}
                      className={`w-12 h-12 rounded-full text-sm font-medium transition-all duration-300
                      ${currentPage === page
                        ? "bg-slate-900 text-white shadow-lg scale-110"
                        : "bg-white border border-slate-200 hover:border-slate-900 hover:bg-slate-50"
                      }`}
                    >
                      {page}
                    </motion.button>
                  )
                )}

                 <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`px-5 py-3 font-bold rounded-full text-sm tracking-wider transition-all duration-300 border
                  ${currentPage === totalPages
                    ? "opacity-40 cursor-not-allowed border-slate-200"
                    : "border-slate-300 hover:border-slate-900 hover:bg-white hover:shadow-md"
                  }`}
                >
                   →
                </button> 

              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}