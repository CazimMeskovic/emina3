"use client";

import React from 'react';
import { FaTape, FaWhatsapp, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';

const MeasurementGuide = () => {
  const steps = [
    {
      title: "Obim Grudi",
      desc: "Mjerite preko najšireg dijela grudi, držeći metar vodoravno oko leđa.",
      icon: "1",
    },
    {
      title: "Obim Struka",
      desc: "Izmjerite najuži dio struka (obično iznad pupka). Nemojte previše stezati metar.",
      icon: "2",
    },
    {
      title: "Obim Kukova",
      desc: "Stanite spojenih nogu i izmjerite najširi dio kukova (preko zadnjice).",
      icon: "3",
    },
    {
      title: "Dužina Rukava",
      desc: "Mjerite od vrha ramena, preko blago savijenog lakta, sve do zapešća.",
      icon: "4",
    },
    {
      title: "Dužina Haljine",
      desc: "Od vrha ramena (pored vrata) ravno naniže do željene dužine (koljena ili pod).",
      icon: "5",
    }
  ];

  return (
    <div className="min-h-screen bg-[#faf9f6] pt-32 pb-20 px-6 font-sans">
      <div className="max-w-4xl mx-auto">
        
        {/* Hero sekcija */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif text-slate-900 mb-4">Vodič za Mjerenje</h1>
          <p className="text-slate-500 max-w-2xl mx-auto italic text-lg">
            "Precizne mjere su prvi korak do savršene haljine. Slijedite ovaj vodič kako bismo osigurali da svaki šav stoji baš onako kako treba."
          </p>
          <div className="w-24 h-1 bg-amber-800 mx-auto mt-6"></div>
        </div>

        {/* Glavni sadržaj */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
          
          {/* Lijeva strana: Ilustracija/Slika (Ovdje možeš staviti sliku modela) */}
          <div className="relative group">
            <div className="absolute -inset-4 bg-amber-100/50 rounded-full blur-3xl group-hover:bg-amber-200/50 transition-all"></div>
            <div className="relative bg-white p-4 rounded-[40px] shadow-2xl border border-slate-100 overflow-hidden">
               {/* Zamijeni 'src' sa pravom slikom modela ako je imaš */}
              <img 
                src="/kroj.jpg" 
                alt="Measurement Illustration"
                className="w-full rounded-[30px] object-cover h-[500px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent"></div>
              <div className="absolute bottom-8 left-8 text-white">
                <span className="bg-amber-800 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">Savršen kroj</span>
                <h3 className="text-xl font-serif mt-2 italic">Mjerenje po mjeri</h3>
              </div>
            </div>
          </div>

          {/* Desna strana: Koraci */}
          <div className="space-y-8">
            {steps.map((step, idx) => (
              <div key={idx} className="flex gap-6 group">
                <div className="flex-shrink-0 w-12 h-12 bg-white rounded-full shadow-sm border border-slate-100 flex items-center justify-center text-amber-800 font-serif text-xl group-hover:bg-slate-900 group-hover:text-white transition-all duration-300">
                  {step.icon}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1">{step.title}</h3>
                  <p className="text-slate-500 leading-relaxed text-sm">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Savjeti sekcija */}
        <div className="bg-white rounded-[40px] p-8 md:p-12 shadow-sm border border-slate-100 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-green-600 font-bold uppercase tracking-widest text-xs">
                <FaCheckCircle /> Šta raditi
              </div>
              <ul className="space-y-3 text-slate-600 text-sm">
                <li>• Zamolite nekoga da vas izmjeri (preciznije je).</li>
                <li>• Mjerite se u donjem rublju koje planirate nositi.</li>
                <li>• Držite metar ravno i čvrsto, ali ne da se urezuje.</li>
              </ul>
            </div>
            <div className="space-y-4 border-l border-slate-100 pl-0 md:pl-10">
              <div className="flex items-center gap-3 text-amber-600 font-bold uppercase tracking-widest text-xs">
                <FaExclamationTriangle /> Šta izbjegavati
              </div>
              <ul className="space-y-3 text-slate-600 text-sm">
                <li>• Nemojte uvlačiti stomak dok mjerite struk.</li>
                <li>• Nemojte dodavati "centimetar-dva" (to ćemo mi uračunati).</li>
                <li>• Nemojte mjeriti preko debele odjeće.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Poziv na akciju */}
        <div className="bg-slate-900 rounded-[40px] p-10 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-800/10 rounded-full -mr-16 -mt-16"></div>
          <h2 className="text-2xl font-serif mb-4">Imate gotove mjere?</h2>
          <p className="text-slate-400 mb-8 max-w-md mx-auto">Pošaljite nam vaše mjere direktno na WhatsApp i počećemo sa kreiranjem vaše haljine iz snova.</p>
          <a 
           href="https://wa.me/387603116299" 
            className="inline-flex items-center gap-3 bg-white text-sm sm:text-xl text-slate-900 px-8 py-4 rounded-2xl font-bold uppercase tracking-widest hover:bg-amber-50 transition-all active:scale-95"
          >
            <FaWhatsapp size={20} className="text-green-500  " /> Pošalji na WhatsApp
          </a>
        </div>

      </div>
    </div>
  );
};

export default MeasurementGuide;