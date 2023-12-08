import { Metadata } from "next";
import { notFound } from "next/navigation";
import Playground from "@/components/playgroud";
import HomeLayout from "@/components/home-layout";

import {
  getGenerationCount,
  getSession,
  getSubscription,
  getUserDetails,
} from "@/app/supabase-server";

export async function generateMetadata({
  params,
}: {
  params: {
    id: string;
  };
}): Promise<Metadata | undefined> {
  const title = `Glyph`;
  const description = `Check out my Glyph!`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: "@bryantanjw",
    },
  };
}

export default async function Results({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const [session, userDetails, subscription, generationCount] =
    await Promise.all([
      getSession(),
      getUserDetails(),
      getSubscription(),
      getGenerationCount(),
    ]);
  const user = session?.user;

  const res = await fetch(`https://api.glyph.so/predictions/${params.id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Token " + process.env.REPLICATE_API_KEY,
    },
  });
  const prediction = await res.json();
  if (!prediction?.output || prediction?.status === "error") {
    return notFound();
  }

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
        data={prediction}
      />
    </HomeLayout>
  );
}
