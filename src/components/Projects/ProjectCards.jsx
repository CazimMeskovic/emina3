/* import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { CgWebsite } from "react-icons/cg";
import { BsGithub } from "react-icons/bs";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function ProjectCards(props) {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate('/upload', { state: { project: props.project } });
  };

  return (
    <Card className="project-card-view">
      <Card.Img variant="top" src={props.imgPath} alt="card-img" />
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        <Card.Text style={{ textAlign: "justify" }}>
          {props.description}
        </Card.Text>
        <div className="d-flex flex-wrap gap-2">
          <Button variant="primary" href={props.ghLink} target="_blank">
            <BsGithub /> &nbsp;
            {props.isBlog ? "Blog" : "GitHub"}
          </Button>

       

        {!props.isBlog && props.demoLink && (
          <Button
            variant="primary"
            href={props.demoLink}
            target="_blank"
            className="mx-2"
          >
            <CgWebsite /> &nbsp;
            {"Demo"}
          </Button>
          <Button variant="warning" onClick={handleEdit} className="mx-2">
            <FaEdit /> &nbsp;
            Uredi
          </Button>
          <Button variant="danger" onClick={() => props.onDelete(props.project.id)}>
            <FaTrash /> &nbsp;
            Obriši
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
import Link from 'next/link'
import "./ProjectCards.css"

function ProjectCard({ imgPath, title, ghLink, onDemoClick, project, onDelete }) {
  return (
    <Card className="project-card-view">
      <Card.Img  variant="top" src={imgPath} alt="card-img" />
      <Card.Body>
        <Card.Title  >{title}</Card.Title>
        <div>
          {onDemoClick && (
            <Button variant="success" onClick={onDemoClick} style={{ marginLeft: "10px" }}>
             Pogledaj Detaljno
            </Button>
          )}
          <div style={{ display: 'inline-block', marginLeft: 8 }}>
            <Link href={`/upload?id=${project?.id}`} legacyBehavior>
              <a className="btn btn-warning mx-1" style={{ textDecoration: 'none' }}>Uredi</a>
            </Link>
            <Button variant="danger" onClick={() => onDelete && onDelete(project?.id)} className="mx-1">
              Obriši
            </Button>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}

export default ProjectCard;
