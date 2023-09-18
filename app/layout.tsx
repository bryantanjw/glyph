import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { Toaster } from "@/components/ui/toaster";
import { Column } from "@/components/ui/column";
import { TailwindIndicator } from "@/components/ui/tailwind-indicator";

import SupabaseProvider from "./providers/supabase-provider";
import ProgressBarProvider from "./providers/progress-bar-provider";

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
            <Column className="w-full items-center min-h-screen">
              <div className="max-w-7xl w-full mx-auto flex-1 flex flex-col items-center">
                {children}
              </div>
            </Column>
            <TailwindIndicator />
            <Toaster />
          </SupabaseProvider>
        </ProgressBarProvider>
      </body>
    </html>
  );
}
