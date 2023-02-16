"use client";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AuthenticationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ToastContainer
        limit={1}
        position="top-center"
        autoClose={1500}
        pauseOnHover
      />
      <div className="px-4 max-w-7xl mx-auto">{children}</div>
    </>
  );
}
