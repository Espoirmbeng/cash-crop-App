import { DM_Sans, DM_Serif_Display } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
});

export const metadata = {
  title: "AgriculNet | Agricultural Trade Platform",
  description: "AgriculNet connects Cameroonian farms with local and international markets.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} ${dmSerif.variable} min-h-screen bg-[#F9FAFB] font-sans text-[#111827] antialiased`}>
        {children}
      </body>
    </html>
  );
}
