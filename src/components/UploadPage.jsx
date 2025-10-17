import React, { useState, useEffect } from "react";
import "./UploadPage.css";
import { supabase } from '../supabaseClient';

const UploadPage = () => {
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [images, setImages] = useState([null, null, null, null, null]);
  const [previews, setPreviews] = useState([null, null, null, null, null]);
  const [buttonText, setButtonText] = useState("Objavi");

  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newImages = [...images];
        newImages[index] = reader.result;
        setImages(newImages);

        const newPreviews = [...previews];
        newPreviews[index] = URL.createObjectURL(file);
        setPreviews(newPreviews);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setButtonText("Šaljem...");

    try {
      const newEntry = {
        title,
        text,
        images: images.filter(Boolean),
        created_at: new Date().toISOString()
      };

      const { error } = await supabase
        .from('posts')
        .insert([newEntry]);

      if (error) throw error;

      setText("");
      setTitle("");
      setImages([null, null, null, null, null]);
      setPreviews([null, null, null, null, null]);
      setButtonText("Objavi");
      alert("Objava je uspješno spremljena!");
    } catch (error) {
      console.error("Error inserting data:", error);
      setButtonText("Pokušaj ponovo");
      alert("Došlo je do greške prilikom spremanja objave.");
    }
  };

  return (
    <div className="upload-main-div">
      <h2>Upload Teksta i Slika</h2>
      <form onSubmit={handleSubmit} className="textItitle upload-form">
        <div className="textItitle">
          <input 
            type="text" 
            placeholder="Unesi naslov" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            className="textItitle input-title" 
          />
          <textarea 
            placeholder="Unesi opis" 
            value={text} 
            onChange={(e) => setText(e.target.value)} 
            className="textItitle input-textarea" 
          />
        </div>
        
        {[0, 1, 2, 3, 4].map((index) => (
          <div key={index} className="textItitle image-upload">
            <input 
              className="textItitle" 
              type="file" 
              accept="image/*" 
              onChange={(e) => handleImageChange(e, index)} 
            />
            {previews[index] && <img src={previews[index]} alt="Preview" width="100" />}
          </div>
        ))}
        
        <button type="submit" className="textItitleButon submit-button">
          {buttonText}
        </button>
      </form>
    </div>
  );
};

const DisplayPage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data: posts, error } = await supabase
          .from('posts')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setData(posts);
      } catch (err) {
        console.error("Greška pri učitavanju podataka:", err);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="display-main-div">
      <h2>Prikaz Unesenih Podataka</h2>
      {data.map((item, index) => (
        <div key={index} className="data-entry">
          <h3>{item.title}</h3>
          <p>{item.text}</p>
          {item.images && item.images.map((img, imgIndex) =>
            img ? <img key={imgIndex} src={img} alt="Uploaded" width="100" /> : null
          )}
        </div>
      ))}
    </div>
  );
};

export { UploadPage, DisplayPage };