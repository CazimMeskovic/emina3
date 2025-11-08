/* import React, { useRef, useState } from "react";
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
    </div>
  );
};

export default Contact;
