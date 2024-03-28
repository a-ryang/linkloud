"use client";

import { useState, useEffect, useRef } from "react";
import createGlobe from "cobe";

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isGlobeInitialized, setGlobeInitialized] = useState(false);

  useEffect(() => {
    let phi = 0;
    let width = 0;

    if (!canvasRef.current) return;

    const handleResize = () => {
      canvasRef.current && (width = Math.min(canvasRef.current.offsetWidth, 640));
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 1,
      width: width,
      height: width,
      phi: 1,
      theta: 0,
      dark: 1.1,
      diffuse: 1,
      scale: 1,
      mapSamples: 6000,
      mapBrightness: 8,
      baseColor: [0.3, 0.3, 0.3],
      markerColor: [0.815, 0.904, 0.99],
      glowColor: [39 / 255, 54 / 255, 102 / 255],
      offset: [0, 0],
      markers: [],
      onRender: (state) => {
        state.phi = phi;
        phi += 0.004;
        state.width = width;
        state.height = width;
      },
    });

    setGlobeInitialized(true);

    return () => {
      if (globe) globe.destroy();
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (isGlobeInitialized && canvasRef.current) {
      canvasRef.current.style.transition = "opacity 1s ease-out";
      canvasRef.current.style.opacity = "0.8";
    }
  }, [isGlobeInitialized]);

  return (
    <section className="relative flex flex-col justify-center items-center bg-neutral-950">
      <canvas
        ref={canvasRef}
        className="mx-auto"
        style={{
          width: "100%",
          maxWidth: "640px",
          height: "auto",
          aspectRatio: "1 / 1", // 1:1 비율 유지
          opacity: 0,
          transition: "opacity 1s ease-out",
        }}
      />

      <div className="absolute z-0 flex flex-col items-center">
        <h1 className="text-white text-5xl md:text-6xl font-semibold">Linkloud</h1>
        <p className="text-white md:text-xl mt-2 md:mt-5 mb-5 md:mb-7">모두의 링크 라이브러리</p>
      </div>
    </section>
  );
}
