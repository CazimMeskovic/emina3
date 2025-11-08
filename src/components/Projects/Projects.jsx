/* 

import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";
import Preloader from "../Pre"; // Uvezi Preloader
import { supabase } from '../../supabaseClient';

function Projects() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const { data: projects, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setData(projects);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching projects:", error);
      setError(error.message);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Jeste li sigurni da želite obrisati ovaj projekat?')) {
      try {
        const { error } = await supabase
          .from('projects')
          .delete()
          .eq('id', id);

        if (error) throw error;
        // Osvježi listu projekata nakon brisanja
        fetchProjects();
      } catch (error) {
        console.error("Error deleting project:", error);
      }
    }
  };

  const handleDemoClick = (item) => {
    navigate("/project-details", { state: { item } });
  };

  return (
    <Container fluid className="project-section">
      <Particle />
      <Container>
        <h1 className="projectsJa project-heading">
          Neki od <strong className="purple">mojih radova</strong>
        </h1>
        <p style={{ color: "white" }}>Ovdje možete pogledati neke od mojih radova.</p>

        {loading ? (
          <Preloader load={loading} />
        ) : error ? (
          <p style={{ color: "red" }}>Greška pri učitavanju podataka: {error}</p>
        ) : (
          <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
            {data.map((item, index) => (
              <Col key={index} md={4} className="project-card">
                <ProjectCard
                  imgPath={
                    item.images && item.images.length > 0
                      ? item.images[0] // Prva slika u nizu
                      : "/fallback-image.jpg"
                  }
                  isBlog={false}
                  title={item.title || "Untitled Project"}
                  description={item.text || "No description available."}
                  ghLink={item.ghLink || "#"}
                  demoLink="#"
                  onDemoClick={() => handleDemoClick(item)}
                />
                <Row>
                  {item.images && item.images.length > 0 ? (
                    item.images.map((img, i) =>
                      img ? (
                        <Col key={i} xs={6}>
                          <img
                            src={img}
                            alt={`Project Image ${i}`}
                            width="100%"
                            style={{
                              marginTop: "10px",
                              borderRadius: "10px",
                              maxHeight: "200px",
                              objectFit: "cover",
                            }}
                          />
                        </Col>
                      ) : null
                    )
                  ) : (
                    <p style={{ color: "white" }}>Nema slika</p>
                  )}
                </Row>
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </Container>
  );
}

export default Projects;
  */
/* 
import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";
import Preloader from "../Pre"; // Uvezi Preloader
import { supabase } from "../../supabaseClient";

function Projects() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const { data: posts, error } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setData(posts);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data from Supabase:", error);
      setError(error.message);
      setLoading(false);
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
        fetchProjects(); // Refresh the list after deletion
      } catch (error) {
        console.error("Error deleting post:", error);
      }
    }
  };

  const handleDemoClick = (item) => {
    navigate("/project-details", { state: { item } });
  };

  return (
    <Container fluid className="project-section">
      <Particle />
      <Container>
        <h1 className="projectsJa project-heading">
          Neki od <strong className="purple">mojih radova</strong>
        </h1>
        <p style={{ color: "white" }}>
          Ovdje možete pogledati neke od mojih radova.
        </p>

        {loading ? (
          <Preloader load={loading} />
        ) : error ? (
          <p style={{ color: "red" }}>Greška pri učitavanju podataka: {error}</p>
        ) : (
          <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
            {data.map((item, index) => (
              <Col key={index} md={4} className="project-card">
                <ProjectCard
                  imgPath={
                    item.images && item.images.length > 0
                      ? item.images[0] // Prva slika u nizu
                      : "/fallback-image.jpg"
                  }
                  isBlog={false}
                  title={item.title || "Untitled Project"}
                  description={item.text || "No description available."}
                  ghLink={item.ghLink || "#"}
                  demoLink="#"
                  onDemoClick={() => handleDemoClick(item)}
                />
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </Container>
  );
}

export default Projects;
 */

import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";
import Preloader from "../Pre";
import { useData } from "../context/DataContext"; // uzmi podatke iz konteksta

function Projects() {
  const { projects } = useData(); // prefetchovani projekti
  const [loading, setLoading] = useState(!projects); // ako nema podataka, prikazi loading
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleDemoClick = (item) => {
    navigate("/project-details", { state: { item } });
  };

  return (
    <Container fluid className="project-section">
      <Particle />
      <Container>
        <h1 className="projectsJa project-heading">
          Neki od <strong className="purple">mojih radova</strong>
        </h1>
        <p style={{ color: "white" }}>
          Ovdje možete pogledati neke od mojih radova.
        </p>

        {loading ? (
          <Preloader load={loading} />
        ) : error ? (
          <p style={{ color: "red" }}>Greška pri učitavanju podataka: {error}</p>
        ) : (
          <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
            {projects &&
              projects.map((item, index) => (
                <Col key={index} md={4} className="project-card">
                  <ProjectCard
                    imgPath={
                      item.images && item.images.length > 0
                        ? item.images[0]
                        : "/fallback-image.jpg"
                    }
                    isBlog={false}
                    title={item.title || "Untitled Project"}
                    description={item.text || "No description available."}
                    ghLink={item.ghLink || "#"}
                    demoLink="#"
                    onDemoClick={() => handleDemoClick(item)}
                  />
                </Col>
              ))}
          </Row>
        )}
      </Container>
    </Container>
  );
}

export default Projects;
