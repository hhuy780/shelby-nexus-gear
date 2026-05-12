"use client";

import dynamic from "next/dynamic";

// Dời cái bùa ép load trên Browser sang thằng đệ này
const WalletProvider = dynamic(() => import("@/components/WalletProvider"), {
  ssr: false,
});

export default function WalletWrapper({ children }: { children: React.ReactNode }) {
  return <WalletProvider>{children}</WalletProvider>;
}