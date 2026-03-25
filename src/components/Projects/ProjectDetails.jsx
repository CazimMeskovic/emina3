import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Container } from "react-bootstrap";
import Particle from "../Particle";
import "./ProjectDetails.css";
import { supabase } from '../../supabaseClient';
import { Helmet } from "react-helmet";

function ProjectDetails() {
  const location = useLocation();
  const { item: initialItem } = location.state || {};
  const [item, setItem] = useState(initialItem || null);
  const [currentImageIndex, setCurrentImageIndex] = useState(null); // za slider
  const [loading, setLoading] = useState(!initialItem);
  const [error, setError] = useState(null);

  const postId = location.state?.item?.id || initialItem?.id;

  useEffect(() => {
    if (!postId) return;
    let mounted = true;

    const fetchPost = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('posts')
          .select('*')
          .eq('id', postId)
          .single();
        if (error) {
          if (mounted) setError(error.message);
        } else {
          if (mounted) setItem(data);
        }
      } catch (err) {
        if (mounted) setError(err.message || 'Greška pri dohvaćanju posta');
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchPost();
    return () => { mounted = false; };
  }, [postId]);

  const rawImages = (() => {
    if (Array.isArray(item?.images) && item.images.length > 0) return item.images;
    if (Array.isArray(item?.image_urls) && item.image_urls.length > 0) return item.image_urls;
    if (typeof item?.image_urls === 'string' && item.image_urls.trim()) {
      try {
        const parsed = JSON.parse(item.image_urls);
        if (Array.isArray(parsed)) return parsed;
      } catch (e) {
        return item.image_urls.split(',').map(s => s.trim()).filter(Boolean);
      }
    }
    if (item?.image) return [item.image];
    if (item?.image_url) return [item.image_url];
    return [];
  })();

  const resolveImageUrl = async (img) => {
    if (!img) return null;
    if (typeof img === 'string' && (img.startsWith('data:') || img.startsWith('http://') || img.startsWith('https://'))) {
      return img;
    }
    let path = img;
    if (path.startsWith('project-images/')) path = path.replace(/^project-images\//, '');
    try {
      const { data } = await supabase.storage.from('project-images').getPublicUrl(path);
      if (data?.publicUrl) return data.publicUrl;
      const { data: signed, error: signedErr } = await supabase.storage.from('project-images').createSignedUrl(path, 60);
      if (signedErr) return null;
      return signed.signedUrl;
    } catch {
      return null;
    }
  };

  const [imagesToShow, setImagesToShow] = useState([]);

  useEffect(() => {
    let mounted = true;
    const prepare = async () => {
      const resolved = [];
      for (const raw of rawImages) {
        const url = await resolveImageUrl(raw);
        if (url) resolved.push(url);
      }
      if (mounted) setImagesToShow(resolved);
    };
    prepare();
    return () => { mounted = false; };
  }, [item]);

  const openOverlay = (index) => setCurrentImageIndex(index);
  const closeOverlay = () => setCurrentImageIndex(null);

  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === 0 ? imagesToShow.length - 1 : prev - 1));
  };
  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === imagesToShow.length - 1 ? 0 : prev + 1));
  };

  if (loading) return <div style={{ color: 'white', marginTop:'5rem', padding: '2rem' }}>Učitavanje...</div>;
  if (error) return <div style={{ color: 'red', padding: '2rem' }}>Greška: {error}</div>;
  if (!item) return <div style={{ color: 'white', padding: '2rem' }}>Projekt nije pronađen.</div>;

  return (
    <>
      <Helmet>
        <title>{item.title || 'Projekat'} | Mina HM</title>
      </Helmet>
      <Container fluid className="project-details-section">
        <Particle />
        <Container>
          <h1 className="project-heading">
            <strong className="polozajTitla purple">{item.title || "No Title"}</strong>
          </h1>
          <p className="project-description">{item.text || "No description available."}</p>
          <div className="image-grid" style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginTop: '24px' }}>
            {imagesToShow.length > 0 ? (
              imagesToShow.map((img, idx) => (
                <img
                  key={idx}
                  src={img || "/fallback-image.jpg"}
                  alt={item.title}
                  className="main-image"
                  onClick={() => openOverlay(idx)}
                  onError={(e) => e.target.src = "/fallback-image.jpg"}
                  style={{ cursor: "pointer", maxWidth: "320px", maxHeight: "220px", borderRadius: "10px", boxShadow: "0 2px 8px rgba(0,0,0,0.12)" }}
                />
              ))
            ) : <p style={{ color: 'white' }}>Nema slika za ovaj projekat.</p>}
          </div>
        </Container>

        {/* Overlay Slider */}
        {currentImageIndex !== null && (
          <div className="overlay show" onClick={closeOverlay}>
            <div className="overlay-content" onClick={(e) => e.stopPropagation()}>
              <img
                src={imagesToShow[currentImageIndex]}
                alt="Enlarged"
                className="overlay-image"
                style={{ maxHeight: '80vh', maxWidth: '90vw', borderRadius: '10px' }}
              />
              <span className="close-btn" onClick={closeOverlay}>&times;</span>
              {/* Navigacija */}
              {imagesToShow.length > 1 && (
                <>
                  <button className="overlay-prev" onClick={prevImage}>&#10094;</button>
                  <button className="overlay-next" onClick={nextImage}>&#10095;</button>
                </>
              )}
            </div>
          </div>
        )}
      </Container>
    </>
  );
}

export default ProjectDetails;