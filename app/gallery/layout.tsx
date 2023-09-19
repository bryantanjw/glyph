import "./../globals.css";
import clsx from "clsx";
import { ThemeProvider } from "@/components/providers/theme-provider";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import CategoryLinks from "./components/category-links";

import { getSession } from "../supabase-server";
import { Balancer } from "react-wrap-balancer";

export default async function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  const user = session?.user;

  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <Navbar user={user} />
      <div
        className={clsx(
          "bg-neutral-one text-neutral-ten dark:bg-neutral-ten dark:text-neutral-one"
        )}
      >
        <section
          className={clsx(
            "px-12 py-20",
            "md:px-32 md:py-32",
            "max-w-7xl w-full mx-auto flex flex-col flex-grow"
          )}
        >
          <header className="flex flex-col justify-between lg:flex-row lg:items-end">
            <div>
              <h1 className={"text-3xl font-semibold"}>Image Gallery</h1>
              <p className="mt-3 max-w-2xl text-sm md:mt-4">
                <Balancer>
                  A curated collection of visual artistry. Of crafted chaos,
                  harmonized hues. Where shapes take the norm, colors break the
                  clues, and every image is a tale told true.
                </Balancer>
              </p>
            </div>
            <CategoryLinks />
          </header>

          {children}
        </section>
        <Footer />
      </div>
    </ThemeProvider>
  );
}
