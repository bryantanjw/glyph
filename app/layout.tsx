import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { Toaster } from "@/components/ui/toaster";

import { TailwindIndicator } from "@/components/ui/tailwind-indicator";
import SupabaseProvider from "./supabase-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Glyph",
  description: "Generate stylistic QR codes using AI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SupabaseProvider>
          {children}
          <TailwindIndicator />
          <Toaster />
        </SupabaseProvider>
      </body>
    </html>
  );
}
