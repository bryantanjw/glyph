import "./globals.css";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { GeistSans, GeistMono } from "geist/font";

import { Toaster } from "@/components/ui/toaster";
import { TailwindIndicator } from "@/components/ui/tailwind-indicator";

import SupabaseProvider from "../components/providers/supabase-provider";
import ProgressBarProvider from "../components/providers/progress-bar-provider";

export const metadata: Metadata = {
  title: "Glyph",
  description: "Generate beautiful QR and illusion art with one click.",
  metadataBase: new URL("https://glyph.so"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body>
        <ProgressBarProvider>
          <SupabaseProvider>
            {children}
            <Analytics />
            <TailwindIndicator />
            <Toaster />
          </SupabaseProvider>
        </ProgressBarProvider>
      </body>
    </html>
  );
}
