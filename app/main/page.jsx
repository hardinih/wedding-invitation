"use client";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import styles from "./page.module.css";
import Navbar from "./navbar";
import BackgroundMusic from "../components/BackgroundMusic";
import { collection, addDoc, serverTimestamp, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";


export default function Home() {

  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [wishes, setWishes] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);

  const audioRef = useRef(null);

  <>
  <BackgroundMusic />
  {/* konten undangan */}
</>


  // Setup audio on mount (check for auto-play)
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = 0.5; // Optional: set volume
      audio.addEventListener('ended', () => setIsPlaying(false));
      audio.addEventListener('play', () => setIsPlaying(true));
      audio.addEventListener('pause', () => setIsPlaying(false));

      // Check if music should auto-play from localStorage
      const shouldAutoPlay = localStorage.getItem('autoPlayMusic') === 'true';
      if (shouldAutoPlay) {
        localStorage.removeItem('autoPlayMusic'); // Clear the flag
        audio.play().catch(() => {
          // If autoplay fails (like on iOS), user can still use manual controls
        });
      }
    }
  }, []);


  const handleSubmitWish = async (e) => {
  e.preventDefault();

  if (!name || !message) {
    alert("Nama dan ucapan wajib diisi");
    return;
  }

  try {
    setLoading(true);

    await addDoc(collection(db, "wishes"), {
      name: name,
      message: message,
      createdAt: serverTimestamp(),
    });

    setName("");
    setMessage("");
    alert("Ucapan berhasil dikirim 🤍");
  } catch (error) {
    console.error(error);
    alert("Gagal mengirim ucapan");
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  const q = query(
    collection(db, "wishes"),
    orderBy("createdAt", "desc")
  );

  const unsubscribe = onSnapshot(q, (snapshot) => {
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setWishes(data);
  });

  return () => unsubscribe();
}, []);



  /* ================== GALLERY STATE ================== */
  const galleryImages = [
    "/gallery/1.jpg",
    "/gallery/2.jpg",
    "/gallery/3.jpg",
    "/gallery/4.jpg",
    "/gallery/5.jpg",
    "/gallery/15.jpg",
    "/gallery/16.jpg",
    "/gallery/12.jpg",
    "/gallery/13.jpg",
    "/gallery/14.jpg",
  ];

  const [activeIndex, setActiveIndex] = useState(null);
  const [touchStartX, setTouchStartX] = useState(null);
  const [showGift, setShowGift] = useState(false);
  


  /* ================== REAL VH FIX ================== */
  useEffect(() => {
    const updateRealVH = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--real-vh", `${vh}px`);
    };

    updateRealVH();
    window.addEventListener("resize", updateRealVH);
    return () => window.removeEventListener("resize", updateRealVH);
  }, []);

  return (
    <>
      <Navbar audioRef={audioRef} isPlaying={isPlaying} setIsPlaying={setIsPlaying} />

      {/* BACKGROUND GLOBAL */}
      <div className={styles.bgWrapper}>

        {/* ================= HOME ================= */}
        <section id="home" className={styles.section}>
          <div className={styles.centerContent}>
            <h1 className={styles.title}>THE WEDDING OF</h1>
            <h2 className={styles.couple}>Nurul & Wahyu</h2>

            <div className={styles.textWrapper}>
              <p className={styles.terjemah}>
                “Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan
                pasangan-pasangan untukmu dari jenismu sendiri, supaya kamu merasa
                tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang.”
              </p>
              <span className={styles.ayat}>QS. Ar-Rum: 21</span>
            </div>
          </div>
        </section>

        {/* ================= MEMPELAI ================= */}
        <section id="mempelai" className={styles.section}>
          <div className={styles.mempelaiWrapper}>
            <p className={styles.salamMempelai}>
              Assalamualaikum wr. wb.
              <br /><br />
              Dengan memohon Rahmat dan Ridho Allah SWT yang telah menciptakan
              makhluk-Nya secara berpasang-pasangan,
              <br /><br />
              Kami bermaksud menyelenggarakan pernikahan kami
            </p>

            <h2 className={styles.sectionTitle}>Mempelai</h2>

            <div className={styles.mempelaiGrid}>
              <div className={styles.mempelaiCard}>
                <Image src="/mempelai-wanita.jpg" alt="Foto mempelai wanita" className={styles.mempelaiFoto} width={160} height={160} />
                <h3 className={styles.mempelaiNama}>Eka Nurul Afifah</h3>
                <p className={styles.mempelaiDesc}>
                  Putri dari Bapak Abdul Fatah <br /> & Ibu Rochatun
                </p>
              </div>

              <div className={styles.mempelaiCard}>
                <Image src="/mempelai-pria.jpg" alt="Foto mempelai pria" className={styles.mempelaiFoto} width={160} height={160} />
                <h3 className={styles.mempelaiNama}>Wahyu Nugroho</h3>
                <p className={styles.mempelaiDesc}>
                  Putra dari Bapak Supardi <br /> & Ibu Nuryati
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ================= EVENT ================= */}
        <section id="event" className={styles.eventSection}>
          <div className={styles.eventRow}>
            <div className={styles.labelLeft}>Akad</div>
            <div className={styles.eventCard}>
              <h3>Minggu</h3>
              <div className={styles.date}>11</div>
              <p className={styles.month}>Januari 2026</p>
              <p className={styles.time}>08.00 - 10.00 WIB</p>
              <p className={styles.placeTitle}>Gedung Krida Bhakti</p>
              <p className={styles.address}>
                Jl. Veteran No.12A, Jakarta Pusat
              </p>
              <a
                href="https://maps.app.goo.gl/wBjEjzXE5qiCLd988"
                target="_blank"
                className={styles.mapButton}
              >
                📍 Open Map
              </a>
            </div>
          </div>

          <div className={styles.eventRow}>
            <div className={styles.eventCard}>
              <h3>Minggu</h3>
              <div className={styles.date}>11</div>
              <p className={styles.month}>Januari 2026</p>
              <p className={styles.time}>11.00 - 13.00</p>
              <p className={styles.placeTitle}>Gedung Krida Bhakti</p>
              <p className={styles.address}>
                Jl. Veteran No.12A, Jakarta Pusat
              </p>
              <a
                href="https://maps.app.goo.gl/wBjEjzXE5qiCLd988"
                target="_blank"
                className={styles.mapButton}
              >
                📍 Open Map
              </a>
            </div>
            <div className={styles.labelRight}>Resepsi</div>
          </div>
        </section>

        {/* ================= GALLERY ================= */}
        <section id="gallery" className={styles.gallerySection}>
          <h2 className={styles.galleryTitle}>
            Our <span>Gallery</span>
          </h2>

          <div className={styles.galleryGrid}>
            {galleryImages.map((img, i) => (
              <div
                key={i}
                className={styles.galleryItem}
                onClick={() => setActiveIndex(i)}
              >
                <Image src={img} alt={`Gallery ${i + 1}`} fill />
              </div>
            ))}
          </div>
        </section>

        {/* ================= LIGHTBOX ================= */}
        {activeIndex !== null && (
          <div
            className={styles.lightbox}
            onClick={() => setActiveIndex(null)}
            onTouchStart={(e) => setTouchStartX(e.touches[0].clientX)}
            onTouchEnd={(e) => {
              if (!touchStartX) return;
              const diff = touchStartX - e.changedTouches[0].clientX;

              if (diff > 50) {
                setActiveIndex((prev) =>
                  prev === galleryImages.length - 1 ? 0 : prev + 1
                );
              }
              if (diff < -50) {
                setActiveIndex((prev) =>
                  prev === 0 ? galleryImages.length - 1 : prev - 1
                );
              }
              setTouchStartX(null);
            }}
          >
            <Image
              src={galleryImages[activeIndex]}
              alt="Preview"
              width={800}
              height={600}
              style={{ maxWidth: '90vw', maxHeight: '80vh', objectFit: 'contain', borderRadius: '1rem' }}
              onClick={(e) => e.stopPropagation()}
            />

            <button
              className={`${styles.navBtn} ${styles.left}`}
              onClick={(e) => {
                e.stopPropagation();
                setActiveIndex((prev) =>
                  prev === 0 ? galleryImages.length - 1 : prev - 1
                );
              }}
            >
              ‹
            </button>

            <button
              className={`${styles.navBtn} ${styles.right}`}
              onClick={(e) => {
                e.stopPropagation();
                setActiveIndex((prev) =>
                  prev === galleryImages.length - 1 ? 0 : prev + 1
                );
              }}
            >
              ›
            </button>

            <button
              className={styles.closeBtn}
              onClick={(e) => {
                e.stopPropagation();
                setActiveIndex(null);
              }}
            >
              ✕
            </button>
          </div>
        )}

