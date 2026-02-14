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
  console.log("✅ Projects data from context:", projects);

    const loading = projects === null || projects === undefined || projects.length === 0;
  const error = null;
  const navigate = useNavigate();

  const handleDemoClick = (item) => {
    navigate("/project-details", { state: { item } });
  };

  return (
    <>
      <Helmet>
        <title>Projekti | Mina HM</title>
        <meta name="description" content="Pogledajte inovativne projekte i unikatne radove krojačke radnje Mina HM. Portfolio, slike i detalji svakog projekta. Krojač, krojačka radnja, šivenje, snajderica, inovativni krojač, unikatni radovi, projekti, Mina HM, modni dizajn, ručni rad, kreativnost, odjeća po mjeri, šnajder, šnajderica, šivenje po mjeri, popravke odjeće, šivanje, krojenje, dizajn odjeće, ženska odjeća, muška odjeća, dječija odjeća, blog, kontakt, portfolio, najbolji krojač, najbolja snajderica, šivenje Sarajevo, šivenje Tuzla, šivenje BiH, šivenje po narudžbi, popravka odjeće, unikatna odjeća, šivenje haljina, šivenje pantalona, šivenje suknji, šivenje kaputa, šivenje jakni, šivenje vjenčanica, šivenje odijela, šivenje za djecu, šivenje za žene, šivenje za muškarce, šivenje po želji, šivenje na zahtjev, šivenje po mjeri, šivenje unikatno, šivenje kreativno, šivenje inovativno, šivenje kvalitetno, šivenje povoljno, šivenje profesionalno, šivenje iskustvo, šivenje preporuka, šivenje recenzije, šivenje online, šivenje kontakt, šivenje cijena, šivenje usluge, šivenje radionica, šivenje radnja, šivenje butik, šivenje studio, šivenje dizajn, šivenje moda, šivenje trend, šivenje savjeti, šivenje blog, šivenje portfolio, šivenje slike, šivenje galerija, šivenje inspiracija, šivenje ideje, šivenje tehnike, šivenje materijali, šivenje tkanine, šivenje krojevi, šivenje uzorci, šivenje šabloni, šivenje krojenje, šivenje šabloniranje, šivenje krojački savjeti, šivenje snajderski savjeti, šivenje krojačka radnja, šivenje snajderska radnja, šivenje modni dizajn, šivenje ručni rad, šivenje kreativnost, šivenje odjeća po mjeri, šivenje unikatni radovi, šivenje projekti, šivenje Mina HM" />
        <meta name="keywords" content="krojač, krojačka radnja, šivenje, snajderica, inovativni krojač, unikatni radovi, projekti, Mina HM, modni dizajn, ručni rad, kreativnost, odjeća po mjeri, šnajder, šnajderica, šivenje po mjeri, popravke odjeće, šivanje, krojenje, dizajn odjeće, ženska odjeća, muška odjeća, dječija odjeća, blog, kontakt, portfolio, najbolji krojač, najbolja snajderica, šivenje Sarajevo, šivenje Tuzla, šivenje BiH, šivenje po narudžbi, popravka odjeće, unikatna odjeća, šivenje haljina, šivenje pantalona, šivenje suknji, šivenje kaputa, šivenje jakni, šivenje vjenčanica, šivenje odijela, šivenje za djecu, šivenje za žene, šivenje za muškarce, šivenje po želji, šivenje na zahtjev, šivenje po mjeri, šivenje unikatno, šivenje kreativno, šivenje inovativno, šivenje kvalitetno, šivenje povoljno, šivenje profesionalno, šivenje iskustvo, šivenje preporuka, šivenje recenzije, šivenje online, šivenje kontakt, šivenje cijena, šivenje usluge, šivenje radionica, šivenje radnja, šivenje butik, šivenje studio, šivenje dizajn, šivenje moda, šivenje trend, šivenje savjeti, šivenje blog, šivenje portfolio, šivenje slike, šivenje galerija, šivenje inspiracija, šivenje ideje, šivenje tehnike, šivenje materijali, šivenje tkanine, šivenje krojevi, šivenje uzorci, šivenje šabloni, šivenje krojenje, šivenje šabloniranje, šivenje krojački savjeti, šivenje snajderski savjeti, šivenje krojačka radnja, šivenje snajderska radnja, šivenje modni dizajn, šivenje ručni rad, šivenje kreativnost, šivenje odjeća po mjeri, šivenje unikatni radovi, šivenje projekti, šivenje Mina HM" />
        <link rel="canonical" href="https://mina-hm.com/project" />
        <meta property="og:title" content="Projekti | Mina HM" />
        <meta property="og:description" content="Pogledajte inovativne projekte i unikatne radove krojačke radnje Mina HM. Portfolio, slike i detalji svakog projekta. Krojač, krojačka radnja, šivenje, snajderica, inovativni krojač, unikatni radovi, projekti, Mina HM, modni dizajn, ručni rad, kreativnost, odjeća po mjeri, šnajder, šnajderica, šivenje po mjeri, popravke odjeće, šivanje, krojenje, dizajn odjeće, ženska odjeća, muška odjeća, dječija odjeća, blog, kontakt, portfolio, najbolji krojač, najbolja snajderica, šivenje Sarajevo, šivenje Tuzla, šivenje BiH, šivenje po narudžbi, popravka odjeće, unikatna odjeća, šivenje haljina, šivenje pantalona, šivenje suknji, šivenje kaputa, šivenje jakni, šivenje vjenčanica, šivenje odijela, šivenje za djecu, šivenje za žene, šivenje za muškarce, šivenje po želji, šivenje na zahtjev, šivenje po mjeri, šivenje unikatno, šivenje kreativno, šivenje inovativno, šivenje kvalitetno, šivenje povoljno, šivenje profesionalno, šivenje iskustvo, šivenje preporuka, šivenje recenzije, šivenje online, šivenje kontakt, šivenje cijena, šivenje usluge, šivenje radionica, šivenje radnja, šivenje butik, šivenje studio, šivenje dizajn, šivenje moda, šivenje trend, šivenje savjeti, šivenje blog, šivenje portfolio, šivenje slike, šivenje galerija, šivenje inspiracija, šivenje ideje, šivenje tehnike, šivenje materijali, šivenje tkanine, šivenje krojevi, šivenje uzorci, šivenje šabloni, šivenje krojenje, šivenje šabloniranje, šivenje krojački savjeti, šivenje snajderski savjeti, šivenje krojačka radnja, šivenje snajderska radnja, šivenje modni dizajn, šivenje ručni rad, šivenje kreativnost, šivenje odjeća po mjeri, šivenje unikatni radovi, šivenje projekti, šivenje Mina HM" />
        <meta property="og:url" content="https://mina-hm.com/project" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Projekti | Mina HM" />
        <meta name="twitter:description" content="Pogledajte inovativne projekte i unikatne radove krojačke radnje Mina HM. Portfolio, slike i detalji svakog projekta. Krojač, krojačka radnja, šivenje, snajderica, inovativni krojač, unikatni radovi, projekti, Mina HM, modni dizajn, ručni rad, kreativnost, odjeća po mjeri, šnajder, šnajderica, šivenje po mjeri, popravke odjeće, šivanje, krojenje, dizajn odjeće, ženska odjeća, muška odjeća, dječija odjeća, blog, kontakt, portfolio, najbolji krojač, najbolja snajderica, šivenje Sarajevo, šivenje Tuzla, šivenje BiH, šivenje po narudžbi, popravka odjeće, unikatna odjeća, šivenje haljina, šivenje pantalona, šivenje suknji, šivenje kaputa, šivenje jakni, šivenje vjenčanica, šivenje odijela, šivenje za djecu, šivenje za žene, šivenje za muškarce, šivenje po želji, šivenje na zahtjev, šivenje po mjeri, šivenje unikatno, šivenje kreativno, šivenje inovativno, šivenje kvalitetno, šivenje povoljno, šivenje profesionalno, šivenje iskustvo, šivenje preporuka, šivenje recenzije, šivenje online, šivenje kontakt, šivenje cijena, šivenje usluge, šivenje radionica, šivenje radnja, šivenje butik, šivenje studio, šivenje dizajn, šivenje moda, šivenje trend, šivenje savjeti, šivenje blog, šivenje portfolio, šivenje slike, šivenje galerija, šivenje inspiracija, šivenje ideje, šivenje tehnike, šivenje materijali, šivenje tkanine, šivenje krojevi, šivenje uzorci, šivenje šabloni, šivenje krojenje, šivenje šabloniranje, šivenje krojački savjeti, šivenje snajderski savjeti, šivenje krojačka radnja, šivenje snajderska radnja, šivenje modni dizajn, šivenje ručni rad, šivenje kreativnost, šivenje odjeća po mjeri, šivenje unikatni radovi, šivenje projekti, šivenje Mina HM" />
      </Helmet>
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
    </>
  );
}

export default Projects;