"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/supabaseClient';

const PasswordPage = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  // Tvoja definisana šifra
  const correctPassword = 'eminahm83';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password === correctPassword) {
      try {
        // 1. Logujemo se na Supabase
        const { error: authError } = await supabase.auth.signInWithPassword({
          email: 'admin@emina.com',
          password: 'eminahm83'
        });

        if (authError) throw authError;
        
        // 2. ✅ KLJUČNI DIO: Postavljamo lokalni pristup u browser
        // Ovo omogućava stranici /upload da te odmah prepozna
        localStorage.setItem("admin_access", "true");
        
        // 3. Prebacujemo na admin panel
        router.push('/upload');
      } catch (error) {
        setError(`Greška pri prijavi: ${error.message}`);
      }
    } else {
      setError('Pogrešna šifra');
    }
  };

  return (
    <div className="min-h-screen mx-4 sm:mx-0 flex items-center justify-center bg-[#faf9f6] pt-20">
      <div className="bg-white p-10 rounded-3xl shadow-xl w-full max-w-md border border-slate-100">
        <h2 className="text-3xl font-serif text-slate-900 mb-6 text-center">Administracija</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Unesite šifru"
            className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900 transition-all text-slate-900"
            required
          />
          {error && <p className="text-red-500 text-sm ml-2">{error}</p>}
          <button 
            type="submit" 
            className="w-full py-4 bg-slate-900 text-white rounded-2xl font-medium uppercase tracking-widest hover:bg-slate-800 active:scale-95 transition-all"
          >
            Prijavi se
          </button>
        </form>
      </div>
    </div>
  );
};

export default PasswordPage;