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
        "service_x6k12af",
        "template_l3mmy24",
        {
          from_name: form.name,
          to_name: "EminaHM",
          from_email: form.email,
          to_email: "eminahm3@gmail.com",
          message: form.message,
        },
        "cjQxd5nH8DzJeB5xN"
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

/* 
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
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    console.log("Submitting form with data:", form);

    emailjs
      .sendForm(
        "service_x6k12af",
        "template_7e6hpg5", // Template ID
        formRef.current, // Form reference
        "cjQxd5nH8DzJeB5xN" // Public Key
      )
      .then(
        (response) => {
          console.log("Email sent successfully:", response);
          setLoading(false);
          alert("Thank you. I will get back to you as soon as possible.");
          setForm({ name: "", email: "", message: "" });
        },
        (error) => {
          console.error("EmailJS Error:", error);
          setLoading(false);
          alert("Ahh, something went wrong. Please try again.");
        }
      );
  };

  return (
    <div className="contact-container">
      <h3>Contact</h3>
      <form ref={formRef} onSubmit={handleSubmit} className="contact-form">
        <label>
          Your Name
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your name"
            required
          />
        </label>
        <label>
          Your Email
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Your email"
            required
          />
        </label>
        <label>
          Your Message
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Your message"
            rows="5"
            required
          />
        </label>
        <button type="submit" disabled={loading}>
          {loading ? "Sending..." : "Send"}
        </button>
      </form>
    </div>
  );
};

export default Contact;
 */