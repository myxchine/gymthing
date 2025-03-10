import { Inter } from "next/font/google";
import "./globals.css";
import { Metadata, Viewport } from "next";
import { Toaster } from "sonner";
import Header from "@/components/ui/header";
import { SessionProvider } from "@/app/session-provider";
import Nav from "@/components/ui/header/nav";
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
          <div className="w-full hidden md:hidden p-4 pt-2" id="mobile-nav">
            <Nav className="flex flex-col gap-3 p-8 py-6 items-center justify-center px-4  mx-auto bg-black/5 rounded-2xl w-full" />
          </div>
          <main
            className="flex flex-col w-full max-w-[var(--site-width)] mx-auto"
            id="site-main"
          >
            {children}
          </main>

          <Toaster position="top-center" />
        </SessionProvider>
      </body>
    </html>
  );
}
