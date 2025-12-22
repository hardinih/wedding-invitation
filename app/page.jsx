"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  // ===== LEAVING STATE =====
  const [isLeaving, setIsLeaving] = useState(false);

const handleOpenInvitation = () => {
  setIsLeaving(true);

  // Set flag to auto-play music when entering main page
  localStorage.setItem('autoPlayMusic', 'true');

  setTimeout(() => {
    router.push("/main");
  }, 500);
};



  // ===== GUEST NAME =====
  const [guestName, setGuestName] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const name = params.get("to");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (name) setGuestName(decodeURIComponent(name));
  }, []);

  // ===== REAL VH FIX =====
  useEffect(() => {
    const updateRealVH = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--real-vh", `${vh}px`);
    };

    updateRealVH();
    window.addEventListener("resize", updateRealVH);
    return () => window.removeEventListener("resize", updateRealVH);
  }, []);

  // ===== COUNTDOWN =====
  const weddingDate = new Date("2026-01-11T00:00:00").getTime();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = weddingDate - now;

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        ),
        minutes: Math.floor(
          (distance % (1000 * 60 * 60)) / (1000 * 60)
        ),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });

      if (distance <= 0) clearInterval(interval);
    }, 1000);

    return () => clearInterval(interval);
  }, [weddingDate]);

  return (
    <div
      className={`${styles.container} ${
        isLeaving ? styles.fadeOut : ""
      }`}
    >
      {/* 🔊 AUDIO REMOVED - moved to main page */}

      <h1 className={styles.title}>
        the wedding
        <br />
        of
        <br />
      </h1>

      <h2 className={styles.subtitle}>Nurul & Wahyu</h2>

      {guestName && (
        <p className={styles.guestName}>
          Kepada YTH, Bapak/Ibu
          <br />
          {guestName}
          <br />
        </p>
      )}

      <div className={styles.countdownWrapper}>
        <div className={styles.timeBox}>
          <span>{timeLeft.days}</span>
          <small>Days</small>
        </div>
        <div className={styles.timeBox}>
          <span>{timeLeft.hours}</span>
          <small>Hours</small>
        </div>
        <div className={styles.timeBox}>
          <span>{timeLeft.minutes}</span>
          <small>Minutes</small>
        </div>
        <div className={styles.timeBox}>
          <span>{timeLeft.seconds}</span>
          <small>Seconds</small>
        </div>
      </div>

      <div className={styles.buttonWrapper}>
        <button
          className={styles.button}
          onClick={handleOpenInvitation}
        >
          <Image src="/wayang.png" alt="Icon" className={styles.leftIcon} width={28} height={28} />
          Buka Undangan
          <Image src="/wayang.png" alt="Icon" className={styles.rightIcon} width={28} height={28} />
        </button>
      </div>
    </div>
  );
}