{/* ================= GIFT ================= */}
<section id="gift" className={styles.giftSection}>
  <div className={styles.giftWrapper}>

    <h2 className={styles.giftTitle}>Kirim Hadiah</h2>

    <p className={styles.giftDesc}>
      Doa restu Anda merupakan karunia yang sangat berarti bagi kami.
      Namun apabila memberi adalah ungkapan tanda kasih,
      Anda dapat mengirimkan hadiah secara cashless.
    </p>

    <button
      className={styles.giftToggleBtn}
      onClick={() => setShowGift((prev) => !prev)}
    >
      🎁 Kirim Amplop
    </button>

    {showGift && (
      <div className={styles.giftCardContainer}>

        {/* MANDIRI */}
        <div className={styles.giftCard}>
          <div className={styles.cardTop}>
            <div className={styles.cardChip}></div>
            <span className={styles.bankName}>Mandiri</span>
          </div>

          <div className={styles.cardMid}>
            <p className={styles.cardOwner}>Eka Nurul Afifah</p>
            <p className={styles.cardNumber}>1560 0128 19357</p>
          </div>

          <button
            className={styles.copyBtn}
            onClick={() => navigator.clipboard.writeText("1560012819357")}
          >
            📋 Salin
          </button>
        </div>

        {/* BCA */}
        <div className={styles.giftCard}>
          <div className={styles.cardTop}>
            <div className={styles.cardChip}></div>
            <span className={styles.bankName}>BCA</span>
          </div>

          <div className={styles.cardMid}>
            <p className={styles.cardOwner}>Wahyu Nugroho</p>
            <p className={styles.cardNumber}>7390 8608 59</p>
          </div>

          <button
            className={styles.copyBtn}
            onClick={() => navigator.clipboard.writeText("7390860859")}
          >
            📋 Salin
          </button>
        </div>

        {/* ALAMAT */}
        <div className={`${styles.giftCard} ${styles.addressCard}`}>
          <div className={styles.addressIcon}>🎁</div>

          <p className={styles.cardOwner}>Eka Nurul Afifah</p>
          <p className={styles.addressText}>
            Puri Harapan Blok E5 No.30, RT 08,
            RW 016, Kel. Setia Asih, Kec. Tarumajaya, 
            Kab. Bekasi, Jawa Barat
          </p>

          <button
            className={styles.copyBtn}
            onClick={() =>
              navigator.clipboard.writeText(
                "Taman Wisma Asri, Jl Durian VII, Blok C12 No.1, RT 003 RW 005, Teluk Pucung, Bekasi Utara, Kota Bekasi"
              )
            }
          >
            📋 Salin
          </button>
        </div>

      </div>
    )}
  </div>
