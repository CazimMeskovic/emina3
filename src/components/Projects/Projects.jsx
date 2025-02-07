/* import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";
import leaf from "../../Assets/Projects/leaf.png";
import emotion from "../../Assets/Projects/emotion.png";
import editor from "../../Assets/Projects/codeEditor.png";
import chatify from "../../Assets/Projects/chatify.png";
import suicide from "../../Assets/Projects/suicide.png";
import bitsOfCode from "../../Assets/Projects/blog.png";

function Projects() {
  return (
    <Container fluid className="project-section">
      <Particle />
      <Container>
        <h1 className="project-heading">
          My Recent <strong className="purple">Works </strong>
        </h1>
        <p style={{ color: "white" }}>
          Here are a few projects I've worked on recently.
        </p>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={chatify}
              isBlog={false}
              title="Chatify"
              description="Personal Chat Room or Workspace to share resources and hangout with friends build with react.js, Material-UI, and Firebase. Have features which allows user for realtime messaging, image sharing as well as supports reactions on messages."
              ghLink="https://github.com/soumyajit4419/Chatify"
              demoLink="https://chatify-49.web.app/"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={bitsOfCode}
              isBlog={false}
              title="Bits-0f-C0de"
              description="My personal blog page build with Next.js and Tailwind Css which takes the content from makdown files and renders it using Next.js. Supports dark mode and easy to write blogs using markdown."
              ghLink="https://github.com/soumyajit4419/Bits-0f-C0de"
              demoLink="https://blogs.soumya-jit.tech/"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={editor}
              isBlog={false}
              title="Editor.io"
              description="Online code and markdown editor build with react.js. Online Editor which supports html, css, and js code with instant view of website. Online markdown editor for building README file which supports GFM, Custom Html tags with toolbar and instant preview.Both the editor supports auto save of work using Local Storage"
              ghLink="https://github.com/soumyajit4419/Editor.io"
              demoLink="https://editor.soumya-jit.tech/"              
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={leaf}
              isBlog={false}
              title="Plant AI"
              description="Used the plant disease dataset from Kaggle and trained a image classifer model using 'PyTorch' framework using CNN and Transfer Learning with 38 classes of various plant leaves. The model was successfully able to detect diseased and healthy leaves of 14 unique plants. I was able to achieve an accuracy of 98% by using Resnet34 pretrained model."
              ghLink="https://github.com/soumyajit4419/Plant_AI"
              demoLink="https://plant49-ai.herokuapp.com/"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={suicide}
              isBlog={false}
              title="Ai For Social Good"
              description="Using 'Natural Launguage Processing' for the detection of suicide-related posts and user's suicide ideation in cyberspace  and thus helping in sucide prevention."
              ghLink="https://github.com/soumyajit4419/AI_For_Social_Good"
              // demoLink="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley" <--------Please include a demo link here
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={emotion}
              isBlog={false}
              title="Face Recognition and Emotion Detection"
              description="Trained a CNN classifier using 'FER-2013 dataset' with Keras and tensorflow backened. The classifier sucessfully predicted the various types of emotions of human. And the highest accuracy obtained with the model was 60.1%.
              Then used Open-CV to detect the face in an image and then pass the face to the classifer to predict the emotion of a person."
              ghLink="https://github.com/soumyajit4419/Face_And_Emotion_Detection"
              // demoLink="https://blogs.soumya-jit.tech/"      <--------Please include a demo link here 
            />
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Projects;
 */
