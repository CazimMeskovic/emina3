import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";
import Preloader from "../Pre";
import { useData } from "../context/DataContext";
import { Helmet } from "react-helmet";

function Projects() {
  const { projects } = useData();
  const [currentPage, setCurrentPage] = React.useState(1);
  const projectsPerPage = 6;
  const navigate = useNavigate();

  // ✅ FIX: loading samo kad nema podataka, NE kad je prazan array
  const loading = projects === null || projects === undefined;
  const error = null;

  const handleDemoClick = (item) => {
    navigate("/project-details", { state: { item } });
  };

  // Pagination logic
  const totalProjects = projects ? projects.length : 0;
  const totalPages = Math.ceil(totalProjects / projectsPerPage);
  const startIndex = (currentPage - 1) * projectsPerPage;
  const endIndex = startIndex + projectsPerPage;

  // ✅ slice sigurniji
  const currentProjects = projects?.slice(startIndex, endIndex) || [];

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ✅ DEBUG (možeš obrisati kasnije)
  React.useEffect(() => {
    console.log("Current page:", currentPage);
  }, [currentPage]);

  return (
    <>
      <Helmet>
        <title>Projekti | Mina HM</title>
        <meta name="description" content="Portfolio projekata Mina HM." />
      </Helmet>

      <Container fluid className="project-section">
        {/* ⚠️ Ako paginacija ne radi, privremeno zakomentariši ovo */}
       {/*  <Particle /> */}

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
            <p style={{ color: "red" }}>
              Greška pri učitavanju podataka: {error}
            </p>
          ) : projects.length === 0 ? (
            <p style={{ color: "white" }}>
              Trenutno nema dostupnih projekata.
            </p>
          ) : (
            <>
              <Row
                style={{
                  justifyContent: "center",
                  paddingBottom: "10px",
                }}
              >
                {currentProjects.map((item, index) => (
                  <Col
                    // ✅ FIX: NIKAD index kao key
                    key={item.id || item._id || `${item.title}-${index}`}
                    md={4}
                    className="project-card"
                  >
                    <ProjectCard
                      imgPath={item.image_url || "/fallback-image.jpg"}
                      isBlog={false}
                      title={item.title || "Untitled Project"}
                      description={item.text || "No description available."}
                      ghLink={item.ghLink || "#"}
                      onDemoClick={() => handleDemoClick(item)}
                    />
                  </Col>
                ))}
              </Row>

              {/* Pagination */}
              {totalPages > 1 && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: 20,
                    marginBottom: 60,
                    flexWrap: "wrap",
                  }}
                >
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        style={{
                          margin: "5px",
                          padding: "8px 16px",
                          borderRadius: "6px",
                          border:
                            page === currentPage
                              ? "2px solid #6c63ff"
                              : "1px solid #ccc",
                          background:
                            page === currentPage ? "#6c63ff" : "#fff",
                          color:
                            page === currentPage ? "#fff" : "#333",
                          fontWeight:
                            page === currentPage ? "bold" : "normal",
                          cursor: "pointer",
                          transition: "0.2s",
                        }}
                      >
                        {page}
                      </button>
                    )
                  )}
                </div>
              )}
            </>
          )}
        </Container>
      </Container>
    </>
  );
}

export default Projects;