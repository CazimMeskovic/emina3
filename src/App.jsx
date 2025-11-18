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

// (Prefetch handled by the robust implementation below)

// Robust prefetch: try 'projects' table first, then fallback to 'posts'.
function PrefetchProjects() {
  const { setProjects } = useData();

  useEffect(() => {
    let mounted = true;

    const tryFetch = async (table) => {
      try {
        const { data, error, status } = await supabase
          .from(table)
          .select("id, title, text, image_url, created_at")
          .order("created_at", { ascending: false })
          .limit(20);

        if (error) {
          console.warn(`Supabase returned error for table '${table}':`, error.message || error);
          return { ok: false, error, status };
        }

        return { ok: true, data };
      } catch (e) {
        console.error(`Network/error fetching from '${table}':`, e);
        return { ok: false, error: e };
      }
    };

    const fetchProjects = async () => {
      // Try the table names most likely used in this project
      /* const tablesToTry = ["projects", "posts"]; */
      const tablesToTry = ["posts"];

      for (const table of tablesToTry) {
        const res = await tryFetch(table);
        if (res.ok) {
          if (mounted) setProjects(res.data || []);
          return;
        }
      }

      // If all attempts fail, set an empty array so UI doesn't hang
      if (mounted) setProjects([]);
    };

    fetchProjects();

    return () => {
      mounted = false;
    };
  }, [setProjects]);

  return null;
}
