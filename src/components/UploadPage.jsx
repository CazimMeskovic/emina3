import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useLocation } from "react-router-dom";
 import "./UploadPageNew.css"; 

import { supabase } from '../supabaseClient';

const UploadPage = () => {
  const [posts, setPosts] = useState([]);
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [images, setImages] = useState([null, null, null, null, null]);
  const [previews, setPreviews] = useState([null, null, null, null, null]);
  const [imageUrls, setImageUrls] = useState([null, null, null, null, null]);
  const [buttonText, setButtonText] = useState("Objavi");
  const [editingId, setEditingId] = useState(null);

  const location = useLocation();

  useEffect(() => {
    let isMounted = true;
    const fetchAndSetPosts = async () => {
      await fetchPosts();
    };
    fetchAndSetPosts();
    // Check if we're editing an existing post
    if (location.state?.project) {
      const project = location.state.project;
      if (isMounted) {
        setTitle(project.title);
        setText(project.text);
        setImages(project.images || [null, null, null, null, null]);
        setPreviews(project.images || [null, null, null, null, null]);
        setEditingId(project.id);
        setButtonText("Ažuriraj");
      }
    }
    return () => {
      isMounted = false;
    };
  }, [location.state]);

  // Add this after your existing useEffect
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        alert('Morate biti prijavljeni da biste mogli uređivati objave.');
        // Optionally redirect to login page
        // navigate('/login');
      }
    };

    checkAuth();
  }, []);

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

  const handleImageChange = async (e) => {
    const idx = parseInt(e.target.dataset.idx);
    const file = e.target.files[0];
    if (!file) return;
    const fileName = `${Date.now()}_${Math.random().toString(36).slice(2)}_${file.name}`;
    const { data, error } = await supabase.storage
      .from("project-images")
      .upload(fileName, file);
    if (error || !data) {
      alert("Greška pri uploadu slike! " + (error?.message || ""));
      return;
    }
    const { data: urlData, error: urlError } = supabase.storage
      .from("project-images")
      .getPublicUrl(fileName);
    if (urlError || !urlData?.publicUrl) {
      alert("Greška pri dohvaćanju URL-a slike! " + (urlError?.message || ""));
      return;
    }
    const newImageUrls = [...imageUrls];
    const newPreviews = [...previews];
    newImageUrls[idx] = urlData.publicUrl;
    newPreviews[idx] = urlData.publicUrl;
    setImageUrls(newImageUrls);
    setPreviews(newPreviews);
  };

  /*  const handleDelete = async (id) => {
     if (window.confirm('Jeste li sigurni da želite obrisati ovu objavu?')) {
       try {
         console.log("Deleting post id:", id);
         const { error } = await supabase
           .from('posts')
           .delete()
           .match({ id: id });
 
         if (error) {
           console.error('Error deleting post:', error);
           alert('Greška pri brisanju objave: ' + (error.message || JSON.stringify(error)));
           return;
         }
         
         // If we get here, delete was successful
         console.log('Post deleted successfully');
         await fetchPosts(); // Refresh the list
         alert('Objava je uspješno obrisana.');
       } catch (error) {
         console.error("Error deleting post:", error);
         alert('Došlo je do greške prilikom brisanja.');
       }
     }
   };
  */
  const handleDelete = async (id) => {
    if (window.confirm('Jeste li sigurni da želite obrisati ovu objavu?')) {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
          alert('Morate biti prijavljeni da biste obrisali objavu.');
          return;
        }

        console.log("Deleting post id:", id);
        const { error } = await supabase
          .from('posts')
          .delete()
          .match({
            id: id,
            user_id: session.user.id
          });

        if (error) {
          console.error('Error deleting post:', error);
          alert('Greška pri brisanju objave: ' + error.message);
          return;
        }

        console.log('Post deleted successfully');
        await fetchPosts();
        alert('Objava je uspješno obrisana.');
      } catch (error) {
        console.error("Error deleting post:", error);
        alert('Došlo je do greške prilikom brisanja.');
      }
    }
  };
  const handleEdit = (post) => {
    setTitle(post.title || "");
    setText(post.text || "");
    // Postoji li image_url? Postavi ga kao preview i url
    setImageUrls([post.image_url || null, null, null, null, null]);
    setPreviews([post.image_url || null, null, null, null, null]);
    setEditingId(post.id);
    setButtonText("Ažuriraj");
    window.scrollTo(0, 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setButtonText(editingId ? "Ažuriranje..." : "Objavljujem...");

    try {
      console.log('Submitting. editingId =', editingId);
      console.log("Checking auth session...");
      const { data: { session }, error: authError } = await supabase.auth.getSession();

      if (authError) {
        console.error("Auth error:", authError);
        throw new Error('Greška pri provjeri autentifikacije');
      }

      if (!session) {
        console.error("No session found");
        throw new Error('Niste prijavljeni. Molimo prijavite se.');
      }

      console.log("Session found, user_id:", session.user.id);

      // Validate and prepare data
      if (!title.trim() || !text.trim()) {
        throw new Error('Naslov i opis su obavezni.');
      }

      const filteredImageUrls = imageUrls.filter(Boolean);
      console.log("Filtered image URLs count:", filteredImageUrls.length);
      if (filteredImageUrls.length === 0) {
        setButtonText(editingId ? "Ažuriraj" : "Objavi");
        alert("Morate dodati barem jednu sliku!");
        return;
      }
      const postData = {
        title: title.trim(),
        text: text.trim(),
        image_url: filteredImageUrls[0] || null, // for backward compatibility
        image_urls: filteredImageUrls // new array column for all images
      };

      console.log("Preparing to save post data:", { ...postData, imageCount: filteredImageUrls.length });

      let result;
      if (editingId) {
        console.log("Updating existing post:", editingId);
        const { error } = await supabase
          .from('posts')
          .update({
            title: postData.title,
            text: postData.text,
            image_url: postData.image_url,
            image_urls: postData.image_urls,
            updated_at: new Date().toISOString()
          })
          .match({
            id: editingId,
            user_id: session.user.id
          });
        result = { error };
      } else {
        console.log("Creating new post");
        const { error } = await supabase
          .from('posts')
          .insert({
            ...postData,
            created_at: new Date().toISOString(),
            user_id: session.user.id
          });
        result = { error };
      }

      console.log('supabase result:', result);
      if (result?.error) {
        console.error("Database error:", result.error);
        throw new Error(result.error.message || 'Greška pri spremanju podataka');
      }

      console.log("Operation successful");
      // Reset form
      setText("");
      setTitle("");
      setImageUrls([null, null, null, null, null]);
      setPreviews([null, null, null, null, null]);
      setButtonText("Objavi");
      setEditingId(null);
      fetchPosts();
      alert(editingId ? "Objava je uspješno ažurirana!" : "Objava je uspješno spremljena!");
    } catch (error) {
      console.error("Full error details:", error);
      setButtonText(editingId ? "Ažuriraj" : "Objavi");
      alert(`Došlo je do greške: ${error.message || 'Nepoznata greška'}`);
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
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%' }}>
              {[0,1,2,3,4].map(idx => (
                <div key={idx} style={{ marginBottom: '8px' }}>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    data-idx={idx}
                    id={`image-input-${idx}`}
                    style={{ display: 'none' }}
                  />
                  <label htmlFor={`image-input-${idx}`} className="image-upload-box" style={{ width: '100%', cursor: 'pointer', display: 'block', marginBottom: '8px' }}>
                    {previews[idx] ? (
                      <img src={previews[idx]} alt={`Preview ${idx+1}`} style={{ width: '100%', maxHeight: '300px', objectFit: 'cover', borderRadius: '8px', border: '2px solid #eee' }} />
                    ) : (
                      <div style={{ height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#222', color: '#fff', borderRadius: '8px', border: '2px dashed #555' }}>
                        {`Browse slika ${idx+1}`}
                      </div>
                    )}
                  </label>
                </div>
              ))}
            </div>
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

      <h2 className="section-title">Svi Projekti</h2>
      <div className="posts-container">
        {posts.length === 0 ? (
          <div style={{ color: "white" }}>Trenutno nema dostupnih projekata.</div>
        ) : (
          posts.map((post) => (
            <div key={post.id} className="project-card">
              <div className="project-card-view">
                {/* Show all images if available, fallback to image_url or fallback image */}
                {post.image_urls && post.image_urls.length > 0 ? (
                  post.image_urls.map((img, idx) => (
                    <img
                      key={idx}
                      src={img || "/fallback-image.jpg"}
                      alt={post.title}
                      className="post-image"
                      style={{ marginBottom: "8px" }}
                    />
                  ))
                ) : (
                  <img
                    src={post.image_url || "/fallback-image.jpg"}
                    alt={post.title}
                    className="post-image"
                  />
                )}
                <div className="project-card-body">
                  <h3 className="post-title">{post.title}</h3>
                  <p className="post-description">{post.text}</p>
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
              </div>
            </div>
          ))
        )}
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