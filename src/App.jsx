/* import React, { useState, useEffect } from "react";
import Preloader from "./components/Pre";
import Navbar from "./components/Navbar";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import Projects from "./components/Projects/Projects";
import Footer from "./components/Footer";
import Resume from "./components/Resume/ResumeNew";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import "./style.css";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { UploadPage, DisplayPage } from "./components/UploadPage";
import ProjectDetails from "./components/Projects/ProjectDetails";
import PasswordPage from "./components/PasswordPage ";
import Kontakt from "./components/Kontakt";


function App() {
  const [load, upadateLoad] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      upadateLoad(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <Preloader load={load} />
      <div className="App" id={load ? "no-scroll" : "scroll"}>
        <Navbar />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/project" element={<Projects />} />
          <Route path="/about" element={<About />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="*" element={<Navigate to="/"/>} />
       
          <Route path="/prikaz" element={<DisplayPage />} />
          <Route  path="/upload" element={<UploadPage />} />
          <Route path="/project-details" element={<ProjectDetails />} />
          <Route path="/password" element={<PasswordPage />} />
          <Route path="/kontakt" element={<Kontakt />} />
        
     

        </Routes>
        <Footer className="footerDno" />
      </div>
    </Router>
  );
}

export default App;
 */

import React, { useState, useEffect } from "react";
import Preloader from "./components/Pre";
import Navbar from "./components/Navbar";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import Projects from "./components/Projects/Projects";
import Footer from "./components/Footer";
import Resume from "./components/Resume/ResumeNew";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import "./style.css";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { UploadPage, DisplayPage } from "./components/UploadPage";
import ProjectDetails from "./components/Projects/ProjectDetails";

import PasswordPage from "./components/PasswordPage ";
import Kontakt from "./components/Kontakt";

/* import { DataProvider, useData } from "./context/DataContext"; */
import { DataProvider, useData } from "./components/context/DataContext";
import { supabase } from "./supabaseClient";

function App() {
  const [load, upadateLoad] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      upadateLoad(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <DataProvider>
      <Router>
        <Preloader load={load} />
        <div className="App" id={load ? "no-scroll" : "scroll"}>
          <Navbar />
          <ScrollToTop />

          {/* Prefetch Projects */}
          <PrefetchProjects />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/project" element={<Projects />} />
            <Route path="/about" element={<About />} />
            <Route path="/resume" element={<Resume />} />
            <Route path="*" element={<Navigate to="/" />} />

            <Route path="/prikaz" element={<DisplayPage />} />
            <Route path="/upload" element={<UploadPage />} />
            <Route path="/project-details" element={<ProjectDetails />} />
            <Route path="/password" element={<PasswordPage />} />
            <Route path="/kontakt" element={<Kontakt />} />
          </Routes>

          <Footer className="footerDno" />
        </div>
      </Router>
    </DataProvider>
  );
}

export default App;

// Prefetch komponenta za Projects
function PrefetchProjects() {
  const { setProjects } = useData();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data: posts, error } = await supabase
          .from("posts")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) throw error;
        setProjects(posts);
      } catch (err) {
        console.error("Error prefetching projects:", err);
      }
    };

    fetchProjects();
  }, [setProjects]);

  return null; // ne renderuje ništa
}
