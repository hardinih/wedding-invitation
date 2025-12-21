"use client";
import { useRef } from "react";
import "./globals.css";

export default function RootLayout({ children }) {
  const audioRef = useRef(null);

  return (
    <html lang="id">
      <body>
        <audio
          ref={audioRef}
          id="bg-music"
          src="/music/backsound.mp3"
          loop
          preload="auto"
        />
        {children}
      </body>
    </html>
  );
}
