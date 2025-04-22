import type { Metadata } from "next";
import "./globals.css";
import "./fonts.css"; // Import the font CSS
import ClientLayout from "@/components/ClientLayout";
import { RequirementsProvider } from "@/context/RequirementsContext";
import { lanternFont, expressFont, inter } from "./fonts";

export const metadata: Metadata = {
  title: "20 Minutes Till Dawn - AP Graphic Practice",
  description:
    "Advanced Programming Course Practice - A Java implementation of 20 Minutes Till Dawn",
  keywords: [
    "Java",
    "Game Development",
    "20 Minutes Till Dawn",
    "Programming Practice",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <style>{`
          /* Ensure fonts are properly loaded */
          @font-face {
            font-family: 'Lantern';
            src: url('/fonts/ChevyRay - Lantern.ttf') format('truetype');
            font-display: swap;
          }
          
          @font-face {
            font-family: 'Express';
            src: url('/fonts/ChevyRay - Express.ttf') format('truetype');
            font-display: swap;
          }
        `}</style>
      </head>
      <body
        className={`${inter.variable} ${lanternFont.variable} ${expressFont.variable} bg-black text-white antialiased overflow-x-hidden`}
      >
        <RequirementsProvider>
          <ClientLayout>{children}</ClientLayout>
        </RequirementsProvider>
      </body>
    </html>
  );
}
