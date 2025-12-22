export function generateWhatsappText(namaTamu) {
  const encodedName = encodeURIComponent(namaTamu);

  const link = `https://wedding-invitation.vercel.app/nurul-wahyu?to=${encodedName}`;

  const text = `
Kepada Yth.
Bapak/Ibu/Saudara/i
*${namaTamu}*

────────────────────

بِسْمِ اللَّهِ الرَّحْمٰنِ الرَّحِيْمِ

Assalamualaikum
Warahmatullahi Wabarakatuh

Tanpa mengurangi rasa hormat, perkenankan kami
mengundang Bapak/Ibu/Saudara/i, teman sekaligus
sahabat, untuk menghadiri acara pernikahan kami.

Berikut link undangan kami,
untuk info lengkap dari acara,
bisa kunjungi :

${link}

Merupakan suatu kebahagiaan
bagi kami apabila Bapak/Ibu/Saudara/i
berkenan untuk hadir dan memberikan doa restu.

Wassalamualaikum
Warahmatullahi Wabarakatuh

Terima Kasih

Hormat kami,
Nurul & Wahyu
`;

  return encodeURIComponent(text.trim());
}
