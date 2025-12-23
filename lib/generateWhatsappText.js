export function generateWhatsappText(namaTamu) {
  const encodedName = encodeURIComponent(namaTamu);

  const link =
    `https://wedding-invitation-nurul-wahyu.vercel.app/?to=${encodedName}`;

  const text = `
Kepada Yth.
Bapak/Ibu/Saudara/i
*${namaTamu}*

────────────────────

بِسْمِ اللَّهِ الرَّحْمٰنِ الرَّحِيْمِ

Assalamualaikum
Warahmatullahi Wabarakatuh

Tanpa mengurangi rasa hormat, perkenankan kami
mengundang Bapak/Ibu/Saudara/i untuk menghadiri
acara pernikahan kami.

Berikut link undangan kami:

${link}

Merupakan suatu kebahagiaan bagi kami
apabila Bapak/Ibu/Saudara/i berkenan hadir
dan memberikan doa restu.

Hormat kami,
Nurul & Wahyu
`;

  return encodeURIComponent(text.trim());
}
