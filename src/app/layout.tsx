import { Inter } from "next/font/google";
import "./globals.css";
import { Metadata } from "next";
import { Toaster } from "sonner";
import Header from "@/components/ui/header";
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
        <Header />
        <main className="flex flex-col w-full max-w-[var(--site-width)] mx-auto">
          {children}
        </main>
        <footer className="max-w-xl mx-auto p-6 flex flex-row items-center justify-center text-xs text-black/80">
          ©2025 GymThing. All rights reserved.
        </footer>
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
