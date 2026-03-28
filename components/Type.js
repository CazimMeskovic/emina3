"use client"; // 👈 Obavezno jer Typewriter koristi JavaScript tajmere u browseru

import React from "react";
import Typewriter from "typewriter-effect";

export default function Type() {
  return (
    <Typewriter
      options={{
        strings: [
          "Šivenje po mjeri",
          "Unikatne kreacije",
          "Prepravke i popravke",
          "Svečane haljine",
        ],
        autoStart: true,
        loop: true,
        deleteSpeed: 50,
        delay: 70,
        wrapperClassName: "text-slate-700 font-light italic", // 🧵 Tvoja luksuzna estetika
        cursorClassName: "text-slate-400",
      }}
    />
  );
}