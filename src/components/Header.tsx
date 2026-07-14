import Image from "next/image";

export default function Header() {
  return (
<header className="sticky top-0 z-50 bg-white border-b border-slate-800">
  <div className="max-w-[430px] mx-auto px-4 py-3 flex items-center justify-between">
    
    <img
      src="/logo.png"
      alt="AI Workers"
      className="ml-7 h-13"
    />

    <div className="flex items-center gap-2">
      <span className="w-2 h-2 rounded-full bg-green-500"></span>
    </div>

  </div>
</header>
  );
}