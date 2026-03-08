"use client";

import { CartProvider } from "@/context/CartContext";
import { AccountProvider } from "@/context/AccountContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { SidebarProvider } from "@/context/SidebarContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <AccountProvider>
        <WishlistProvider>
          <SidebarProvider>{children}</SidebarProvider>
        </WishlistProvider>
      </AccountProvider>
    </CartProvider>
  );
}
