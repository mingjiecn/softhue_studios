import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Providers } from "./Providers";
import { Sidebar } from "@/components/Sidebar";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "SoftHue Studios | Original Paintings for Sale",
  description: "SoftHue Studios - Original artwork and custom paintings. Opening sale 20% off sitewide.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen">
        <Providers>
          <Sidebar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
