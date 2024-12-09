import type { Metadata } from "next";
import "..//styles/globals.css";
import { Geist } from "next/font/google";
import Nav from "./ui/nav";
import { AnimatePresence } from "motion/react";
import { Toaster } from "react-hot-toast";

const giest = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
  weight: ["200", "400", "300", "500", "700", "600","800"],
  adjustFontFallback: false
});

export const metadata: Metadata = {
  title: "Meal",
  description: "a recipe app",
  keywords: ["meal", "recipe", "food"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${giest.variable}  antialiased`}>
        <div className="main">
          <div className="gradient" />
        </div>
        <main className="app max-w-2xl 2xl:mx-auto">
          <Toaster/>
          <Nav />
         <AnimatePresence>
         {children}
         </AnimatePresence>
        </main>
      </body>
    </html>
  );
}
