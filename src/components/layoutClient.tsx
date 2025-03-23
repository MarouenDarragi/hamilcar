"use client";

import { usePathname } from "next/navigation";
import MenuOne from "@/components/Header/Menu/MenuOne";

import Footer from "@/components/Footer/Footer";
import ChatBubble from '@/components/ChatBubble/ChatBubble'
import 'animate.css'
export default function LayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/admin"); // Cache menu et footer sur /admin et sous-routes

  return (
    <>
      {!isAdminRoute && (
      
          <MenuOne />
      )}
      <main>{children}</main>
      {!isAdminRoute && (
      
      <ChatBubble />
  )}
      
      {!isAdminRoute && <Footer />}
    </>
  );
}
