"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();
  
  // Define paths where Navbar and Footer should be HIDDEN
  const authPaths = ["/register", "/login", "/admin-login"];
  const isAuthPage = authPaths.includes(pathname);

  return (
    <>
      {!isAuthPage && <Navbar />}
      <main className={!isAuthPage ? "min-h-screen" : ""}>
        {children}
      </main>
      {!isAuthPage && <Footer />}
    </>
  );
}
