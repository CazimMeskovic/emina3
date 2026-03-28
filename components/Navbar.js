"use client"; // 👈 Obavezno zbog stanja za skrolovanje i mobilnog menija

import React, { useState, useEffect } from "react";
import Link from "next/link"; // 👈 Next.js navigacija
import Image from "next/image"; // 👈 Optimizacija logotipa
import logo from "@/assets/about.png"; // Pobrini se da je logo u src/assets/

export default function NavBar() {
  const [expand, setExpand] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const scrollHandler = () => {
      if (window.scrollY >= 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  }, []);

  // Ažurirani linkovi prema folderima u src/app/
  const navLinks = [
    { name: "Početna", path: "/" },
    { name: "O meni", path: "/about" },
    { name: "Kreacije", path: "/kreacije" }, // 👈 Promijenjeno u tvoju novu rutu
    { name: "Blog", path: "/blog" },
    { name: "Vodič za Mjerenje", path: "/vodic-za-mjerenje" },
    { name: "Kontakt", path: "/kontakt" },
    { name: "Objavi", path: "/objavi", special: true },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-white/80 backdrop-blur-md shadow-sm py-3" 
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-6 lg:px-12 flex items-center justify-between">
        
        {/* Logo / Brand */}
        <Link href="/" className="flex items-center" onClick={() => setExpand(false)}>
          <Image 
            src={logo} 
            className="h-10 w-auto object-contain" 
            alt="Mina HM Logo"
            priority // Brzo učitavanje u zaglavlju
          />
          <span className="ml-3 font-serif text-xl tracking-wider text-slate-900">MINA HM</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link, index) => (
            <Link
              key={index}
              href={link.path} // 👈 'href' umjesto 'to'
              className={`relative text-sm font-medium tracking-widest uppercase transition-colors duration-300 group ${
                link.special 
                  ? "bg-slate-900 text-white px-4 py-2 rounded-full hover:bg-slate-800" 
                  : "text-slate-700 hover:text-slate-900"
              }`}
            >
              {!link.special && (
                <>
                  {link.name}
                  <span className="absolute left-0 -bottom-1 w-0 h-[1.5px] bg-slate-900 transition-all duration-300 group-hover:w-full"></span>
                </>
              )}
              {link.special && link.name}
            </Link>
          ))}
        </div>

        {/* Mobile Hamburger Icon */}
        <button
          onClick={() => setExpand(!expand)}
          className="md:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1.5 focus:outline-none z-50"
          aria-label="Toggle Navigation"
        >
          <span className={`block w-6 h-0.5 bg-slate-900 transition-all duration-300 ${expand ? "rotate-45 translate-y-2" : ""}`}></span>
          <span className={`block w-6 h-0.5 bg-slate-900 transition-all duration-300 ${expand ? "opacity-0" : ""}`}></span>
          <span className={`block w-6 h-0.5 bg-slate-900 transition-all duration-300 ${expand ? "-rotate-45 -translate-y-2" : ""}`}></span>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-white z-40 flex flex-col items-center justify-center space-y-8 transition-all duration-500 md:hidden ${
          expand ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        {navLinks.map((link, index) => (
          <Link
            key={index}
            href={link.path}
            onClick={() => setExpand(false)}
            className="text-2xl font-serif tracking-wide text-slate-800 hover:text-slate-600 transition-colors"
          >
            {link.name}
          </Link>
        ))}
      </div>
    </nav>
  );
}