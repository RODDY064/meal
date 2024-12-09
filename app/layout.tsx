import type { Metadata } from "next";
import "..//styles/globals.css";
import {  Geist } from 'next/font/google'



const  giest = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
  weight:["200","400",'300',"500","700","600"],
 
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
      <body
        className={`${giest.variable}  antialiased`}>
        {children}
      </body>
    </html>
  );
}
