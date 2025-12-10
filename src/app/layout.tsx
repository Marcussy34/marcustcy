import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Marcus Tan | AI & Cybersecurity Engineer",
  description: "Portfolio of Marcus Tan Chi Yau - AI, Blockchain, and Full-Stack Developer.",
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
        {children}
      </body>
    </html>
  );
}
