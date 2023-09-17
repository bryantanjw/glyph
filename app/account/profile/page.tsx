import { Separator } from "@/components/ui/separator";
import { ProfileForm } from "./profile-form";
import { getSession, getUserDetails } from "../../supabase-server";

export default async function SettingsProfilePage() {
  const [session, userDetails] = await Promise.all([
    getSession(),
    getUserDetails(),
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Profile</h3>
        <p className="text-sm text-muted-foreground">
          Update your account settings.
        </p>
      </div>
      <Separator />
      <ProfileForm session={session} userDetails={userDetails} />
    </div>
  );
}
