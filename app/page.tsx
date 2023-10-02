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
import { Badge } from "@/components/ui/badge";

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
              <div className="relative">
                <h1 className="text-4xl font-bold">Glyph</h1>
                <Badge className="absolute top-0 right-6 bg-blue-600 border-0">
                  Beta
                </Badge>
              </div>
              <p className="text-lg text-muted-foreground mt-3">
                Create, captivate, connect. <br />
                Elevate your brand with Glyph.
              </p>
            </Balancer>

            <Row className="my-16 w-full h-[1px] bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-800 to-transparent" />

            <Playground
              user={user}
              userDetails={userDetails}
              subscription={subscription}
            />

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
