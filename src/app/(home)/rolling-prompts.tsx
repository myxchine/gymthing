"use client";

import { useState, useEffect, useRef } from "react";

export default function RollingPrompts({
  texts,
  interval = 3000,
}: {
  texts: string[];
  interval?: number;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(false); // Start faded out
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      setTimeout(() => {
        setFade(true); // Fade in on initial load
        firstRender.current = false;
      }, 100); // Small delay to allow initial render
    }

    const timer = setInterval(() => {
      setFade(false); // Fade out

      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length);
        setFade(true); // Fade in
      }, 1000); 
    }, interval);

    return () => clearInterval(timer);
  }, [texts, interval]);

  return (
    <div
      className="px-4 py-2 border-2 rounded-full mt-2"
      style={{
        transition: "opacity 1s ease-in-out",
        opacity: fade ? 1 : 0,
      }}
    >
      <span
        className="font-semibold tracking-tighter"
        style={{
          transition: "opacity 1s ease-in-out",
          opacity: fade ? 1 : 0,
        }}
      >
        {texts[currentIndex]}
      </span>
    </div>
  );
}
