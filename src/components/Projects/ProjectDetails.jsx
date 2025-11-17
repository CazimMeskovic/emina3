/* 
 
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Container } from "react-bootstrap";
import "./ProjectDetails.css";

function ProjectDetails() {
  const location = useLocation();
  const { item } = location.state || {};
  const [showOverlay, setShowOverlay] = useState(false);
  const [overlayImage, setOverlayImage] = useState("");

  // Ako nema projekta, prikazujemo poruku
  if (!item) {
    return <p>No project details available.</p>;
  }

  // Funkcija za otvaranje overlay-a
  const openOverlay = (image) => {
    setOverlayImage(image);
    setShowOverlay(true);
  };

  // Funkcija za zatvaranje overlay-a
  const closeOverlay = () => {
    setShowOverlay(false);
    setOverlayImage("");
  };

  // Putanja do servera
  const imagePath = "https://server-emina.onrender.com/uploads/";

  return (
    <Container className="project-details-section">
   
      
      <div className="image-grid">
       
        <img
          src={`${imagePath}${item.image}`}
          alt="Main Project"
          className="main-image"
          onClick={() => openOverlay(item.image)}
          onError={(e) => e.target.src = "/fallback-image.jpg"} // Fallback slika u slučaju greške
        />
        
        <div className="side-images">
         
          {[item.img1, item.img2, item.img3, item.img4].map((img, index) => (
            img && (
              <img
                key={index}
                src={`${imagePath}${img}`}
                alt={`Project ${index + 1}`}
                className=" side-image"
                onClick={() => openOverlay(img)}
                onError={(e) => e.target.src = "/fallback-image.jpg"} // Fallback slika u slučaju greške
              />
            )
          ))}
        </div>
      </div>

      <h1 className="project-title">{item.title || "Untitled Project"}</h1>

    
      <p className="project-description">{item.text || "No description available."}</p>

     
      {showOverlay && (
        <div className="overlay" onClick={closeOverlay}>
          <div className="overlay-content" onClick={(e) => e.stopPropagation()}>
            <span className="close-btn" onClick={closeOverlay}>×</span>
            <img
              src={`${imagePath}${overlayImage}`}
              alt="Overlay"
              className="overlay-image"
            />
          </div>
        </div>
      )}
    </Container>
  );
}

export default ProjectDetails;
 

 */
/* 

import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import Preloader from "../Pre"; // Uvezi Preloader

function ProjectDetails() {
  const location = useLocation();
  const { item } = location.state || {}; // Prvo dobijamo item

  // Inicijalizacija hook-ova
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]); // Dodajemo state za podatke

  // URL za GitHub RAW fajl
  const rawGithubUrl =
    "https://raw.githubusercontent.com/CazimMeskovic/emina3/main/data.json";

  useEffect(() => {
    // Ako `item` nije dostupan, nemoj ni pokušavati da učitavaš podatke
    if (!item) return;

    fetch(rawGithubUrl)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        return res.json();
      })
      .then((data) => {
        setData(data); // Učitavamo podatke
        setLoading(false); // Završeno učitavanje
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError(error.message);
        setLoading(false);
      });
  }, [item]); // Učitaj podatke kada `item` postoji

  // Ako `item` nije definisan, prikaži poruku
  if (!item) {
    return <p>No project details available.</p>;
  }

  // Putanja do GitHub RAW sadržaja
  const imagePath = "https://raw.githubusercontent.com/CazimMeskovic/emina3/main/";

  return (
    <Container className="project-details-section">
      {loading ? (
        <Preloader load={loading} />
      ) : error ? (
        <p style={{ color: "red" }}>Greška pri učitavanju podataka: {error}</p>
      ) : (
        <>
          <h1 className="project-title">{item.title || "Untitled Project"}</h1>
          <p className="project-description">{item.text || "No description available."}</p>

          <Row>
            <Col md={12}>
              <img
                src={`${imagePath}${item.image}`}
                alt="Main Project"
                className="main-image"
                onError={(e) => e.target.src = "/fallback-image.jpg"} // Fallback slika u slučaju greške
              />
            </Col>
          </Row>

          <Row>
            {[item.img1, item.img2, item.img3, item.img4].map((img, index) =>
              img ? (
                <Col key={index} md={3}>
                  <img
                    src={`${imagePath}${img}`}
                    alt={`Project ${index + 1}`}
                    className="side-image"
                    onError={(e) => e.target.src = "/fallback-image.jpg"} // Fallback slika u slučaju greške
                  />
                </Col>
              ) : null
            )}
          </Row>
        </>
      )}
    </Container>
  );
}

export default ProjectDetails;
 */
