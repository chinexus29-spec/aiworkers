import "./globals.css";
import AuthGuard from "@/components/AuthGuard";

import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="max-w-md mx-auto min-h-screen bg-white shadow-lg">
          <Header />

          
    <main className="pb-24">
            {children}
          </main>

          <BottomNav />
        </div>
      </body>
    </html>
  );
}