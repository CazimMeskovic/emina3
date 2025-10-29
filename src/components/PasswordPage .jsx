import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./PasswordPage.css";
import { supabase } from '../supabaseClient';


const PasswordPage = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();  // Koristi useNavigate umjesto useHistory

  const correctPassword = 'eminahm83';

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Očisti prethodne greške

    if (password === correctPassword) {
      try {
        console.log('Pokušavam prijavu...'); // Debugging
        
        const { data, error } = await supabase.auth.signInWithPassword({
          email: 'admin@emina.com',
          password: 'eminahm83' // Koristi istu lozinku koju koristimo za provjeru
        });

        console.log('Rezultat prijave:', { data, error }); // Debugging

        if (error) {
          console.error('Detalji greške:', error);
          throw error;
        }
        
        console.log('Prijava uspješna, preusmjeravam...'); // Debugging
        navigate('/upload');
      } catch (error) {
        console.error('Detalji greške pri prijavi:', error);
        setError(`Greška pri prijavi: ${error.message}`);
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
 
