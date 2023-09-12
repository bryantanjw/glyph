import { Session } from "@supabase/supabase-js";
import { getSession } from "../supabase-server";

import { Navbar } from "@/components/navbar";
import Gallery from "./components/Gallery";

export default async function GalleryPage() {
  const session: Session = await getSession();

  return (
    <div className="py-8 lg:py-24 px-8">
      <Navbar user={session?.user} />

      <Gallery />
    </div>
  );
}
