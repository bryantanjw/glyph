import { Separator } from "@/components/ui/separator";
import BillingForm from "./billing-form";
import {
  getSession,
  getSubscription,
  getUserDetails,
} from "@/app/supabase-server";

export default async function SettingsBillingPage() {
  const [session, userDetails, subscription] = await Promise.all([
    getSession(),
    getUserDetails(),
    getSubscription(),
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Billing</h3>
        <p className="text-sm text-muted-foreground">
          Manage your subscription and payment details.
        </p>
      </div>
      <Separator />
      <BillingForm
        session={session}
        userDetails={userDetails}
        subscription={subscription}
      />
    </div>
  );
}
