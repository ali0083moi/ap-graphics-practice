import localFont from "next/font/local";
import { Inter } from "next/font/google";

// Fallback font
export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

// Load local fonts with relative paths from public directory
export const lanternFont = localFont({
  src: [
    {
      path: "../../public/fonts/ChevyRay - Lantern.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-lantern",
  display: "swap",
});

export const expressFont = localFont({
  src: [
    {
      path: "../../public/fonts/ChevyRay - Express.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-express",
  display: "swap",
});
