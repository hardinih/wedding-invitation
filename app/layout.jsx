import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://wedding-invitation-nurul-wahyu.vercel.app"),

  title: "Undangan Pernikahan Nurul & Wahyu",
  description: "Undangan Pernikahan Nurul & Wahyu",

  openGraph: {
    title: "Undangan Pernikahan Nurul & Wahyu",
    description: "Undangan Pernikahan Nurul & Wahyu",
    url: "https://wedding-invitation-nurul-wahyu.vercel.app",
    siteName: "Undangan Nurul & Wahyu",
    images: [
      {
        url: "/preview.jpg",
        width: 1200,
        height: 630,
        alt: "Undangan Pernikahan Nurul & Wahyu",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
