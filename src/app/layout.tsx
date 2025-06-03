import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";


const outfit = Outfit({subsets: ["latin"], variable: "--font-outfit"});

export const metadata: Metadata = {
  title: "Zadd Study Guide",
  description: "A compreensive, creator tool to enhance retensive learning and study.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
         <html lang="en">
            <body
              className={`${outfit.variable}  antialiased`}
            >
              {children}
            </body>
          </html>
    </ClerkProvider>
   
  );
}
