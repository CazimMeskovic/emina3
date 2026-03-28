import React from "react";
import {
  AiFillGithub,
  AiOutlineTwitter,
  AiFillInstagram,
} from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";

function Footer() {
  let date = new Date();
  let year = date.getFullYear();

  return (
    <footer className="bg-slate-900 text-white py-8 mt-auto">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          
          {/* Developed By */}
          <div className="text-sm font-light tracking-wider opacity-80 uppercase">
            Developed by Web Izrada Digital
          </div>

          {/* Copyright link */}
          <div>
            <a 
              href="https://webizrada.ba/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm font-light tracking-widest hover:text-slate-400 transition-colors duration-300 uppercase"
            >
              Copyright © {year} webizrada.ba
            </a>
          </div>

          {/* Socijalne mreže */}
          <div className="flex items-center space-x-6">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white text-xl hover:text-slate-400 hover:-translate-y-1 transition-all duration-300"
            >
              <AiFillGithub />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white text-xl hover:text-slate-400 hover:-translate-y-1 transition-all duration-300"
            >
              <AiOutlineTwitter />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white text-xl hover:text-slate-400 hover:-translate-y-1 transition-all duration-300"
            >
              <FaLinkedinIn />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white text-xl hover:text-slate-400 hover:-translate-y-1 transition-all duration-300"
            >
              <AiFillInstagram />
            </a>
          </div>

        </div>
      </div>
    </footer>
  );
}

export default Footer;