"use client";

import { useState } from "react";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Stage } from "@react-three/drei";
import { uploadAssetToShelby } from "@/services/uploader/shelbyClient";
import { UploadCloud, Rocket, Link as LinkIcon, Image as ImageIcon, Box, LogOut } from "lucide-react";

// Component render 3D
function ModelPreview({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} />;
}

export default function NexusDashboard() {
  // Đã lôi thêm hàm disconnect ra đây
  const { account, connect, disconnect, wallets } = useWallet();
  const [assetUrl, setAssetUrl] = useState<string | null>(null);
  const [assetType, setAssetType] = useState<"3d" | "image" | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !account) return;

    // Phân loại tệp
    const fileName = file.name.toLowerCase();
    const is3D = fileName.endsWith('.glb') || fileName.endsWith('.gltf');
    const isImage = fileName.endsWith('.png') || fileName.endsWith('.jpg') || fileName.endsWith('.jpeg') || fileName.endsWith('.webp');

    if (!is3D && !isImage) {
      alert("Chỉ hỗ trợ định dạng 3D (.glb, .gltf) hoặc Ảnh (.png, .jpg, .webp)!");
      return; 
    }

    setIsUploading(true);
    try {
      setAssetType(is3D ? "3d" : "image");

      // Kiểm tra API Key từ biến môi trường
      const apiKey = process.env.NEXT_PUBLIC_SHELBY_API_KEY || "";
      if (!apiKey || apiKey.includes("điền_vào_đây")) {
        alert("Ê, chưa cắm API Key thật vào file .env.local kìa!");
        setIsUploading(false);
        return;
      }

      // Đẩy lên ShelbyNet
      console.log("Đang kích hoạt Wallet để ký giao dịch tải lên Shelby...");
      const url = await uploadAssetToShelby(file, account, apiKey);
      
      // Thành công thì gán URL thật từ mạng lưới vào
      setAssetUrl(url);
      
    } catch (err: any) {
      console.error("Lỗi quá trình upload:", err);
      alert("Upload thất bại: " + (err.message || "Bật F12 lên xem lỗi chi tiết nhé."));
    } finally {
      setIsUploading(false);
    }
  };

  return (
    // Nền gradient Deep Space
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 text-white font-sans selection:bg-cyan-500/30">
      
      {/* Header phong cách Minimalist */}
      <header className="px-10 py-6 border-b border-white/10 bg-slate-900/50 backdrop-blur-md flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <Rocket className="text-cyan-400 w-8 h-8" />
          <h1 className="text-2xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-500 drop-shadow-[0_0_10px_rgba(6,182,212,0.3)]">
            SHELBY NEXUS
          </h1>
        </div>
        
        {!account ? (
          <button 
            onClick={() => connect(wallets[0].name)}
            className="group relative px-6 py-2.5 font-bold rounded-lg bg-cyan-600 hover:bg-cyan-500 transition-all duration-300 shadow-[0_0_15px_rgba(6,182,212,0.4)] hover:shadow-[0_0_25px_rgba(6,182,212,0.6)]"
          >
            <span className="relative z-10 flex items-center gap-2">
              Connect Petra Wallet
            </span>
          </button>
        ) : (
          <button 
            onClick={() => disconnect()}
            className="group flex items-center gap-3 bg-slate-800/80 px-4 py-2 rounded-lg border border-cyan-500/30 shadow-[0_0_10px_rgba(6,182,212,0.1)] hover:bg-red-900/40 hover:border-red-500/50 hover:shadow-[0_0_15px_rgba(239,68,68,0.3)] transition-all cursor-pointer"
            title="Ngắt kết nối ví"
          >
            {/* Chấm tròn đổi màu */}
            <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse group-hover:bg-red-400 group-hover:animate-none"></div>
            
            {/* Địa chỉ ví - Ẩn đi khi hover */}
            <p className="text-sm text-cyan-100 font-mono tracking-wide block group-hover:hidden">
              {String(account.address).slice(0, 6)}...{String(account.address).slice(-4)}
            </p>
            
            {/* Chữ Disconnect - Hiện ra khi hover */}
            <p className="text-sm text-red-400 font-bold tracking-wide hidden group-hover:block">
              Disconnect
            </p>

            <LogOut className="w-4 h-4 text-cyan-400 group-hover:text-red-400" />
          </button>
        )}
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-10 mt-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Cột trái: Khung Upload */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="bg-slate-900/40 backdrop-blur-xl p-8 rounded-2xl border border-white/5 shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50"></div>
              
              <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
                <UploadCloud className="text-cyan-400 w-5 h-5" />
                Upload Asset
              </h2>
              <p className="text-slate-400 text-sm mb-8 leading-relaxed">
                Hệ thống hỗ trợ tự động nhận diện tài nguyên 3D Model (.glb, .gltf) và 2D Sprite (.png, .jpg, .webp).
              </p>
              
              <div className="relative">
                <input 
                  type="file" 
                  accept=".glb,.gltf,.png,.jpg,.jpeg,.webp"
                  onChange={handleUpload}
                  disabled={!account || isUploading}
                  className="block w-full text-sm text-slate-400 file:mr-4 file:py-3 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-bold file:bg-cyan-950 file:text-cyan-400 hover:file:bg-cyan-900 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed border border-dashed border-slate-700 p-2 rounded-xl focus:outline-none focus:border-cyan-500"
                />
              </div>

              {isUploading && (
                <div className="mt-6 p-4 rounded-xl bg-cyan-950/50 border border-cyan-500/20 flex items-center gap-3">
                  <div className="w-5 h-5 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-cyan-300 text-sm font-medium animate-pulse">
                    Đang truyền tải lên ShelbyNet... Đợi Wallet nhé.
                  </p>
                </div>
              )}
            </div>

            {/* Thông số ảo */}
            <div className="bg-slate-900/40 backdrop-blur-xl p-6 rounded-2xl border border-white/5 shadow-2xl flex justify-between items-center">
              <div>
                <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">Network Status</p>
                <p className="text-cyan-400 font-mono text-lg">ONLINE</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">Latency</p>
                <p className="text-green-400 font-mono text-lg">&lt; 150ms</p>
              </div>
            </div>
          </div>

          {/* Cột phải: Khung Preview */}
          <div className="lg:col-span-8 bg-black/40 backdrop-blur-sm rounded-2xl border border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.5)] h-[600px] flex items-center justify-center relative overflow-hidden">
            
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

            {!assetUrl ? (
              <div className="text-center z-10 flex flex-col items-center opacity-50">
                <Box className="w-16 h-16 text-slate-600 mb-4" />
                <p className="text-slate-400 font-medium tracking-wide">Waiting for data stream...</p>
              </div>
            ) : assetType === "3d" ? (
               <Canvas shadows camera={{ position: [0, 2, 5], fov: 50 }} className="z-10">
                  <Stage environment="city" intensity={0.8}>
                    <ModelPreview url={assetUrl} />
                  </Stage>
                  <OrbitControls autoRotate autoRotateSpeed={2.5} />
               </Canvas>
            ) : (
               <img src={assetUrl} alt="Uploaded 2D Asset" className="max-w-full max-h-full p-4 object-contain rounded-lg z-10 relative shadow-2xl" />
            )}

            {assetUrl && (
              <div className="absolute bottom-6 left-6 right-6 bg-slate-900/80 backdrop-blur-md p-4 rounded-xl border border-cyan-500/30 z-20 shadow-xl flex items-start gap-4 transform transition-all">
                <div className="bg-cyan-950 p-2 rounded-lg">
                  {assetType === "3d" ? <Box className="text-cyan-400 w-6 h-6" /> : <ImageIcon className="text-cyan-400 w-6 h-6" />}
                </div>
                <div className="flex-1 overflow-hidden">
                  <span className="text-cyan-400 font-bold text-xs uppercase tracking-widest mb-1 flex items-center gap-2">
                    Sub-second Stream URL
                  </span>
                  <a href={assetUrl} target="_blank" className="text-slate-300 text-sm hover:text-white transition-colors truncate block hover:underline font-mono">
                    {assetUrl}
                  </a>
                </div>
                <div className="bg-green-500/20 text-green-400 px-3 py-1 rounded-md text-xs font-bold border border-green-500/20 flex items-center gap-1 h-fit">
                  <LinkIcon className="w-3 h-3" /> Deployed
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}