/* 
import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";
import leaf from "../../Assets/Projects/leaf.png";
import emotion from "../../Assets/Projects/emotion.png";
import editor from "../../Assets/Projects/codeEditor.png";
import chatify from "../../Assets/Projects/chatify.png";
import suicide from "../../Assets/Projects/suicide.png";
import bitsOfCode from "../../Assets/Projects/blog.png";

function Projects() {
  return (
    <Container fluid className="project-section">
      <Particle />
      <Container>
        <h1 className="project-heading">
          My Recent <strong className="purple">Works </strong>
        </h1>
        <p style={{ color: "white" }}>
          Here are a few projects I've worked on recently.
        </p>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={chatify}
              isBlog={false}
              title="Chatify"
              description="Personal Chat Room or Workspace to share resources and hangout with friends build with react.js, Material-UI, and Firebase. Have features which allows user for realtime messaging, image sharing as well as supports reactions on messages."
              ghLink="https://github.com/soumyajit4419/Chatify"
              demoLink="https://chatify-49.web.app/"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={bitsOfCode}
              isBlog={false}
              title="Bits-0f-C0de"
              description="My personal blog page build with Next.js and Tailwind Css which takes the content from makdown files and renders it using Next.js. Supports dark mode and easy to write blogs using markdown."
              ghLink="https://github.com/soumyajit4419/Bits-0f-C0de"
              demoLink="https://blogs.soumya-jit.tech/"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={editor}
              isBlog={false}
              title="Editor.io"
              description="Online code and markdown editor build with react.js. Online Editor which supports html, css, and js code with instant view of website. Online markdown editor for building README file which supports GFM, Custom Html tags with toolbar and instant preview.Both the editor supports auto save of work using Local Storage"
              ghLink="https://github.com/soumyajit4419/Editor.io"
              demoLink="https://editor.soumya-jit.tech/"              
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={leaf}
              isBlog={false}
              title="Plant AI"
              description="Used the plant disease dataset from Kaggle and trained a image classifer model using 'PyTorch' framework using CNN and Transfer Learning with 38 classes of various plant leaves. The model was successfully able to detect diseased and healthy leaves of 14 unique plants. I was able to achieve an accuracy of 98% by using Resnet34 pretrained model."
              ghLink="https://github.com/soumyajit4419/Plant_AI"
              demoLink="https://plant49-ai.herokuapp.com/"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={suicide}
              isBlog={false}
              title="Ai For Social Good"
              description="Using 'Natural Launguage Processing' for the detection of suicide-related posts and user's suicide ideation in cyberspace  and thus helping in sucide prevention."
              ghLink="https://github.com/soumyajit4419/AI_For_Social_Good"
              // demoLink="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley" <--------Please include a demo link here
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={emotion}
              isBlog={false}
              title="Face Recognition and Emotion Detection"
              description="Trained a CNN classifier using 'FER-2013 dataset' with Keras and tensorflow backened. The classifier sucessfully predicted the various types of emotions of human. And the highest accuracy obtained with the model was 60.1%.
              Then used Open-CV to detect the face in an image and then pass the face to the classifer to predict the emotion of a person."
              ghLink="https://github.com/soumyajit4419/Face_And_Emotion_Detection"
              // demoLink="https://blogs.soumya-jit.tech/"      <--------Please include a demo link here 
            />
          </Col>
          
        </Row>
      </Container>
    </Container>
  );
}

export default Projects;
 */

/* 
import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";

function Projects() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://server-emina.onrender.com/data")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  return (
    <Container fluid className="project-section">
      <Particle />
      <Container>
        <h1 className="project-heading">
          My Recent <strong className="purple">Works </strong>
        </h1>
        <p style={{ color: "white" }}>
          Here are a few projects I've worked on recently.
        </p>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          {data.map((item, index) => (
            <Col key={index} md={4} className="project-card">
              <ProjectCard
                imgPath={`https://server-emina.onrender.com/uploads/${item.image}`}
                isBlog={false}
                title={item.title || "Untitled Project"}
                description={item.text || "No description available."}
                ghLink={item.ghLink || "#"}
                demoLink={item.demoLink || "#"}
              />
            </Col>
          ))}
        </Row>
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

function Projects() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://server-emina.onrender.com/data")
      .then((res) => res.json())
      .then((data) => setData(data))
      console.log(data)
  }, []);

  const handleDemoClick = (item) => {
    navigate("/project-details", { state: { item } });
  };

  return (
    <Container  fluid className=" project-section">
      <Particle />
      <Container>
        <h1 className="projectsJa project-heading">
          My Recent <strong className="purple">Works </strong>
        </h1>
        <p style={{ color: "white" }}>
          Here are a few projects I've worked on recently.
        </p>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          {data.map((item, index) => (
            <Col key={index} md={4} className="project-card">
              <ProjectCard
                imgPath={`https://server-emina.onrender.com/uploads/${item.image}`}
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
      </Container>
    </Container>
  );
}

export default Projects;
  */

