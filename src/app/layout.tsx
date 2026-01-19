import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/LenisProvider";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Marcus Tan | AI & Cybersecurity Engineer",
  description: "Portfolio of Marcus Tan Chi Yau - AI, Blockchain, and Full-Stack Developer.",
  icons: {
    icon: "/favicon-circular-v2.png",
    shortcut: "/favicon-circular-v2.png",
    apple: "/favicon-circular-v2.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${jetbrainsMono.variable} antialiased min-h-screen bg-background text-foreground font-mono`}
      >
        <LenisProvider>
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
