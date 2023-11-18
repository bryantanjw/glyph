import { ThemeProvider } from "../components/providers/theme-provider";
import { Balancer } from "react-wrap-balancer";

import { Row } from "@/components/ui/row";
import { Column } from "@/components/ui/column";
import Navbar from "@/components/navbar";
import CTA from "@/components/cta";
import Footer from "@/components/footer";
import FAQ from "@/components/faq";

import { formatCount } from "@/lib/utils";

export default async function HomeLayout({ children, ...data }) {
  const { user, userDetails, generationCount } = data;
  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <Navbar user={user} userDetails={userDetails} />
      <div className="max-w-7xl w-full mx-auto flex flex-col items-center">
        <Column className="w-full items-center min-h-screen">
          <Column className="items-center pt-32 pb-10 max-w-3xl lg:max-w-5xl xl:max-w-6xl">
            <Balancer className="text-center tracking-wide">
              <div className="relative">
                <h1 className="text-4xl font-bold">Glyph</h1>
              </div>
              <p className="text-lg text-muted-foreground mt-3">
                Create, captivate, connect. Elevate your brand with Glyph.
              </p>
            </Balancer>
            <div className="thirteen relative mt-3 px-4 py-1.5 text-sm font-light tracking-wide">
              {formatCount(generationCount)} photos generated and counting!
            </div>

            <Row className="my-16 w-full h-[1px] bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-800 to-transparent" />

            {children}

            <Row className="my-16 w-full h-[1px] bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-800 to-transparent" />
            <FAQ />
            <Row className="my-16 w-full h-[1px] bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-800 to-transparent" />
            <CTA />
            <Row className="my-16 w-full h-[1px] bg-transparent" />
          </Column>
        </Column>
      </div>
      <Footer />
    </ThemeProvider>
  );
}
