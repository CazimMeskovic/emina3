/* import React from "react";
import { useLocation } from "react-router-dom";
import { Container } from "react-bootstrap";
import "./ProjectCards.css"

function ProjectDetails() {
  const location = useLocation();
  const { item } = location.state || {};

  if (!item) {
    return <p>No project details available.</p>;
  }

  return (
    <Container className="project-details-section">
      <h1 className="bojatitla project-title">{item.title || "Untitled Project"}</h1> 
      <img
        src={`https://server-emina.onrender.com/uploads/${item.image}`}
        alt="Project"
        className="project-image"
        style={{ width: "50%", maxHeight: "200px", objectFit: "cover" }}
      />
      <p className="bojatitla project-description">{item.text || "No description available."}</p>
      {item.ghLink && (
        <p>
          <a href={item.ghLink} target="_blank" rel="noopener noreferrer">
            View on GitHub
          </a>
        </p>
      )}
      {item.demoLink && (
        <p>
          <a href={item.demoLink} target="_blank" rel="noopener noreferrer">
            Live Demo
          </a>
        </p>
      )}
    </Container>
  );
}

export default ProjectDetails;
 */
/* 
import React from "react";
import { useLocation } from "react-router-dom";
import { Container } from "react-bootstrap";
import "./ProjectDetails.css";

function ProjectDetails() {
  const location = useLocation();
  const { item } = location.state || {};

  if (!item) {
    return <p>No project details available.</p>;
  }

  return (
    <Container className="project-details-section">
      <h1 className="project-title">{item.title || "Untitled Project"}</h1>
      
      <div className="image-grid">
        <img
          src={`https://server-emina.onrender.com/uploads/${item.image}`}
          alt="Main Project"
          className="main-image"
        />
        <div className="side-images">
          {[item.img1, item.img2, item.img3, item.img4].map((img, index) => (
            img && (
              <img
                key={index}
                src={`https://server-emina.onrender.com/uploads/${img}`}
                alt={`Project ${index + 1}`}
                className="side-image"
              />
            )
          ))}
        </div>
      </div>

      <p className="project-description">{item.text || "No description available."}</p>
    </Container>
  );
}

export default ProjectDetails; 
  */
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

  if (!item) {
    return <p>No project details available.</p>;
  }

  const openOverlay = (image) => {
    setOverlayImage(image);
    setShowOverlay(true);
  };

  const closeOverlay = () => {
    setShowOverlay(false);
    setOverlayImage("");
  };

  return (
    <Container className="project-details-section">
      <h1 className="project-title">{item.title || "Untitled Project"}</h1>
      
      <div className="image-grid">
        <img
          src={`https://server-emina.onrender.com/uploads/${item.image}`}
          alt="Main Project"
          className="main-image"
          onClick={() => openOverlay(item.image)}
        />
        <div className="side-images">
          {[item.img1, item.img2, item.img3, item.img4].map((img, index) => (
            img && (
              <img
                key={index}
                src={`https://server-emina.onrender.com/uploads/${img}`}
                alt={`Project ${index + 1}`}
                className="side-image"
                onClick={() => openOverlay(img)}
              />
            )
          ))}
        </div>
      </div>

      <p className="project-description">{item.text || "No description available."}</p>

      
      {showOverlay && (
        <div className="overlay" onClick={closeOverlay}>
          <div className="overlay-content" onClick={(e) => e.stopPropagation()}>
            <span className="close-btn" onClick={closeOverlay}>×</span>
            <img
              src={`https://server-emina.onrender.com/uploads/${overlayImage}`}
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
 

