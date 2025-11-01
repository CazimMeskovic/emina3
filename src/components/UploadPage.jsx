import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import "./UploadPageNew.css";
import { supabase } from '../supabaseClient';

const UploadPage = () => {
  const [posts, setPosts] = useState([]);
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [images, setImages] = useState([null, null, null, null, null]);
  const [previews, setPreviews] = useState([null, null, null, null, null]);
  const [buttonText, setButtonText] = useState("Objavi");
  const [editingId, setEditingId] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    fetchPosts();
    // Check if we're editing an existing post
    if (location.state?.project) {
      const project = location.state.project;
      setTitle(project.title);
      setText(project.text);
      setImages(project.images || [null, null, null, null, null]);
      setPreviews(project.images || [null, null, null, null, null]);
      setEditingId(project.id);
      setButtonText("Ažuriraj");
    }
  }, [location.state]);

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPosts(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const img = new window.Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0);
          const webpDataUrl = canvas.toDataURL('image/webp', 0.8);
          
          setImages(prev => {
            const newImages = [...prev];
            newImages[index] = webpDataUrl;
            return newImages;
          });

          const newPreviews = [...previews];
          newPreviews[index] = webpDataUrl;
          setPreviews(newPreviews);
        };
        img.src = reader.result;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Jeste li sigurni da želite obrisati ovu objavu?')) {
      try {
        const { error } = await supabase
          .from('posts')
          .delete()
          .eq('id', id);

        if (error) throw error;
        fetchPosts();
      } catch (error) {
        console.error("Error deleting post:", error);
      }
    }
  };

  const handleEdit = (post) => {
    setTitle(post.title);
    setText(post.text);
    setImages(post.images.concat(Array(5 - post.images.length).fill(null)));
    setPreviews(post.images.concat(Array(5 - post.images.length).fill(null)));
    setEditingId(post.id);
    setButtonText("Ažuriraj");
    window.scrollTo(0, 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setButtonText(editingId ? "Ažuriranje..." : "Objavljujem...");

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        throw new Error('Niste prijavljeni. Molimo prijavite se.');
      }

      const postData = {
        title,
        text,
        images: images.filter(Boolean),
        user_id: session.user.id
      };

      let error;
      if (editingId) {
        ({ error } = await supabase
          .from('posts')
          .update(postData)
          .eq('id', editingId));
      } else {
        ({ error } = await supabase
          .from('posts')
          .insert([{ ...postData, created_at: new Date().toISOString() }]));
      }

      if (error) throw error;

      // Reset form
      setText("");
      setTitle("");
      setImages([null, null, null, null, null]);
      setPreviews([null, null, null, null, null]);
      setButtonText("Objavi");
      setEditingId(null);
      fetchPosts();
      alert(editingId ? "Objava je uspješno ažurirana!" : "Objava je uspješno spremljena!");
    } catch (error) {
      console.error("Error:", error);
      setButtonText(editingId ? "Ažuriraj" : "Objavi");
      alert("Došlo je do greške.");
    }
  };

  return (
    <div className="upload-container">
      <div className="upload-form-container">
        <h2 className="section-title">{editingId ? 'Uredi Objavu' : 'Nova Objava'}</h2>
        <form onSubmit={handleSubmit} className="upload-form">
          <input 
            type="text" 
            placeholder="Unesi naslov" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            className="input-title" 
            required
          />
          <textarea 
            placeholder="Unesi opis" 
            value={text} 
            onChange={(e) => setText(e.target.value)} 
            className="input-textarea" 
            required
          />
          
          <div className="image-upload-container">
            {[0, 1, 2, 3, 4].map((index) => (
              <div key={index} className="image-upload-box">
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={(e) => handleImageChange(e, index)} 
                  style={{ display: 'none' }}
                  id={`image-input-${index}`}
                />
                <label htmlFor={`image-input-${index}`}>
                  {previews[index] ? (
                    <img src={previews[index]} alt="Preview" className="image-preview" />
                  ) : (
                    <div>Dodaj sliku {index + 1}</div>
                  )}
                </label>
              </div>
            ))}
          </div>
          
          <button type="submit" className="submit-button" disabled={!title || !text}>
            {buttonText === "Objavljujem..." || buttonText === "Ažuriranje..." ? (
              <><span className="loading-spinner"></span>{buttonText}</>
            ) : (
              buttonText
            )}
          </button>
        </form>
      </div>

      <h2 className="section-title">Sve Objave</h2>
      <div className="posts-container">
        {posts.map((post) => (
          <div key={post.id} className="post-card">
            <h3 className="post-title">{post.title}</h3>
            <p className="post-description">{post.text}</p>
            {post.images && post.images.length > 0 && (
              <div className="post-images">
                {post.images.map((img, index) => (
                  img && (
                    <img 
                      key={index} 
                      src={img} 
                      alt={`${post.title} - ${index + 1}`} 
                      className="post-image"
                    />
                  )
                ))}
              </div>
            )}
            <div className="post-actions">
              <button 
                className="btn-edit"
                onClick={() => handleEdit(post)}
              >
                <FaEdit /> Uredi
              </button>
              <button 
                className="btn-delete"
                onClick={() => handleDelete(post.id)}
              >
                <FaTrash /> Obriši
              </button>
            </div>
          </div>
        ))}
      </div>
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