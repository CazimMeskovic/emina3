import React, { useState } from 'react';
import { useRouter } from 'next/navigation'
import "./PasswordPage.css";
import { supabase } from '../../lib/supabaseClient';

const PasswordPage = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const correctPassword = 'eminahm83';

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password === correctPassword) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: 'admin@emina.com',
          password: 'eminahm83'
        });

        if (error) {
          throw error;
        }

        router.push('/upload');
      } catch (err) {
        console.error('Login error:', err);
        setError(`Greška pri prijavi: ${err.message}`);
      }
    } else {
      setError('Pogrešna šifra');
    }
  };

  return (
    <div className="password-container">
      <div className="password-box">
        <h2>Unesite šifru</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Unesite šifru"
            className="password-input"
            required
          />
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="submit-button">Napravite</button>
        </form>
      </div>
    </div>
  );
};

export default PasswordPage;
