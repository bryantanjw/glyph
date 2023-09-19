import Footer from "@/components/footer";
import Pricing from "./components/pricing";
import {
  getSession,
  getSubscription,
  getActiveProductsWithPrices,
  getUserDetails,
} from "@/app/supabase-server";

export default async function PricingPage() {
  const [session, userDetails, products, subscription] = await Promise.all([
    getSession(),
    getUserDetails(),
    getActiveProductsWithPrices(),
    getSubscription(),
  ]);

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <Pricing
          session={session}
          user={session?.user}
          userDetails={userDetails}
          products={products}
          subscription={subscription}
        />
      </main>
      <Footer />
    </div>
  );
}
