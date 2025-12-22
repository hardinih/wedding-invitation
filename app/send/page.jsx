"use client";
import { useState } from "react";
import { generateWhatsappText } from "@/lib/generateWhatsappText";

export default function Page() {
  const [nama, setNama] = useState("");

  const handleSendWA = () => {
    if (!nama.trim()) {
      alert("Nama tamu wajib diisi");
      return;
    }

    const message = generateWhatsappText(nama);
    window.open(`https://wa.me/?text=${message}`, "_blank");
  };

  return (
    <div style={{ padding: "4vh 5vw" }}>
      <h2>Kirim Undangan WhatsApp</h2>

      <input
        value={nama}
        onChange={(e) => setNama(e.target.value)}
        placeholder="Nama Tamu"
      />

      <button onClick={handleSendWA}>
        Kirim via WhatsApp
      </button>
    </div>
  );
}
