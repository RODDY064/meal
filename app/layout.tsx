import type { Metadata } from "next";
import "..//styles/globals.css";
import Nav from "./ui/nav";
import { AnimatePresence } from "motion/react";
import { Toaster } from "react-hot-toast";
import localFont from 'next/font/local'
import ActionModal from "./ui/recipe-modals/action-modal";


const giest = localFont({
 variable: "--font-geist",
  src:[
    {
      path:"./fonts/Geist-Black.otf",
      weight: "900",
      style: "normal"
    },
    {
      path:"./fonts/Geist-ExtraBold.otf",
      weight: "800",
      style: "normal"
    },
   {
    path:"./fonts/Geist-Bold.otf",
    weight: "700",
    style: "normal"

   },
   {
    path:"./fonts/Geist-Medium.otf",
    weight: "500",
    style: "normal"
   },
   {
    path:"./fonts/Geist-Regular.otf",
    weight: "400",
    style: "normal"
   },
   {
    path:"./fonts/Geist-Light.otf",
    weight: "300",
    style: "normal"
   }
  ]
})


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
        <main className="app">
          <Toaster/>
          <Nav />
          <ActionModal/>
         {children}
        </main>
      </body>
    </html>
  );
}
