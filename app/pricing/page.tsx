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
    <Pricing
      session={session}
      user={session?.user}
      userDetails={userDetails}
      products={products}
      subscription={subscription}
    />
  );
}
