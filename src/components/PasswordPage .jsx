import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Zamjena za useHistory
import "./PasswordPage.css"


const PasswordPage = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();  // Koristi useNavigate umjesto useHistory

  const correctPassword = 'emina1987';

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password === correctPassword) {
      // Ako je šifra ispravna, preusmjerava na stranicu za upload
      navigate('/upload');  // Koristi navigate umjesto history.push
    } else {
      // Ako je šifra pogrešna, postavi grešku
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
 
