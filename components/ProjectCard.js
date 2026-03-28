import React from "react";
import Image from "next/image"; // 👈 Uvozimo Next.js Image za optimizaciju

export default function ProjectCard({ imgPath, title, onDemoClick }) {
  return (
    <div className="group relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col h-[450px] w-full max-w-sm border border-slate-100/50">
      
      {/* Kontejner za sliku sa zoom efektom */}
      <div className="relative h-[320px] w-full overflow-hidden bg-slate-100">
        <Image
          src={imgPath || "/fallback-image.jpg"}
          alt={title || "Kreacija ateljea Mina HM"}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // 👈 Pomaže pretraživaču da učita tačnu veličinu slike
        />
        
        {/* Blagi overlay na hover za bolji kontrast */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-500" />
      </div>

      {/* Sadržaj ispod slike */}
      <div className="p-6 flex flex-col justify-between flex-grow bg-white">
        <div>
          <span className="text-xs font-medium tracking-[0.2em] text-slate-400 uppercase">
            Kreacija
          </span>
          <h3 className="text-xl font-serif text-slate-900 mt-1 mb-2 line-clamp-1 group-hover:text-slate-700 transition-colors">
            {title}
          </h3>
        </div>

        {/* Akciono dugme */}
        <div className="mt-4">
          {onDemoClick && (
            <button
              onClick={onDemoClick}
              className="w-full py-3.5 bg-slate-900 text-white rounded-full text-sm font-medium tracking-wider uppercase shadow-lg shadow-slate-900/10 hover:bg-slate-800 active:scale-95 transition-all duration-300"
            >
              Pogledaj detaljno
            </button>
          )}
        </div>
      </div>
    </div>
  );
}