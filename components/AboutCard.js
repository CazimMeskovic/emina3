import React from "react";

export default function AboutCard() {
  return (
    <div className="text-slate-700 font-light leading-relaxed tracking-wide text-lg">
      
      {/* Prvi pasus - Početak priče sa drop-cap efektom */}
      <p className="mb-6 first-letter:text-4xl first-letter:font-serif first-letter:text-slate-900 first-letter:mr-1 first-letter:float-left">
        Šivenjem se bavim već dugi niz godina. U početku je to bilo samo za mene 
        i moje najmilije, iz čiste ljubavi prema raskošnoj tkanini i slobodi ispoljavanja 
        vlastite vizije i kreiranja željenih detalja.
      </p>

      {/* Drugi pasus - Razvoj biznisa i filozofija (Istaknuto tamnijim slovima) */}
      <p className="mb-6 font-normal text-slate-800 border-l-2 border-slate-900 pl-4 italic">
        Vremenom je ta strast prerasla u nešto veće, pa sam počela šiti i za druge. 
        Vjerujem da odjeća treba da odražava ličnost i stil svakog pojedinca.
      </p>

      {/* Treći pasus - Misija */}
      <p className="mb-6">
        Zato mi je cilj da kroz svoj rad omogućim svima da dobiju upravo ono što žele, 
        pridržavajući se jasnih granica onoga što je dozvoljeno i estetski ugodno.
      </p>

      {/* Četvrti pasus - Poziv na saradnju */}
      <div className="mt-8 p-6 bg-slate-50 rounded-2xl border border-slate-100/50">
        <p className="font-medium text-slate-900">
          Vjerujem da ćemo, ako težite istom cilju, naći dosta zajedničkih ideja 
          da ostvarimo i vaše vizije. Radujem se našoj saradnji!
        </p>
      </div>

    </div>
  );
}