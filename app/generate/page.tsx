import { Metadata } from "next";

import PlaygroundPage from "./components";

export const metadata: Metadata = {
  title: "Glyph",
  description: "Create Stylish AI-Generated QR Codes.",
};

export default function Page() {
  return <PlaygroundPage />;
}