/* dodao loader */
/* 
import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";
import Preloader from "../Pre"; // Uvezi Preloader

function Projects() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // Dodajemo loading stanje
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://server-emina.onrender.com/data")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false); // Postavljamo loading na false kada se podaci učitaju
      });
  }, []);

  const handleDemoClick = (item) => {
    navigate("/project-details", { state: { item } });
  };

  return (
    <Container fluid className="project-section">
      <Particle />
      <Container>
        <h1 className="projectsJa project-heading">
          Neki od <strong className="purple">mojih radova </strong>
        </h1>
        <p style={{ color: "white" }}>
          Ovdje mozete pogledati neke od mojih radova
        </p>

        {loading ? (
          <Preloader load={loading} /> // Prikazujemo loader dok čekamo podatke
        ) : (
          <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
            {data.map((item, index) => (
              <Col key={index} md={4} className="project-card">
                <ProjectCard
                  imgPath={`https://server-emina.onrender.com/uploads/${item.image}`}
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
/* 
import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";
import Preloader from "../Pre"; // Uvezi Preloader

function Projects() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://server-emina.onrender.com/data")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        return res.json();
      })
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  
  const handleDemoClick = (item) => {
    navigate("/project-details", { state: { item } });
  };

  return (
    <Container fluid className="project-section">
      <Particle />
      <Container>
        <h1 className="projectsJa project-heading">
          Neki od <strong className="purple">mojih radova </strong>
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
                    item.image
                      ? `https://server-emina.onrender.com/uploads/${item.image}`
                      : "/fallback-image.jpg" // Fallback slika ako ne postoji
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

/* fec slika sa imguru aplikacije */
/* 
import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";
import Preloader from "../Pre"; // Uvezi Preloader

const IMGUR_CLIENT_ID = "d75054204f9e0a9"; // Zameni sa svojim Client ID

function Projects() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState(""); // URL slike nakon uploada
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://server-emina.onrender.com/data")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        return res.json();
      })
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  // Funkcija za upload slike na Imgur
  const handleImageUpload = async () => {
    if (!selectedFile) {
      alert("Molimo odaberite sliku!");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const response = await fetch("https://api.imgur.com/3/image", {
        method: "POST",
        headers: {
          Authorization: `Client-ID ${IMGUR_CLIENT_ID}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setUploadedImageUrl(data.data.link); // Postavljamo URL slike
        alert("Slika je uspešno uploadovana!");
      } else {
        throw new Error("Neuspješan upload slike.");
      }
    } catch (error) {
      console.error("Greška pri uploadu slike:", error);
      alert("Greška pri uploadu slike.");
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
          Neki od <strong className="purple">mojih radova </strong>
        </h1>
        <p style={{ color: "white" }}>
          Ovdje možete pogledati neke od mojih radova.
        </p>

     
        <Form>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label style={{ color: "white" }}>Odaberi sliku:</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={(e) => setSelectedFile(e.target.files[0])}
            />
          </Form.Group>
          <Button variant="primary" onClick={handleImageUpload}>
            Upload Slike
          </Button>
        </Form>

      
        {uploadedImageUrl && (
          <div style={{ marginTop: "20px" }}>
            <h5 style={{ color: "white" }}>Uploadovana slika:</h5>
            <img src={uploadedImageUrl} alt="Uploaded" width="200px" />
          </div>
        )}

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
                    item.image
                      ? `https://server-emina.onrender.com/uploads/${item.image}`
                      : "/fallback-image.jpg" // Fallback slika ako ne postoji
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
/* 
import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";
import Preloader from "../Pre"; // Uvezi Preloader

function Projects() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://server-emina.onrender.com/data")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        return res.json();
      })
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const handleDemoClick = (item) => {
    navigate("/project-details", { state: { item } });
  };

  return (
    <Container fluid className="project-section">
      <Particle />
      <Container>
        <h1 className="projectsJa project-heading">
          Neki od <strong className="purple">mojih radova </strong>
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
                  imgPath={item.image || "/fallback-image.jpg"} // Koristi Imgur URL ili fallback
                  isBlog={false}
                  title={item.title || "Untitled Project"}
                  description={item.text || "No description available."}
                  ghLink={item.ghLink || "#"}
                  demoLink="#"
                  onDemoClick={() => handleDemoClick(item)}
                />
                <Row>
                  {[item.img1, item.img2, item.img3, item.img4].map(
                    (img, i) =>
                      img && (
                        <Col key={i} xs={6}>
                          <img
                            src={img}
                            alt={`Project Image ${i}`}
                            width="100%"
                            style={{ marginTop: "10px", borderRadius: "10px" }}
                          />
                        </Col>
                      )
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

function Projects() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Dodaj svoj GitHub token ovde
 
 

  useEffect(() => {
    // GitHub API URL za fajl iz repozitorijuma
    const githubUrl =
      "https://api.github.com/repos/CazimMeskovic/emina1/contents/src/data.json";

    fetch(githubUrl, {
      
      headers: {
        "Authorization": `Bearer ${GITHUB_TOKEN}`,
        "Accept": "application/vnd.github.v3.raw" // Ovo pomaže da dobijemo čisti JSON
      }
      
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        return res.json();
      })
      .then((response) => {
        // GitHub vraća sadržaj u base64, pa ga treba dekodirati
        const decodedContent = atob(response.content);
        const parsedData = JSON.parse(decodedContent);
        setData(parsedData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError(error.message);
        setLoading(false);
      });  
  }, []);

  const handleDemoClick = (item) => {
    navigate("/project-details", { state: { item } });
  };

  return (
    <Container fluid className="project-section">
      <Particle />
      <Container>
        <h1 className="projectsJa project-heading">
          Neki od <strong className="purple">mojih radova </strong>
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

import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";
import Preloader from "../Pre"; // Uvezi Preloader

function Projects() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // URL ka RAW verziji fajla
    const rawGithubUrl =
      "https://raw.githubusercontent.com/CazimMeskovic/emina1/main/src/data.json";

    fetch(rawGithubUrl)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        return res.json();
      })
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError(error.message);
        setLoading(false);
      });
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
