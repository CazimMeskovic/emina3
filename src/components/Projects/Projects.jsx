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
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data, error } = await supabase
          .from('posts')
          .select('*')
          .order('created_at', { ascending: false });
        if (error) throw error;
        setPosts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

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
        ) : posts.length === 0 ? (
          <p style={{ color: "white" }}>Trenutno nema dostupnih projekata.</p>
        ) : (
          <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
            {posts.map((item, index) => (
              <Col key={index} md={4} className="project-card">
                <ProjectCard
                  imgPath={
                    item.image_urls && item.image_urls.length > 0
                      ? item.image_urls[0]
                      : item.image_url || "/fallback-image.jpg"
                  }
                  isBlog={false}
                  title={item.title || "Untitled Project"}
                  description={item.text || "No description available."}
                  ghLink={item.ghLink || "#"}
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
/* 
import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";
import Preloader from "../Pre";
import { useData } from "../context/DataContext"; // uzmi podatke iz konteksta

function Projects() {
  const { projects } = useData(); // prefetchovani projekti
  const [loading, ] = useState(!projects); // ako nema podataka, prikazi loading
  const [error, ] = useState(null);
  const navigate = useNavigate();

  const handleDemoClick = (item) => {
      // Automatski preusmjeri na staru rutu ako treba
      if (item && item.id) {
       navigate(`/project-details?id=${item.id}`);
       // Za novu rutu koristi: router.push(`/project/${item.id}`);
      }
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
 */

import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";
import Preloader from "../Pre";
import { useData } from "../context/DataContext";

function Projects() {
  const { projects } = useData();
  console.log("✅ Projects data from context:", projects);

    const loading = projects === null || projects === undefined || projects.length === 0;
  const error = null;
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
        ) : projects.length === 0 ? (
          <p style={{ color: "white" }}>Trenutno nema dostupnih projekata.</p>
        ) : (
          <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
            {projects.map((item, index) => (
              <Col key={index} md={4} className="project-card">
                <ProjectCard
                  imgPath={
                    item.image_url || "/fallback-image.jpg"
                  }
                  isBlog={false}
                  title={item.title || "Untitled Project"}
                  description={item.text || "No description available."}
                  ghLink={item.ghLink || "#"}
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
