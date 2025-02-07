/* import React, { useState, useEffect } from "react";
import "./UploadPage.css"

const UploadPage = () => {
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("text", text);
    formData.append("title", title);
    formData.append("image", image);

    const response = await fetch("https://server-emina.onrender.com/upload", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      alert("Upload successful");
      setText("");
      setTitle("");
      setImage(null);
      setPreview(null);
    }
  };

  return (
    <div className="upload-main-div"  >
      <h2>Upload Text and Image</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Opisi detaljno"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <input
          type="title"
          placeholder="Unesi Naslov"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input type="file" accept="image/*" onChange={handleImageChange} />
        {preview && <img src={preview} alt="Preview" width="100" />}
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

const DisplayPage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://server-emina.onrender.com/data")
      .then((res) => res.json())
      .then((data) => setData(data));
      console.log(data)
  }, []);

  return (
    <div >
      <h2>Uploaded Data</h2>
      {data.map((item, index) => (
        <div key={index}>
          <p>{item.text}</p>
          <img src={`https://server-emina.onrender.com/uploads/${item.image}`} alt="Uploaded" width="100" />
        </div>
      ))}
    </div>
  );
};

export { UploadPage, DisplayPage };
 */

/* 
 
import React, { useState, useEffect } from "react";
import "./UploadPage.css"

const UploadPage = () => {
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [img1, setImg1] = useState(null);
  const [img2, setImg2] = useState(null);
  const [img3, setImg3] = useState(null);
  const [img4, setImg4] = useState(null);
  const [preview, setPreview] = useState(null);
  const [preview1, setPreview1] = useState(null);
  const [preview2, setPreview2] = useState(null);
  const [preview3, setPreview3] = useState(null);
  const [preview4, setPreview4] = useState(null);

  const handleImageChange = (e, setImageFunc, setPreviewFunc) => {
    const file = e.target.files[0];
    setImageFunc(file);
    setPreviewFunc(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("text", text);
    formData.append("title", title);
    formData.append("image", image);
    formData.append("img1", img1);
    formData.append("img2", img2);
    formData.append("img3", img3);
    formData.append("img4", img4);

    const response = await fetch("https://server-emina.onrender.com/upload", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      alert("Upload successful");
      setText("");
      setTitle("");
      setImage(null);
      setImg1(null);
      setImg2(null);
      setImg3(null);
      setImg4(null);
      setPreview(null);
      setPreview1(null);
      setPreview2(null);
      setPreview3(null);
      setPreview4(null);
    }
  };

  return (
    <div className="upload-main-div">
      <h2>Upload Text and Images</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Opisi detaljno"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <input
          type="title"
          placeholder="Unesi Naslov"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input type="file" accept="image/*" onChange={(e) => handleImageChange(e, setImage, setPreview)} />
        {preview && <img src={preview} alt="Preview" width="100" />}
        <input type="file" accept="image/*" onChange={(e) => handleImageChange(e, setImg1, setPreview1)} />
        {preview1 && <img src={preview1} alt="Preview" width="100" />}
        <input type="file" accept="image/*" onChange={(e) => handleImageChange(e, setImg2, setPreview2)} />
        {preview2 && <img src={preview2} alt="Preview" width="100" />}
        <input type="file" accept="image/*" onChange={(e) => handleImageChange(e, setImg3, setPreview3)} />
        {preview3 && <img src={preview3} alt="Preview" width="100" />}
        <input type="file" accept="image/*" onChange={(e) => handleImageChange(e, setImg4, setPreview4)} />
        {preview4 && <img src={preview4} alt="Preview" width="100" />}
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

const DisplayPage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://server-emina.onrender.com/data")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  return (
    <div>
      <h2>Uploaded Data</h2>
      {data.map((item, index) => (
        <div key={index}>
          <p>{item.text}</p>
          <img src={`https://server-emina.onrender.com/uploads/${item.image}`} alt="Uploaded" width="100" />
          <img src={`https://server-emina.onrender.com/uploads/${item.img1}`} alt="Uploaded" width="100" />
          <img src={`https://server-emina.onrender.com/uploads/${item.img2}`} alt="Uploaded" width="100" />
          <img src={`https://server-emina.onrender.com/uploads/${item.img3}`} alt="Uploaded" width="100" />
          <img src={`https://server-emina.onrender.com/uploads/${item.img4}`} alt="Uploaded" width="100" />
        </div>
      ))}
    </div>
  );
};

export { UploadPage, DisplayPage };
 
 */
