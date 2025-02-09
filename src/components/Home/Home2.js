import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import myImg from "../../Assets/avatar.png";
import Tilt from "react-parallax-tilt";
import {
  AiFillGithub,
  AiOutlineTwitter,
  AiFillInstagram,
} from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";

function Home2() {
  return (
    <Container fluid className="homeFone1 home-about-section" id="about">
      <Container>
        <Row>
          <Col md={8} className="home-about-description">
            <h1 style={{ fontSize: "2.6em" }}>
              DOZVOLITE <span className="purple"> MI DA </span> SE PREDSTAVIM
            </h1>
            <p className="home-about-body">
            Dobrodošli u moju krojačku radionicu,🤷‍♂️
              <br />
              <br />Ovdje se svaki komad tkanine pretvara u unikatno djelo! Sa strašću prema šivenju i pažnjom prema detaljima,
              <i>
                <b className="purple"> izrađujem odjeću i tekstilne radove po vašoj želji. Bilo da vam je potreban popravak, prepravka ili potpuno novi komad, </b>
              </i>
              <br />
              <br />
              tu sam da vaše ideje pretočim u stvarnost. Svaki šav nosi priču, a moja misija je da vam pružim kvalitet, &nbsp;
              <i>
                <b className="purple">udobnost i stil po mjeri. </b> {" "}
                <b className="purple">
                Kontaktirajte me i zajedno ćemo stvoriti nešto posebno!
                </b>
              </i>
              <br />
              <br />
              <b className="purple"></b> 
              <i>
                <b className="purple">
                  {" "}
                 
                </b>
              </i>
              &nbsp; 
              <i>
                <b className="purple"> </b>
              </i>
            </p>
          </Col>
          <Col md={4} className="myAvtar">
            <Tilt>
              <img src={myImg} className="img-fluid" alt="avatar" />
            </Tilt>
          </Col>
        </Row>
        <Row>
          <Col md={12} className="home-about-social">
            <h1>FIND ME ON</h1>
            <p>
              Feel free to <span className="purple">connect </span>with me
            </p>
            <ul className="home-about-social-links">
              <li className="social-icons">
                <a
                  href="https://github.com/soumyajit4419"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour  home-social-icons"
                >
                  <AiFillGithub />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="https://twitter.com/Soumyajit4419"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour  home-social-icons"
                >
                  <AiOutlineTwitter />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="https://www.linkedin.com/in/soumyajit4419/"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour  home-social-icons"
                >
                  <FaLinkedinIn />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="https://www.instagram.com/soumyajit4419"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour home-social-icons"
                >
                  <AiFillInstagram />
                </a>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}
export default Home2;
