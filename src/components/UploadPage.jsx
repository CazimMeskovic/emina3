import React, { useState, useEffect } from "react";
import "./UploadPage.css";
import { Buffer } from "buffer";



const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;
const REPO_OWNER = "CazimMeskovic";
const REPO_NAME = "emina3";
/* const FILE_PATH = "src/data.json"; */
const FILE_PATH = "data.json";

const updateGitHubFile = async (newEntry) => {
  const url = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FILE_PATH}`;

  try {
    // 1️⃣ Učitaj trenutne podatke iz GitHub-a
    let currentData = [];
    try {
      const response = await fetch(`https://raw.githubusercontent.com/${REPO_OWNER}/${REPO_NAME}/main/${FILE_PATH}`);
      if (response.ok) {
        currentData = await response.json();
      }
    } catch (err) {
      console.warn("Fajl ne postoji, kreiram novi.");
    }

    // 2️⃣ Dodaj novi unos
    currentData.push(newEntry);

    // 3️⃣ Dohvati SHA fajla (ako postoji)
    let sha = null;
    const fileDataResponse = await fetch(url, {
      headers: { Authorization: `token ${GITHUB_TOKEN}` },
    });

    if (fileDataResponse.ok) {
      const fileData = await fileDataResponse.json();
      sha = fileData.sha;
    }

    // 4️⃣ Konvertuj novi sadržaj u Base64
    const updatedContent = JSON.stringify(currentData, null, 2);
    /* const encodedContent = btoa(updatedContent); */
    const encodedContent = Buffer.from(updatedContent, 'utf-8').toString('base64');


    // 5️⃣ Ažuriraj fajl na GitHub-u
    const updateResponse = await fetch(url, {
      method: "PUT",
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: "Dodavanje novog unosa u data.json",
        content: encodedContent,
        sha: sha || undefined,
      }),
    });

    if (updateResponse.ok) {
      console.log("Podaci uspešno sačuvani na GitHubu!");
    } else {
      console.error("Greška pri ažuriranju fajla:", await updateResponse.text());
    }
  } catch (error) {
    console.error("Greška pri povezivanju sa GitHub API-jem:", error);
  }
};

const UploadPage = () => {
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [images, setImages] = useState([null, null, null, null, null]);
  const [previews, setPreviews] = useState([null, null, null, null, null]);

  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newImages = [...images];
        newImages[index] = reader.result;
        setImages(newImages);

        const newPreviews = [...previews];
        newPreviews[index] = URL.createObjectURL(file);
        setPreviews(newPreviews);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newEntry = { title, text, images: images.filter(Boolean) };

    await updateGitHubFile(newEntry);

    setText("");
    setTitle("");
    setImages([null, null, null, null, null]);
    setPreviews([null, null, null, null, null]);
  };

  return (
    <div className="upload-main-div">
      <h2>Upload Teksta i Slika</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Unesi naslov" value={title} onChange={(e) => setTitle(e.target.value)} />
        <textarea placeholder="Unesi opis" value={text} onChange={(e) => setText(e.target.value)} />
        {[0, 1, 2, 3, 4].map((index) => (
          <div key={index}>
            <input type="file" accept="image/*" onChange={(e) => handleImageChange(e, index)} />
            {previews[index] && <img src={previews[index]} alt="Preview" width="100" />}
          </div>
        ))}
        <button type="submit">Sačuvaj</button>
      </form>
    </div>
  );
};

const DisplayPage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://raw.githubusercontent.com/${REPO_OWNER}/${REPO_NAME}/main/${FILE_PATH}`
        );
        if (response.ok) {
          const jsonData = await response.json();
          setData(jsonData);
        }
      } catch (err) {
        console.error("Greška pri učitavanju podataka:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Prikaz Unesenih Podataka</h2>
      {data.map((item, index) => (
        <div key={index}>
          <h3>{item.title}</h3>
          <p>{item.text}</p>
          {item.images && item.images.map((img, imgIndex) =>
            img ? <img key={imgIndex} src={img} alt="Uploaded" width="100" /> : null
          )}
        </div>
      ))}
    </div>
  );
};

export { UploadPage, DisplayPage };
