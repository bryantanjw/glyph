import { Session } from "@supabase/supabase-js";
import { getSession, getUserDetails } from "../supabase-server";

import Navbar from "@/components/navbar";
import Gallery from "./components/Gallery";
import Footer from "@/components/footer";

export default async function GalleryPage() {
  const [session, userDetails] = await Promise.all([
    getSession(),
    getUserDetails(),
  ]);

  return (
    <div className="py-8 lg:py-24 px-8">
      <Navbar user={session?.user} userDetails={userDetails} />

      <Gallery />
      <Footer />
    </div>
  );
}