/* 
import React from "react";
import { useLocation } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import Particle from "../Particle";

function ProjectDetails() {
  const { state } = useLocation();
  const { item } = state || {}; // Get the project data passed from Projects

  if (!item) {
    return <p>Projekt nije pronađen.</p>;
  }

  return (
    <Container fluid className="project-details-section">
      <Particle />
      <Container>
        <h1 className="project-heading">
          <strong className="purple">{item.title || "No Title"}</strong>
        </h1>
        <p>{item.text || "No description available."}</p>

        {item.images && item.images.length > 0 ? (
          <Row>
            {item.images.map((img, index) => (
              <Col key={index} xs={12} md={6} lg={4}>
                <img
                  src={img}
                  alt={`Project Image ${index}`}
                  width="100%"
                  style={{
                    marginTop: "10px",
                    borderRadius: "10px",
                    maxHeight: "300px",
                    objectFit: "cover",
                  }}
                />
              </Col>
            ))}
          </Row>
        ) : (
          <p>No images available</p>
        )}
      </Container>
    </Container>
  );
}

export default ProjectDetails;
 */

/* 
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import Particle from "../Particle";
import "./ProjectDetails.css"; // Stilizuj stranicu sa tvojim CSS-om

function ProjectDetails() {
  const location = useLocation();
  const { item } = location.state || {};
  const [showOverlay, setShowOverlay] = useState(false);
  const [overlayImage, setOverlayImage] = useState("");

  // Ako nema projekta, prikazujemo poruku
  if (!item) {
    return <p>No project details available.</p>;
  }

  // Funkcija za otvaranje overlay-a
  const openOverlay = (image) => {
    setOverlayImage(image);
    setShowOverlay(true);
  };

  // Funkcija za zatvaranje overlay-a
  const closeOverlay = () => {
    setShowOverlay(false);
    setOverlayImage("");
  };

  return (
    <Container fluid className="project-details-section">
      <Particle />
      <Container>
       

        <div className="image-grid">
          {item.images && item.images.length > 0 ? (
            <>
              <img
                src={item.images[0]} // Prva slika
                alt="Main Project"
                className="main-image"
                onClick={() => openOverlay(item.images[0])}
                onError={(e) => e.target.src = "/fallback-image.jpg"} // Fallback slika u slučaju greške
              />

              <div className="side-images">
                {item.images.slice(1).map((img, index) => (
                  img && (
                    <img
                      key={index}
                      src={img}
                      alt={`Project ${index + 1}`}
                      className="side-image"
                      onClick={() => openOverlay(img)}
                      onError={(e) => e.target.src = "/fallback-image.jpg"} // Fallback slika u slučaju greške
                    />
                  )
                ))}
              </div>
              <h1 className="project-heading">
          <strong className="polozajTitla purple ">{item.title || "No Title"}</strong>
        </h1>
        <p className="project-description">{item.text || "No description available."}</p>
            </>
          ) : (
            <p>No images available</p>
          )}
        </div>

        {showOverlay && (
          <div className="overlay" onClick={closeOverlay}>
            <div className="overlay-content" onClick={(e) => e.stopPropagation()}>
              <span className="close-btn" onClick={closeOverlay}>×</span>
              <img
                src={overlayImage}
                alt="Overlay"
                className="overlay-image"
              />
            </div>
          </div>
        )}
      </Container>
    </Container>
  );
}

export default ProjectDetails;
 

 */

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

  useEffect(() => {
    // If no item in state, fetch from Supabase by id in query params
    if (!item && location.state?.item?.id) {
      const fetchPost = async () => {
        setLoading(true);
        const { data, error } = await supabase
          .from('posts')
          .select('*')
          .eq('id', location.state.item.id)
          .single();
        if (error) {
          setError(error.message);
        } else {
          setItem(data);
        }
        setLoading(false);
      };
      fetchPost();
    }
  }, [item, location.state]);

  const openOverlay = (image) => {
    setOverlayImage(image);
  };
  const closeOverlay = () => {
    setOverlayImage(null);
  };

  if (loading) return <div style={{ color: 'white', padding: '2rem' }}>Učitavanje...</div>;
  if (error) return <div style={{ color: 'red', padding: '2rem' }}>Greška: {error}</div>;
  if (!item) return <div style={{ color: 'white', padding: '2rem' }}>Projekt nije pronađen.</div>;

  // Use image_urls if present, otherwise fallback to image_url
  const imagesToShow = Array.isArray(item.image_urls) && item.image_urls.length > 0
    ? item.image_urls.filter(Boolean)
    : item.image_url ? [item.image_url] : [];

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

