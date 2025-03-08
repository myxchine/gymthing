import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { Metadata } from "next";
const interSans = Inter({
  variable: "--font-inter-sans",
  subsets: ["latin"],
});
export const metadata: Metadata = {
  title: {
    default: "GymThing",
    template: "%s - GymThing",
  },
  description: "Your very own free personal trainer.",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${interSans.variable} antialiased`}>
        <header className="max-w-xl mx-auto p-4 flex flex-row items-center justify-center">
          <Link href="/" className="font-bold tracking-[1rem] text-2xl">
            GYMTHING
          </Link>
        </header>
        <main className="flex flex-col w-full max-w-[var(--site-width)] mx-auto">
          {children}
        </main>
        <footer className="max-w-xl mx-auto p-6 flex flex-row items-center justify-center text-xs text-black/80">
          ©2025 GymThing. All rights reserved.
        </footer>
      </body>
    </html>
  );
}
