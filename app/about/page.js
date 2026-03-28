"use client"; // 👈 Obavezno jer koristimo framer-motion animacije

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import AboutCard from "@/components/AboutCard"; // Obrati pažnju na veliko slovo C
import atelierImg from "@/assets/about.png"; // Provjeri da li je u src/assets/

export default function About() {
  return (
    <section className="min-h-screen bg-[#faf9f6] pt-32 pb-20 relative overflow-hidden">
      {/* Pozadinski nježni sjaj za modnu estetiku */}
      <div className="absolute top-20 left-0 w-[300px] h-[300px] bg-pink-100 rounded-full blur-[120px] opacity-40 z-0" />
      <div className="absolute bottom-20 right-0 w-[400px] h-[400px] bg-blue-100 rounded-full blur-[120px] opacity-30 z-0" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* LIJEVA STRANA: Tekstualna priča (AboutCard) */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-slate-100/50"
          >
            <span className="text-sm uppercase tracking-[0.25em] text-slate-400 mb-2 block">
              Moja priča
            </span>
            <h1 className="text-4xl md:text-5xl font-serif text-slate-900 mb-8">
              Ko sam ja?
            </h1>
            
            <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed font-light">
              <AboutCard />
            </div>
          </motion.div>

          {/* DESNA STRANA: Slika ateljea / Portret */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 flex justify-center relative h-[450px] md:h-[550px]"
          >
            {/* Ukrasni ram iza slike */}
            <div className="absolute inset-0 border-[1px] border-slate-200 translate-x-4 translate-y-4 rounded-3xl -z-10" />
            
      {/*       <div className="w-full h-full relative rounded-3xl overflow-hidden shadow-2xl bg-white">
              <Image 
                src={atelierImg} 
                alt="Mina HM Atelje" 
                fill
                className="object-cover transition-transform duration-700 hover:scale-105" 
                priority // Brže učitavanje glavne slike
              />
            </div> */}
            <div className="w-full h-full relative rounded-3xl overflow-hidden shadow-2xl bg-white flex items-center justify-center p-8">
  <Image 
    src={atelierImg} 
    alt="Mina HM Atelje" 
    fill
    className="object-contain transition-transform duration-700 hover:scale-110 p-4" 
    priority 
  />
</div>
          </motion.div>
        </div>

        {/* MODNI SEKCIONAL: Vrijednosti brenda */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {[
            { title: "Kvalitet", desc: "Samo najfiniji materijali i precizni šavovi." },
            { title: "Unikatnost", desc: "Svaka kreacija ima vaš lični pečat." },
            { title: "Strast", desc: "Ljubav prema šivenju utkana u svaki detalj." },
          ].map((item, idx) => (
            <div key={idx} className="bg-white p-8 rounded-2xl border border-slate-100/50 shadow-sm text-center group hover:bg-slate-900 transition-all duration-300">
              <h3 className="text-xl font-serif text-slate-900 mb-2 group-hover:text-white transition-colors">
                {item.title}
              </h3>
              <p className="text-sm text-slate-600 font-light group-hover:text-slate-300 transition-colors">
                {item.desc}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}