/* 
import React, { useState, useEffect } from "react";
import "./UploadPage.css";

// 🔴 Preporučljivo je da koristiš .env za sigurnost u vezi GitHub tokena

const REPO_OWNER = "CazimMeskovic";
const REPO_NAME = "emina1";
const FILE_PATH = "src/data.json"; // Ažurirana putanja za data.json unutar src foldera

const updateGitHubFile = async (newEntry) => {
  const url = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FILE_PATH}`;

  try {
    // 1️⃣ Učitaj trenutne podatke iz GitHub-a
    const response = await fetch(`https://raw.githubusercontent.com/${REPO_OWNER}/${REPO_NAME}/main/${FILE_PATH}`);
    let currentData = [];

    if (response.ok) {
      currentData = await response.json();
    }

    // 2️⃣ Dodaj novi unos u postojeće podatke
    currentData.push(newEntry);

    // 3️⃣ Dohvati SHA (neophodno za ažuriranje fajla na GitHub-u)
    const fileDataResponse = await fetch(url, {
      headers: { Authorization: `token ${GITHUB_TOKEN}` },
    });

    const fileData = await fileDataResponse.json();
    const sha = fileData.sha;

    // 4️⃣ Konvertuj novi sadržaj u Base64 format
    const updatedContent = JSON.stringify(currentData, null, 2);
    const encodedContent = btoa(unescape(encodeURIComponent(updatedContent))); // Base64 kodiranje

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
        sha: sha,
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
          {item.images.map((img, imgIndex) =>
            img ? <img key={imgIndex} src={img} alt="Uploaded" width="100" /> : null
          )}
        </div>
      ))}
    </div>
  );
};

export { UploadPage, DisplayPage };
 */


import React, { useState, useEffect } from "react";
import "./UploadPage.css";

   
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;
const REPO_OWNER = "CazimMeskovic";
const REPO_NAME = "emina1";
const FILE_PATH = "data.json";

const updateGitHubFile = async (newEntry) => {
  const url = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FILE_PATH}`;

  try {
    // 1️⃣ Učitaj trenutne podatke iz GitHub-a
    const response = await fetch(`https://raw.githubusercontent.com/${REPO_OWNER}/${REPO_NAME}/main/${FILE_PATH}`);
    let currentData = [];

    if (response.ok) {
      currentData = await response.json();
    }

    // 2️⃣ Dodaj novi unos u postojeće podatke
    currentData.push(newEntry);

    // 3️⃣ Dohvati SHA (neophodno za ažuriranje fajla na GitHub-u)
    const fileDataResponse = await fetch(url, {
      headers: { Authorization: `token ${GITHUB_TOKEN}` },
    });

    const fileData = await fileDataResponse.json();
    const sha = fileData.sha;

    // 4️⃣ Konvertuj novi sadržaj u Base64 format
    const updatedContent = JSON.stringify(currentData, null, 2);
    const encodedContent = btoa(unescape(encodeURIComponent(updatedContent))); // Base64 kodiranje

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
        sha: sha,
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
          {item.images.map((img, imgIndex) =>
            img ? <img key={imgIndex} src={img} alt="Uploaded" width="100" /> : null
          )}
        </div>
      ))}
    </div>
  );
};

export { UploadPage, DisplayPage };
