import { Separator } from "@/components/ui/separator";
import BillingForm from "./billing-form";

export default function SettingsBillingPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Billing</h3>
        <p className="text-sm text-muted-foreground">
          Manage your subscription and payment details.
        </p>
      </div>
      <Separator />
      <BillingForm />
    </div>
  );
}
