import { Inter } from "next/font/google";
import "./globals.css";
import { Metadata, Viewport } from "next";
import { Toaster } from "sonner";
import Header from "@/components/ui/header";
import { SessionProvider } from "@/app/session-provider";
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
  icons: {
    icon: "/favicon.ico",
  },
};
export const viewport: Viewport = {
  themeColor: "#ffffff",
  userScalable: false,
  initialScale: 1,
  maximumScale: 1,
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${interSans.variable} antialiased`}>
        <SessionProvider>
          <Header />
          <main className="flex flex-col w-full max-w-[var(--site-width)] mx-auto">
            {children}
          </main>
          <footer className="max-w-xl hidden mx-auto p-6  flex-row items-center justify-center text-xs text-black/80">
            ©2025 GymThing. All rights reserved.
          </footer>
          <Toaster position="top-center" />
        </SessionProvider>
      </body>
    </html>
  );
}
