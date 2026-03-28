"use client"; // 👈 Obavezno za klijentske animacije i Type komponentu

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image"; // 👈 Next.js Image optimizacija
import homeLogo from "@/assets/home-main.png"; // Provjeri putanju u assets
import Home2 from "@/components/Home2";

import Type from "@/components/Type";

export default function Home() {
  return (
    <>
      <section className="relative overflow-hidden bg-[#faf9f6] min-h-screen flex items-center">
        {/* Pozadinski dekorativni element - meki sjaj */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
          <div className="absolute -top-[10%] -left-[5%] w-[40%] h-[40%] bg-pink-100 rounded-full blur-[120px] opacity-50" />
          <div className="absolute bottom-[10%] right-[0%] w-[30%] h-[50%] bg-blue-50 rounded-full blur-[100px] opacity-40" />
        </div>

        <div className="container mx-auto px-6 lg:px-12 py-20 md:py-32 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            
            {/* Tekstualni sadržaj */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="w-full md:w-3/5 text-center md:text-left"
            >
              <h4 className="text-sm uppercase tracking-[0.3em] text-gray-500 mb-4">
                Umjetnost igle i konca
              </h4>
              
              <h1 className="text-5xl md:text-7xl font-serif text-slate-900 leading-tight mb-6">
                Mina HM <br /> 
                <span className="italic text-slate-600">Dizajn po vašoj meri</span>
              </h1>

              <div className="h-[60px] text-2xl md:text-3xl font-light text-slate-700 italic">
                <Type />
              </div>

              <motion.div 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-10"
              >
                <a href="/kontakt" className="px-8 py-4 bg-slate-900 text-white rounded-full text-lg hover:bg-slate-800 transition-all shadow-xl">
                  Zakažite termin
                </a>
              </motion.div>
            </motion.div>

            {/* Hero Slika sa efektom */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-full md:w-2/5 flex justify-center relative h-[450px]"
            >
              {/* Dekorativni okvir iza slike */}
              <div className="absolute inset-0 border-[1px] border-slate-200 translate-x-4 translate-y-4 -z-10 rounded-2xl" />
              
              <div className="w-full h-full relative rounded-2xl overflow-hidden shadow-2xl bg-white">
                <Image
                  src={homeLogo}
                  alt="Mina HM Krojački radovi"
                  fill
                  className="object-cover transition-all duration-700 grayscale-[20%] hover:grayscale-0"
                  priority // 👈 Govori Next-u da odmah učita sliku jer je "iznad nabora" (LCP)
                />
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Nastavak stranice */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <Home2 />
      </motion.div>
    </>
  );
}