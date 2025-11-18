/* import React, { useRef, useState } from "react";
import { Helmet } from "react-helmet";
import emailjs from "@emailjs/browser";
import "./Kontakt.css";

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
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
          alert("Hvala vam. Uspješno ste poslali poruku");
          setForm({ name: "", email: "", message: "" });
        },
        (error) => {
          setLoading(false);
          console.error(error);
          alert("Ahh, nešto nije uredu s serverom !");
        }
      );
  };

  return (
    <>
      <Helmet>
        <title>Kontakt | Mina HM</title>
        <meta name="description" content="Kontaktirajte krojačku web stranicu mina-hm.com. Pošaljite poruku, upit ili zahtjev za šivenje i krojenje." />
        <link rel="canonical" href="https://mina-hm.com/kontakt" />
        <meta property="og:title" content="Kontakt | Mina HM" />
        <meta property="og:description" content="Kontaktirajte krojačku web stranicu mina-hm.com. Pošaljite poruku, upit ili zahtjev za šivenje i krojenje." />
        <meta property="og:url" content="https://mina-hm.com/kontakt" />
        <meta property="og:type" content="website" />
      </Helmet>
      <div className="contact-container">
      <h3>Pošalji poruku</h3>
      <form ref={formRef} onSubmit={handleSubmit} className="contact-form">
        <label>
          Vaše ime
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Unesite vaše ime"
            required
          />
        </label>
        <label>
          Vaš email
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Unesite vaš email"
            required
          />
        </label>
        <label>
          Vaša poruka
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Unesite vašu poruku"
            rows="5"
            required
          />
        </label>
        <button type="submit" disabled={loading}>
          {loading ? "Šaljem..." : "Pošalji"}
        </button>
      </form>
    </div>
  );
};

export default Contact;
 */

import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import "./Kontakt.css";

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

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
          alert("✅ Poruka uspješno poslana!");
          setForm({ name: "", email: "", message: "" });
        },
        (error) => {
          setLoading(false);
          console.error(error);
          alert("❌ Došlo je do greške, pokušajte ponovo.");
        }
      );
  };

  return (
    <div className="kontakt-wrapper">
      {/* Lijeva strana – Forma */}
      <div className="kontakt-card kontakt-forma">
        <h3 className="kontakt-title">📩 Pošalji poruku</h3>
        <form ref={formRef} onSubmit={handleSubmit} className="kontakt-form">
          <label className="kontakt-label">
           
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Unesite vaše ime"
              required
              className="kontakt-input"
            />
          </label>
          <label className="kontakt-label">
            
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Unesite vaš email"
              required
              className="kontakt-input"
            />
          </label>
          <label className="kontakt-label">
            
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Unesite vašu poruku"
              rows="5"
              required
              className="kontakt-textarea"
            />
          </label>
          <button type="submit" disabled={loading} className="kontakt-btn">
            {loading ? "Šaljem..." : "Pošalji poruku"}
          </button>
        </form>
      </div>

      {/* Desna strana – Kontakt info */}
      <div className="kontakt-card kontakt-info">
        <h3 className="kontakt-title">📍 Kontaktirajte nas</h3>
        <p className="kontakt-text">
          <strong>Emina H-M</strong>
        </p>
       {/*  <p className="kontakt-text">🌆 Grad: Bihać</p> */}
        <p className="kontakt-text">📞 Telefon: <a href="tel:+387603116299">+387 60 311 62 99</a></p>
       {/*  <p className="kontakt-text">🌐 Web: <a href="https://webizrada.ba">webizrada.ba</a></p> */}
        <div className="kontakt-glow"></div>
      </div>
      {/* Floating quick contact (WhatsApp/phone) */}
      <a className="kontakt-fab" href="https://wa.me/387603116299" target="_blank" rel="noreferrer" title="Pošalji WhatsApp poruku">
        <svg className="fab-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22" fill="white">
          <path d="M20.52 3.48A11.93 11.93 0 0 0 12 0C5.373 0 0 5.373 0 12c0 2.118.553 4.149 1.602 5.95L0 24l6.318-1.646A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12 0-3.21-1.248-6.217-3.48-8.52zM12 21.6c-1.48 0-2.933-.36-4.22-1.05l-.3-.17-3.75.98.999-3.65-.19-.32A8.4 8.4 0 1 1 20.4 12 8.36 8.36 0 0 1 12 21.6z" />
          <path d="M17.25 14.07c-.25-.13-1.48-.73-1.71-.81-.23-.08-.4-.13-.57.13-.17.25-.67.81-.82.98-.15.17-.3.2-.56.07-.25-.13-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.28.37-.42.12-.14.16-.24.25-.4.09-.17.04-.32-.02-.45-.07-.12-.57-1.37-.78-1.87-.2-.48-.41-.42-.57-.43-.15-.01-.32-.01-.49-.01-.17 0-.45.06-.69.32-.24.26-.92.9-.92 2.2 0 1.3.94 2.55 1.07 2.73.13.17 1.84 2.91 4.45 3.96 2.61 1.05 2.61.7 3.08.66.47-.04 1.53-.62 1.75-1.22.22-.6.22-1.12.15-1.22-.07-.11-.25-.17-.52-.3z" />
        </svg>
      </a>
    </div>
  );
};

export default Contact;
