import type { Metadata } from "next";
import { Space_Grotesk, Orbitron } from "next/font/google";
import "./globals.css";
import ClientLayout from "@/components/ClientLayout";
import { RequirementsProvider } from "@/context/RequirementsContext";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "20 Minutes Till Dawn - AP Project",
  description:
    "Advanced Programming Course Project - A Java implementation of 20 Minutes Till Dawn",
  keywords: [
    "Java",
    "Game Development",
    "20 Minutes Till Dawn",
    "Programming Project",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${spaceGrotesk.variable} ${orbitron.variable} bg-black text-white antialiased overflow-x-hidden`}
      >
        <RequirementsProvider>
          <ClientLayout>{children}</ClientLayout>
        </RequirementsProvider>
      </body>
    </html>
  );
}
