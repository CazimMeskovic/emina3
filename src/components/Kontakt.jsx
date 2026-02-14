import React, { useRef, useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import "./Kontakt.css";

import { Helmet } from "react-helmet";

const icons = {
  email: (
    <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
      <path fill="#00eaff" d="M2 6.5A2.5 2.5 0 0 1 4.5 4h15A2.5 2.5 0 0 1 22 6.5v11A2.5 2.5 0 0 1 19.5 20h-15A2.5 2.5 0 0 1 2 17.5v-11Zm2.5-.5a.5.5 0 0 0-.5.5v.379l8 5.334 8-5.334V6.5a.5.5 0 0 0-.5-.5h-15Zm16 2.236-7.62 5.082a1 1 0 0 1-1.16 0L4.5 8.236V17.5a.5.5 0 0 0 .5.5h15a.5.5 0 0 0 .5-.5V8.236Z"/>
    </svg>
  ),
  phone: (
    <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
      <path fill="#00eaff" d="M6.62 10.79a15.053 15.053 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.07 21 3 13.93 3 5a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.46.57 3.58a1 1 0 0 1-.24 1.01l-2.2 2.2Z"/>
    </svg>
  ),
  location: (
    <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
      <path fill="#00eaff" d="M12 2C7.03 2 3 6.03 3 11c0 5.25 7.11 10.74 8.13 11.5a1 1 0 0 0 1.13 0C13.89 21.74 21 16.25 21 11c0-4.97-4.03-9-9-9Zm0 17.88C10.13 18.13 5 14.06 5 11a7 7 0 1 1 14 0c0 3.06-5.13 7.13-7 8.88ZM12 7a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm0 6a2 2 0 1 1 0-4 2 2 0 0 1 0 4Z"/>
    </svg>
  ),
  instagram: (
    <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
      <path fill="#00eaff" d="M7 2C4.24 2 2 4.24 2 7v10c0 2.76 2.24 5 5 5h10c2.76 0 5-2.24 5-5V7c0-2.76-2.24-5-5-5H7Zm10 2c1.65 0 3 1.35 3 3v10c0 1.65-1.35 3-3 3H7c-1.65 0-3-1.35-3-3V7c0-1.65 1.35-3 3-3h10Zm-5 3a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm0 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm6.5-.5a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z"/>
    </svg>
  ),
  facebook: (
    <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
      <path fill="#00eaff" d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 5 3.66 9.13 8.44 9.88v-6.99h-2.54v-2.89h2.54V9.41c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.23.2 2.23.2v2.45h-1.26c-1.24 0-1.63.77-1.63 1.56v1.87h2.78l-.44 2.89h-2.34v6.99C18.34 21.13 22 17 22 12Z"/>
    </svg>
  ),
};

function Toast({ message, onClose }) {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [message, onClose]);

  if (!message) return null;
  return <div className="kontakt-toast">{message}</div>;
}

const Contact = () => {
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
      <Helmet>
        <title>Kontakt | Mina HM</title>
        <meta name="description" content="Kontaktirajte inovativnu krojačku radnju Mina HM. Pošaljite upit, saznajte više o uslugama, lokaciji i načinu rada." />
        <link rel="canonical" href="https://mina-hm.com/kontakt" />
        <meta property="og:title" content="Kontakt | Mina HM" />
        <meta property="og:description" content="Kontaktirajte inovativnu krojačku radnju Mina HM. Pošaljite upit, saznajte više o uslugama, lokaciji i načinu rada." />
        <meta property="og:url" content="https://mina-hm.com/kontakt" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Kontakt | Mina HM" />
        <meta name="twitter:description" content="Kontaktirajte inovativnu krojačku radnju Mina HM. Pošaljite upit, saznajte više o uslugama, lokaciji i načinu rada." />
      </Helmet>
      <div className="kontakt-wrapper">
      <Toast message={toast} onClose={() => setToast("")} />
      
      {/* Lijeva strana – Forma */}
      <div className="kontakt-card kontakt-forma">
        <h3 className="kontakt-title">{icons.email} Pošalji poruku</h3>
        <form ref={formRef} onSubmit={handleSubmit} className="kontakt-form">
          <div className="kontakt-float-label">
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className={"kontakt-input" + (form.name ? " filled" : "")}
              autoComplete="off"
            />
            <label className={form.name ? "floating" : ""}>Ime i prezime</label>
          </div>
          <div className="kontakt-float-label">
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className={"kontakt-input" + (form.email ? " filled" : "")}
              autoComplete="off"
            />
            <label className={form.email ? "floating" : ""}>Email adresa</label>
          </div>
          <div className="kontakt-float-label">
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              required
              className={"kontakt-textarea" + (form.message ? " filled" : "")}
              rows="5"
            />
            <label className={form.message ? "floating" : ""}>Poruka</label>
          </div>
          <button type="submit" disabled={loading} className="kontakt-btn">
            {loading ? "Šaljem..." : "Pošalji poruku"}
          </button>
        </form>
      </div>

      {/* Desna strana – Kontakt info */}
      <div className="kontakt-card kontakt-info">
        <h3 className="kontakt-title">{icons.location} Kontaktirajte nas</h3>
        <p className="kontakt-text"><strong>Emina H-M</strong></p>
        <p className="kontakt-text">{icons.phone} Telefon: <a href="tel:+387603116299">+387 60 311 62 99</a></p>
        <p className="kontakt-text">{icons.email} Email: <a href="mailto:eminahm3@gmail.com">eminahm3@gmail.com</a></p>
        <div className="kontakt-socials">
          <a href="https://instagram.com/eminahm3" target="_blank" rel="noreferrer" title="Instagram">{icons.instagram}</a>
          <a href="https://facebook.com/eminahm3" target="_blank" rel="noreferrer" title="Facebook">{icons.facebook}</a>
        </div>
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
    </>
  );
};

export default Contact;
