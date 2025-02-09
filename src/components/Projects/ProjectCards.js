/* import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { CgWebsite } from "react-icons/cg";
import { BsGithub } from "react-icons/bs";

function ProjectCards(props) {
  return (
    <Card className="project-card-view">
      <Card.Img variant="top" src={props.imgPath} alt="card-img" />
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        <Card.Text style={{ textAlign: "justify" }}>
          {props.description}
        </Card.Text>
        <Button variant="primary" href={props.ghLink} target="_blank">
          <BsGithub /> &nbsp;
          {props.isBlog ? "Blog" : "GitHub"}
        </Button>
        {"\n"}
        {"\n"}

       

        {!props.isBlog && props.demoLink && (
          <Button
            variant="primary"
            href={props.demoLink}
            target="_blank"
            style={{ marginLeft: "10px" }}
          >
            <CgWebsite /> &nbsp;
            {"Demo"}
          </Button>
        )}
      </Card.Body>
    </Card>
  );
}
export default ProjectCards;
 */

/* import React from "react";
import { Card, Button } from "react-bootstrap"; */

import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { CgWebsite } from "react-icons/cg";
import { BsGithub } from "react-icons/bs";
import "./ProjectCards.css"

function ProjectCard({ imgPath, title, description, ghLink, demoLink, onDemoClick }) {
  return (
    <Card className="project-card-view">
      <Card.Img  variant="top" src={imgPath} alt="card-img" />
      <Card.Body>
        <Card.Title  >{title}</Card.Title>
        {/*  <Card.Text>{description}</Card.Text>  */}
        <div>
          {ghLink && (<span></span>
           /*  <Button variant="primary" href={ghLink} target="_blank" rel="noopener noreferrer">
              GitHub
            </Button> */
          )}
          {onDemoClick && (
            <Button variant="success" onClick={onDemoClick} style={{ marginLeft: "10px" }}>
             Pogledaj Detaljno
            </Button>
          )}
        </div>
      </Card.Body>
    </Card>
  );
}

export default ProjectCard;
