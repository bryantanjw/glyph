import { Row } from "@/components/ui/row";
import { Column } from "@/components/ui/column";
import Navbar from "@/components/navbar";
import Playground from "@/components/playgroud";
import ExampleTemplatesSection from "@/components/example-templates-section";
import CTA from "@/components/cta";

import { getSession, getSubscription, getUserDetails } from "./supabase-server";
import { ThemeProvider } from "../components/providers/theme-provider";
import Footer from "@/components/footer";
import { Balancer } from "react-wrap-balancer";

export default async function PlaygroundPage() {
  const [session, userDetails, subscription] = await Promise.all([
    getSession(),
    getUserDetails(),
    getSubscription(),
  ]);

  const user = session?.user;

  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <Navbar user={user} userDetails={userDetails} />
      <div className="max-w-7xl w-full mx-auto flex flex-col items-center">
        <Column className="w-full items-center min-h-screen">
          <Column className="items-center pt-32 pb-10 max-w-3xl lg:max-w-5xl">
            <Balancer className="text-center">
              <h1 className="text-4xl font-bold">Glyph</h1>
              <p className="text-lg text-muted-foreground mt-3">
                Create, captivate, connect. <br />
                Elevate every scan with Glyph.
              </p>
            </Balancer>

            <Row className="my-16 w-full h-[1px] bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-800 to-transparent" />
            <Column className="gap-8 w-full px-8 md:px-0">
              <Playground user={user} />
            </Column>

            <Row className="my-16 w-full h-[1px] bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-800 to-transparent" />
            <Column className="w-full items-center justify-start px-8 md:px-5 lg:px-0">
              <Column className="w-full space-y-1">
                <p className="text-xl font-semibold">Need inspiration?</p>
                <p className="text-md text-muted-foreground pb-5">
                  Try out one of the prompts below.
                </p>
              </Column>
              <ExampleTemplatesSection />
            </Column>
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
