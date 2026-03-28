"use client"; // 👈 Obavezno na vrhu jer koristimo useState, useRef i useEffect

import React, { useRef, useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { motion, AnimatePresence } from "framer-motion";

// Moderne ikone
import { IoMailOutline, IoCallOutline, IoLocationOutline, IoLogoInstagram, IoLogoFacebook, IoLogoWhatsapp } from "react-icons/io5";

function Toast({ message, onClose }) {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [message, onClose]);

  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className={`fixed top-24 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-full text-white text-sm font-medium tracking-wide shadow-xl ${
            message.includes("greške") ? "bg-red-500" : "bg-emerald-500"
          }`}
        >
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function Contact() {
  const formRef = useRef();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .send(
        "service_fb6cole",
        "template_0c7uwfn",
        {
          from_name: form.name,
          to_name: "EminaHM",
          from_email: form.email,
          to_email: "eminahm3@gmail.com",
          message: form.message,
        },
        "7d_YURh6RshqTwNVO"
      )
      .then(
        () => {
          setLoading(false);
          setToast("✅ Poruka uspješno poslana!");
          setForm({ name: "", email: "", message: "" });
        },
        (error) => {
          setLoading(false);
          console.error(error);
          setToast("❌ Došlo je do greške, pokušajte ponovo.");
        }
      );
  };

  return (
    <>
      <section className="min-h-screen bg-[#faf9f6] pt-32 pb-20 relative overflow-hidden">
        <Toast message={toast} onClose={() => setToast("")} />

        {/* Nježna pozadinska svetla za luksuzniji ton */}
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-pink-100 rounded-full blur-[120px] opacity-40 z-0" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-100 rounded-full blur-[120px] opacity-30 z-0" />

        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          
          {/* Naslov sekcije */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <span className="text-sm uppercase tracking-[0.25em] text-slate-400">Povežimo se</span>
            <h1 className="text-4xl md:text-5xl font-serif text-slate-900 mt-2 mb-4">
              Kontaktirajte Atelje
            </h1>
            <p className="text-slate-600 text-lg font-light">
              Imate ideju za kreaciju ili želite popravku? Pošaljite poruku i kreirajmo nešto unikatno.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-6xl mx-auto">
            
            {/* LIJEVA STRANA - Forma */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-7 bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-slate-100/50 h-fit"
            >
              <h3 className="text-2xl font-serif text-slate-900 mb-8 flex items-center">
                <IoMailOutline className="mr-3 text-slate-500" size={26} /> Pošaljite upit
              </h3>

              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                
                {/* Ime input */}
                <div className="relative group">
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-4 bg-transparent border-b-2 border-slate-200 text-slate-900 focus:outline-none focus:border-slate-900 transition-colors peer placeholder-transparent"
                    placeholder="Ime i prezime"
                    autoComplete="off"
                  />
                  <label className="absolute left-4 top-4 text-slate-400 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-focus:top-0 peer-focus:text-xs peer-focus:text-slate-900 peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs">
                    Vaše ime i prezime
                  </label>
                </div>

                {/* Email input */}
                <div className="relative group">
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-4 bg-transparent border-b-2 border-slate-200 text-slate-900 focus:outline-none focus:border-slate-900 transition-colors peer placeholder-transparent"
                    placeholder="Email"
                    autoComplete="off"
                  />
                  <label className="absolute left-4 top-4 text-slate-400 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-focus:top-0 peer-focus:text-xs peer-focus:text-slate-900 peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs">
                    Email adresa
                  </label>
                </div>

                {/* Poruka textarea */}
                <div className="relative group">
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    className="w-full px-4 py-4 bg-transparent border-b-2 border-slate-200 text-slate-900 focus:outline-none focus:border-slate-900 transition-colors peer placeholder-transparent resize-none"
                    placeholder="Poruka"
                  />
                  <label className="absolute left-4 top-4 text-slate-400 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-focus:top-0 peer-focus:text-xs peer-focus:text-slate-900 peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs">
                    Vaša ideja ili upit...
                  </label>
                </div>

                <motion.button
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-slate-900 text-white rounded-full text-sm font-medium tracking-wider uppercase shadow-lg shadow-slate-900/10 hover:bg-slate-800 transition-all duration-300 disabled:bg-slate-400"
                >
                  {loading ? "Šaljem..." : "Pošalji poruku"}
                </motion.button>
              </form>
            </motion.div>

            {/* DESNA STRANA - Info */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-5 flex flex-col justify-between h-full"
            >
              <div className="bg-slate-900 text-white p-8 md:p-12 rounded-3xl shadow-xl h-full flex flex-col justify-between relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                  <svg width="100%" height="100%">
                    <line x1="0" y1="100%" x2="100%" y2="0" stroke="white" strokeWidth="1" />
                    <line x1="30%" y1="100%" x2="100%" y2="30%" stroke="white" strokeWidth="1" />
                  </svg>
                </div>

                <div className="relative z-10">
                  <h3 className="text-2xl font-serif mb-8 flex items-center">
                    <IoLocationOutline className="mr-3" size={26} /> Atelje Podaci
                  </h3>

                  <div className="space-y-8">
                    <div>
                      <p className="text-xs tracking-widest uppercase text-slate-400 mb-1">Dizajnerica</p>
                      <p className="text-xl font-light">Emina H-M</p>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                        <IoCallOutline size={20} />
                      </div>
                      <div>
                        <p className="text-xs tracking-widest uppercase text-slate-400 mb-1">Telefon</p>
                        <a href="tel:+387603116299" className="text-lg hover:text-slate-300 transition-colors">+387 60 311 62 99</a>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                        <IoMailOutline size={20} />
                      </div>
                      <div>
                        <p className="text-xs tracking-widest uppercase text-slate-400 mb-1">Email adresa</p>
                        <a href="mailto:eminahm3@gmail.com" className="text-lg hover:text-slate-300 transition-colors">eminahm3@gmail.com</a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="relative z-10 mt-12 pt-8 border-t border-white/10">
                  <p className="text-xs tracking-widest uppercase text-slate-400 mb-4">Društvene mreže</p>
                  <div className="flex space-x-4">
                    <a href="https://instagram.com/eminahm3" target="_blank" rel="noreferrer" className="w-11 h-11 bg-white/10 hover:bg-white text-white hover:text-slate-900 rounded-full flex items-center justify-center transition-all duration-300">
                      <IoLogoInstagram size={20} />
                    </a>
                    <a href="https://facebook.com/eminahm3" target="_blank" rel="noreferrer" className="w-11 h-11 bg-white/10 hover:bg-white text-white hover:text-slate-900 rounded-full flex items-center justify-center transition-all duration-300">
                      <IoLogoFacebook size={20} />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>

        {/* Plutajući WhatsApp button */}
        <motion.a 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          href="https://wa.me/387603116299" 
          target="_blank" 
          rel="noreferrer" 
          className="fixed bottom-8 right-8 z-50 w-14 h-14 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 cursor-pointer"
        >
          <IoLogoWhatsapp size={28} />
        </motion.a>
      </section>
    </>
  );
}