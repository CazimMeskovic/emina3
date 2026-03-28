"use client"; // 👈 Obavezno zbog stanja animacija i tilt efekta

import React from "react";
import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";
import Image from "next/image"; // 👈 Optimizacija slike
import myImg from "@/assets/avatar.png"; // Provjeri da li je u src/assets/

// Koristimo ikone koje imaju smisla za krojačicu i lokalno tržište
import { AiFillInstagram, AiFillFacebook } from "react-icons/ai";
import { FaWhatsapp, FaViber } from "react-icons/fa";

export default function Home2() {
  const services = [
    { title: "Šivenje po mjeri", desc: "Propisni odjevni predmeti za žene i unikatni komadi odjeće." },
    { title: "Svečani program", desc: "Jedinstvene kreacije za posebne prilike i događaje." },
    { title: "Burkiniji & Plažni program", desc: "Prilagođeni kupaći kostimi za izolovane plaže i bazene." },
    { title: "Zajednički dizajn", desc: "Pretvorite vaše ideje u unikatnu stvarnost krojenu za vas." },
  ];

  return (
    <section className="bg-white py-20 md:py-32" id="about">
      <div className="container mx-auto px-6 lg:px-12">
        
        {/* Prvi red: O meni i slika */}
        <div className="flex flex-col md:flex-row items-center gap-16 mb-24">
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full md:w-7/12"
          >
            <span className="text-sm uppercase tracking-[0.2em] text-slate-400">Upoznajte Minu</span>
            <h2 className="text-4xl md:text-5xl font-serif text-slate-900 mt-2 mb-6">
              Dozvolite mi da se predstavim
            </h2>
            
            <p className="text-lg text-slate-600 leading-relaxed mb-6">
              Dobrodošli u moju mini kućnu krojačku radionicu. 
              <span className="text-slate-900 font-medium"> Inspirisano ljubavlju prema detaljima i finim materijalima 🧵🪡💜</span>
            </p>

            <p className="text-lg text-slate-600 leading-relaxed">
              Kreativno, sa stilom i pečatom svoje osobnosti, dizajniram za vas odjeću koja ne samo da pristaje vašem tijelu, već i vašem karakteru.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full md:w-5/12 flex justify-center"
          >
          {/*   <Tilt className="relative group cursor-pointer" tiltMaxAngleX={15} tiltMaxAngleY={15}>
              <div className="absolute inset-0 bg-slate-100 rounded-3xl translate-x-3 translate-y-3 -z-10 group-hover:translate-x-5 group-hover:translate-y-5 transition-all duration-300" />
              <div className="relative w-[350px] h-[350px] overflow-hidden rounded-3xl shadow-xl">
                <Image 
                  src={myImg} 
                  alt="Mina HM Avatar" 
                  fill
                  className="object-cover"
                />
              </div>
            </Tilt> */}
            <Tilt className="relative group cursor-pointer" tiltMaxAngleX={15} tiltMaxAngleY={15}>
  {/* Pozadinski dekorativni kvadrat */}
  <div className="absolute inset-0 bg-slate-100 rounded-3xl translate-x-3 translate-y-3 -z-10 group-hover:translate-x-5 group-hover:translate-y-5 transition-all duration-300" />
  
  {/* Kontejner za sliku */}
  <div className="relative w-[350px] h-[350px] flex items-center justify-center bg-white rounded-3xl shadow-xl overflow-hidden p-4">
    <Image 
      src={myImg} 
      alt="Mina HM Avatar" 
      fill
      className="object-contain p-6" // KLJUČNA PROMJENA: object-contain umjesto object-cover
      priority
    />
  </div>
</Tilt>
          </motion.div>
        </div>

        {/* Drugi red: Usluge u karticama (Zamjena za stare nabrajanja) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-slate-50 p-8 rounded-2xl hover:bg-slate-900 hover:text-white transition-all duration-300 group shadow-sm h-[200px] flex flex-col justify-between"
            >
              <div>
                <h3 className="text-xl font-serif mb-3 group-hover:text-white text-slate-900">
                  {service.title}
                </h3>
                <p className="text-slate-600 group-hover:text-slate-300 text-sm leading-relaxed">
                  {service.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Treći red: Društvene mreže (Bez Github-a i Twitter-a) */}
     {/*    <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h3 className="text-2xl font-serif text-slate-900 mb-2">Povežimo se</h3>
          <p className="text-slate-500 mb-8">Pošaljite poruku i kreirajmo nešto unikatno zajedno</p>

          <div className="flex justify-center gap-6">
            {[
              { icon: <AiFillInstagram size={24} />, url: "https://instagram.com/mina_hm", color: "hover:bg-pink-500" },
              { icon: <AiFillFacebook size={24} />, url: "https://facebook.com/mina_hm", color: "hover:bg-blue-600" },
              { icon: <FaWhatsapp size={24} />, url: "https://wa.me/vašbroj", color: "hover:bg-green-500" },
              { icon: <FaViber size={24} />, url: "https://viber.click/vašbroj", color: "hover:bg-purple-600" },
            ].map((social, idx) => (
              <motion.a
                key={idx}
                href={social.url}
                target="_blank"
                rel="noreferrer"
                whileHover={{ y: -5 }}
                className={`w-12 h-12 flex items-center justify-center bg-white border border-slate-200 text-slate-700 rounded-full shadow-md transition-all duration-300 ${social.color} hover:text-white hover:border-transparent`}
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
        </motion.div> */}

      </div>
    </section>
  );
}