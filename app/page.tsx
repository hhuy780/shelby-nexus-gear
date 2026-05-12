"use client"; // Đóng dấu kiểm duyệt cho Browser ở ngay dòng số 1

import dynamic from "next/dynamic";

// Ém bùa: Gọi cái Dashboard ra nhưng CẤM TUYỆT ĐỐI không cho Server đụng vào
const Dashboard = dynamic(() => import("@/components/NexusDashboard"), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center text-blue-400 font-bold text-xl">
      Loading Web3 Engine...
    </div>
  ),
});

export default function Home() {
  return <Dashboard />;
}