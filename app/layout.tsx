import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { Toaster } from "@/components/ui/toaster";
import { Column } from "@/components/ui/column";
import { TailwindIndicator } from "@/components/ui/tailwind-indicator";

import SupabaseProvider from "../components/providers/supabase-provider";
import ProgressBarProvider from "../components/providers/progress-bar-provider";

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
        <ProgressBarProvider>
          <SupabaseProvider>
            {children}
            <TailwindIndicator />
            <Toaster />
          </SupabaseProvider>
        </ProgressBarProvider>
      </body>
    </html>
  );
}
