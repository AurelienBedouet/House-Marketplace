"use client";

import Navbar from "@/components/shared/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
      <body className="bg-slate-100 ">
        <ToastContainer
          limit={1}
          position="top-center"
          autoClose={1500}
          pauseOnHover
        />
        <main className="flex items-center h-[calc(100vh-133px)] mx-auto w-full px-4 max-w-md">
          {children}
        </main>
        <Navbar />
      </body>
    </html>
  );
}
