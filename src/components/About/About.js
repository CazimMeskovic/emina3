/* import React from "react"; */
import { Helmet } from "react-helmet";
import { Container, Row, Col } from "react-bootstrap";
import Particle from "../Particle";
/* import Github from "./Github";
import Techstack from "./Techstack"; */
import Aboutcard from "./AboutCard";
import laptopImg from "../../Assets/about.png";
/* import Toolstack from "./Toolstack"; */

function About() {
  return (
    <>
      <Helmet>
        <title>O meni | Mina HM</title>
        <meta name="description" content="O meni - krojačka web stranica mina-hm.com. Saznajte više o meni, mom radu, iskustvu i unikatnim projektima." />
        <link rel="canonical" href="https://mina-hm.com/about" />
        <meta property="og:title" content="O meni | Mina HM" />
        <meta property="og:description" content="O meni - krojačka web stranica mina-hm.com. Saznajte više o meni, mom radu, iskustvu i unikatnim projektima." />
        <meta property="og:url" content="https://mina-hm.com/about" />
        <meta property="og:type" content="profile" />
      </Helmet>
      <Container fluid className="OmeniMobile about-section">
      <Particle />
      <Container>
        <Row style={{ justifyContent: "center", padding: "10px" }}>
          <Col
          className="KoSamJa"
            md={7}
            style={{
              justifyContent: "center",
              paddingTop: "30px",
              paddingBottom: "50px",
            }}
          >
            <h1 style={{ fontSize: "2.1em", paddingBottom: "20px" }}>
               <strong className="KoSamJa main-name">Ko sam ja</strong>
            </h1>
            <Aboutcard />
          </Col>
          <Col
            md={5}
            style={{ paddingTop: "120px", paddingBottom: "50px" }}
            className="about-img"
          >
            <img src={laptopImg} alt="about" className="img-fluid" />
          </Col>
        </Row>
       {/*  <h1 className="project-heading">
          Professional <strong className="purple">Skillset </strong>
        </h1>

        <Techstack /> 

        <h1 className="project-heading">
           <strong className="purple">Tools</strong> I use 
        </h1>
         <Toolstack />

        <Github /> */}
      </Container>
    </Container>
    </>
  );
}

export default About;
