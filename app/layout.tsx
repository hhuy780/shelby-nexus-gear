import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import WalletWrapper from "@/components/WalletWrapper"; // Gọi thằng đệ trung gian ra

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Shelby Nexus Gear",
  description: "Decentralized Gaming CDN on Aptos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <WalletWrapper>{children}</WalletWrapper>
      </body>
    </html>
  );
}