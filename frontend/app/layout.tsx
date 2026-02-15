import type { Metadata } from "next";
import { Geist, Geist_Mono, Joan } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Suramya - Designer Wear Rental Platform",
  description: "Discover Suramya, your premier designer wear rental platform. Explore a curated collection of high-end fashion for every occasion. Rent the latest styles and make a statement without the commitment of ownership. Experience luxury fashion at your fingertips with Suramya.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-serif antialiased text-slate-700`}
      >
        {children}
      </body>
    </html>
  );
}
