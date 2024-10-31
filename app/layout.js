
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/Navbar"
import SessionWrapper from "@/components/SessionWrapper";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });
export const metadata = {
  title: "Quick Messages",
  description: "Send Quick Messages",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionWrapper>

        <div className="min-h-[97vh] md:min-h-[96vh]">
        <Navbar/>
        {children}

        <Toaster/>
        </div>

        <Footer/>
        </SessionWrapper>
      </body>
    </html>
  );
}
