

import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { Container } from "react-bootstrap";
import Particle from "../Particle";
import "./ProjectDetails.css";
import { supabase } from '../../supabaseClient';

function ProjectDetails() {
  const location = useLocation();
  const { item: initialItem } = location.state || {};
  const [item, setItem] = useState(initialItem || null);
  const [overlayImage, setOverlayImage] = useState(null);
  const [loading, setLoading] = useState(!initialItem);
  const [error, setError] = useState(null);

  // Always fetch the full post from Supabase when we have an id.
  // Some navigations pass a partial `item` in location.state; to ensure we have
  // the complete `image_urls` array, fetch the record by id.
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

  const openOverlay = (image) => {
    setOverlayImage(image);
  };
  const closeOverlay = () => {
    setOverlayImage(null);
  };
  // Build an array of image identifiers from different possible fields
  const rawImages = (() => {
    // item.images might already be an array
    if (Array.isArray(item?.images) && item.images.length > 0) return item.images;

    // item.image_urls may be stored as JSON string or as an array
    if (Array.isArray(item?.image_urls) && item.image_urls.length > 0) return item.image_urls;
    if (typeof item?.image_urls === 'string' && item.image_urls.trim()) {
      try {
        const parsed = JSON.parse(item.image_urls);
        if (Array.isArray(parsed)) return parsed;
      } catch (e) {
        // fallback: maybe comma separated
        return item.image_urls.split(',').map(s => s.trim()).filter(Boolean);
      }
    }

    // single image fields
    if (item?.image) return [item.image];
    if (item?.image_url) return [item.image_url];

    return [];
  })();

  // Debug: also log to console (use console.log so it's not filtered)
  try {
    console.log('ProjectDetails rawImages:', rawImages);
  } catch (e) {
    /* ignore in non-browser env */
  }

  // Resolve an image entry to an actual URL usable in <img src>
  const resolveImageUrl = async (img) => {
    if (!img) return null;

    // If it's already a data URI or http(s) url, return as-is
    if (typeof img === 'string' && (img.startsWith('data:') || img.startsWith('http://') || img.startsWith('https://'))) {
      return img;
    }

    // If value looks like it contains the bucket prefix (e.g., "project-images/filename.jpg"), strip it
    let path = img;
    if (path.startsWith('project-images/')) {
      path = path.replace(/^project-images\//, '');
    }

    // Try getting public URL from Supabase Storage
    try {
      const { data } = await supabase.storage.from('project-images').getPublicUrl(path);
      if (data && data.publicUrl) return data.publicUrl;

      // If publicUrl is empty (private bucket), try creating signed URL (valid for 60 seconds)
      const { data: signed, error: signedErr } = await supabase.storage.from('project-images').createSignedUrl(path, 60);
      if (signedErr) {
        console.warn('Could not create signed URL for', path, signedErr);
        return null;
      }
      return signed.signedUrl;
    } catch (err) {
      console.error('Error resolving storage image url for', img, err);
      return null;
    }
  };

  // Resolve all images (limit to max 5)
  const [imagesToShow, setImagesToShow] = useState([]);

  useEffect(() => {
    let mounted = true;
    const prepare = async () => {
      const resolved = [];
      for (const raw of rawImages.slice(0, 5)) {
        const url = await resolveImageUrl(raw);
        if (url) resolved.push(url);
      }
      if (mounted) {
        setImagesToShow(resolved);
        try {
          console.log('ProjectDetails imagesToShow resolved:', resolved);
        } catch (e) {}
      }
    };
    prepare();
    return () => { mounted = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item]);

  if (loading) return <div style={{ color: 'white', padding: '2rem' }}>Učitavanje...</div>;
  if (error) return <div style={{ color: 'red', padding: '2rem' }}>Greška: {error}</div>;
  if (!item) return <div style={{ color: 'white', padding: '2rem' }}>Projekt nije pronađen.</div>;

  return (
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
                onClick={() => openOverlay(img)}
                onError={(e) => (e.target.src = "/fallback-image.jpg")}
                style={{ cursor: "pointer", maxWidth: "320px", maxHeight: "220px", borderRadius: "10px", boxShadow: "0 2px 8px rgba(0,0,0,0.12)" }}
              />
            ))
          ) : (
            <p style={{ color: 'white' }}>Nema slika za ovaj projekat.</p>
          )}
        </div>
        {/* Visible debugging: show raw and resolved images for easier troubleshooting */}
       {/*  <div style={{ color: 'white', marginTop: '16px', fontSize: '12px' }}>
          <details style={{ color: 'white' }}>
            <summary style={{ cursor: 'pointer' }}>Debug: rawImages / resolved URLs (click to expand)</summary>
            <pre style={{ color: 'white', whiteSpace: 'pre-wrap' }}>
              RAW: {JSON.stringify(rawImages, null, 2)}
              
              RESOLVED: {JSON.stringify(imagesToShow, null, 2)}
            </pre>
          </details>
        </div> */}
      </Container>

      {/* Overlay for enlarged image */}
      {overlayImage && (
        <div className="overlay show" onClick={closeOverlay}>
          <div className="overlay-content" onClick={(e) => e.stopPropagation()}>
            <img src={overlayImage} alt="Enlarged" className="overlay-image" />
            <span className="close-btn" onClick={closeOverlay}>
              &times;
            </span>
          </div>
        </div>
      )}
    </Container>
  );
}

export default ProjectDetails;

