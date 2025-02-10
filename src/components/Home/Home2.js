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
              Dobrodošli u moju mini kućnu krojački radionicu.
              <b className="purple">
                Inspirisano ljubavlju 🧵🪡💜

                Kreativno, sa stilom i pečatom svoje osobnosti, Mina dizajnira za vas:
              </b>
              <br />
              <br />

              -propisne odjevne predmete za žene,
              <br />
              <b className="purple">
                -unikatne komade odjece,
              </b>
              <br />

              -jedinstvene svečane komade za posebne, zatvorene događaje,
              <br />
              <b className="purple">
                -burkinije za izolovane plaže, bazene,
              </b>
              <br />

              -intimni kutak
              <br />
              <br />
              <b className="purple">
                i još puno toga što zajedničkim idejamo mozemo pretvoriti u unikatne komade odjeće prilagođene vašim potrebama.
              </b>
              <br />
              <br />
              <i>
                <b className="purple"> </b>
              </i>
              <br />
              <br />
              &nbsp;
              <i>
                <b className="purple"> </b> {" "}
                <b className="purple">

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
