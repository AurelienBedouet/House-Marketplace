import Navbar from "@/components/global/Navbar";
import "./globals.css";
import Footer from "@/components/global/Footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body className="bg-slate-100 text-slate-800">
        <Navbar />
        <div className="relative w-full min-h-[calc(100vh-120px)] py-32">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
