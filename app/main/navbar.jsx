"use client";

import { useEffect, useState } from "react";
import styles from "./navbar.module.css";

export default function Navbar({ audioRef, isPlaying, setIsPlaying }) {
  const [active, setActive] = useState("home");

  // SCROLL MANUAL (TANPA HASH / HISTORY)
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (audio) {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        audio.play().catch(() => {});
        setIsPlaying(true);
      }
    }
  };

  useEffect(() => {
    const sections = document.querySelectorAll("section");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      {
        threshold: 0.6,
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <nav className={styles.navbar}>
      <button
        onClick={() => scrollTo("home")}
        className={active === "home" ? styles.active : ""}
        aria-label="Home"
      >
        🏠
      </button>

      <button
        onClick={() => scrollTo("mempelai")}
        className={active === "mempelai" ? styles.active : ""}
        aria-label="Mempelai"
      >
        👰🤵
      </button>

      <button
        onClick={() => scrollTo("event")}
        className={active === "event" ? styles.active : ""}
        aria-label="Event"
      >
        📅
      </button>

      <button
        onClick={() => scrollTo("gallery")}
        className={active === "gallery" ? styles.active : ""}
        aria-label="Gallery"
      >
        🖼️
      </button>

      <button
        onClick={() => scrollTo("gift")}
        className={active === "gift" ? styles.active : ""}
        aria-label="Gift"
      >
        🎁
      </button>

      <button
        onClick={() => scrollTo("wish")}
        className={active === "wish" ? styles.active : ""}
        aria-label="Wish"
      >
        💬
      </button>

      <button
        onClick={toggleMusic}
        className={isPlaying ? styles.musicActive : ""}
        aria-label="Toggle Music"
      >
        {isPlaying ? "🔊" : "🔇"}
      </button>
    </nav>
  );
}