</section>

 {/* ================= WISH ================= */}
<section id="wish" className={styles.wishSection}>
  <h2 className={styles.wishTitle}>Ucapan & Doa</h2>

  <p className={styles.wishIntro}>
    Doa dan ucapan dari keluarga serta sahabat
    merupakan kebahagiaan tersendiri bagi kami.
  </p>

  <div className={styles.wishBox}>

    {/* FORM */}
    <form className={styles.wishForm} onSubmit={handleSubmitWish}>
      <input
        type="text"
        placeholder="Nama Anda"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <textarea
        placeholder="Tuliskan ucapan & doa terbaik"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        required
      />

      <button type="submit" disabled={loading}>
        {loading ? "Mengirim..." : "Kirim Ucapan"}
      </button>
    </form>

    {/* LIST UCAPAN */}
    <div className={styles.wishList}>
      {wishes.length === 0 && (
        <p className={styles.emptyWish}>Belum ada ucapan</p>
      )}

      {wishes.map((item) => (
        <div key={item.id} className={styles.wishCard}>
          <h4>{item.name}</h4>
          <p>{item.message}</p>
        </div>
      ))}
    </div>

  </div>
</section>

      </div>

      {/* 🔊 AUDIO */}
      <audio
        ref={audioRef}
        src="/music/backsound.mp3"
        loop
        preload="metadata"
      />
    </>
  );
}
