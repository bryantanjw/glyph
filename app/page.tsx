import HomeLayout from "@/components/home-layout";
import Playground from "@/components/playgroud";

import {
  getGenerationCount,
  getSession,
  getSubscription,
  getUserDetails,
} from "@/app/supabase-server";

export default async function PlaygroundPage() {
  const [session, userDetails, subscription, generationCount] =
    await Promise.all([
      getSession(),
      getUserDetails(),
      getSubscription(),
      getGenerationCount(),
    ]);

  const user = session?.user;

  return (
    <HomeLayout
      user={user}
      userDetails={userDetails}
      subscription={subscription}
      generationCount={generationCount}
    >
      <Playground
        user={user}
        userDetails={userDetails}
        subscription={subscription}
        data={null}
      />
    </HomeLayout>
  );
}
