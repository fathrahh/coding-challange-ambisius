import Tabs from "@/components/Tabs";
import "./globals.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";

import "react-toastify/dist/ReactToastify.css";

const inter = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Ambisius",
  description:
    "Our application have a cool features like order, payment, list of food with seamless integration and also have a cool UI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="max-w-screen lg:max-w-screen-md mx-auto mt-20 min-h-[450px] flex flex-col px-2 lg:px-0">
          <Tabs />
          <main className="w-full bg-gray-100 p-4 mt-4 rounded-sm flex-1">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
