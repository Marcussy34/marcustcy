import type { Metadata } from "next";
import { Source_Serif_4, Inter } from "next/font/google";
import "./globals.css";

// Clean sans-serif for body text (like Medium's sohne)
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

// Elegant serif for headings (closer to Medium's charter/georgia style)
const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Marcus T. | Software Engineer",
  description:
    "Full Stack Developer, AI Engineer, and Web3 Enthusiast. Building useful applications with AI-powered tools and decentralized apps.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${sourceSerif.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
