"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import { Session, User } from "@supabase/supabase-js";
import { ArrowRightIcon, CheckCircledIcon } from "@radix-ui/react-icons";
import * as SwitchPrimitives from "@radix-ui/react-switch";

import { Button } from "@/components/ui/button";

import Navbar from "@/components/navbar";
import { Testimonials } from "./testimonials";

import { postData } from "@/utils/helpers";
import { getStripe } from "@/utils/stripe-client";
import { cn } from "@/lib/utils";
import { Database } from "@/types_db";
import { toast } from "@/components/ui/use-toast";
import { Icons } from "@/components/ui/icons";
import { ResizablePanel } from "@/components/ui/resizable-panel";
import { Skeleton } from "@/components/ui/skeleton";
import { Balancer } from "react-wrap-balancer";

type Subscription = Database["public"]["Tables"]["subscriptions"]["Row"];
type Product = Database["public"]["Tables"]["products"]["Row"];
type Price = Database["public"]["Tables"]["prices"]["Row"];
interface ProductWithPrices extends Product {
  prices: Price[];
}
interface PriceWithProduct extends Price {
  products: Product | null;
}
interface SubscriptionWithProduct extends Subscription {
  prices: PriceWithProduct | null;
}

interface PricingProps {
  session: Session | null;
  user: User | null | undefined;
  userDetails?: any;
  products: ProductWithPrices[];
  subscription: SubscriptionWithProduct | null;
}

type BillingInterval = "one_time" | "month";

export default function Pricing({
  session,
  user,
  userDetails,
  products,
  subscription,
}: PricingProps) {
  const router = useRouter();
  const [billingInterval, setBillingInterval] =
    useState<BillingInterval>("month");
  const [priceIdLoading, setPriceIdLoading] = useState<string>();

  const redirectToCustomerPortal = async (price) => {
    setPriceIdLoading(price.id);
    try {
      const { url } = await postData({
        url: "/api/create-portal-link",
      });
      router.push(url);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Couldn't access customer protal link.",
        description: error.message ?? `Please try again`,
      });
    }
    setPriceIdLoading(undefined);
  };

  const handleCheckout = async (price: Price) => {
    setPriceIdLoading(price.id);
    if (!user) {
      return router.push("/signin");
    }

    try {
      const { sessionId } = await postData({
        url: "/api/create-checkout-session",
        data: { price },
      });

      const stripe = await getStripe();
      stripe?.redirectToCheckout({ sessionId });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Something went wrong with your checkout.",
        description: (error as Error)?.message ?? "Please try again.",
      });
    } finally {
      setPriceIdLoading(undefined);
    }
  };

  if (!products.length)
    return (
      <section className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="max-w-6xl px-4 py-8 mx-auto sm:py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-base font-semibold text-indigo-600">404</p>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Page not found
            </h1>
            <p className="mt-8 text-base leading-7 text-gray-600">
              Sorry, we couldn’t find the products you’re looking for.
            </p>
            <p className="mt-1 text-base leading-7 text-gray-600">
              Please try again later.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="#"
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Go back home
              </a>
              <a href="#" className="text-sm font-semibold text-gray-900">
                Contact support <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    );

  return (
    <div className="overflow-hidden">
      <Navbar page="pricing" user={user} userDetails={userDetails} />
      <div className="pricing-bg pt-32 md:pt-44 px-10 pb-12 lg:pb-0">
        <div className="flex flex-col align-center text-center">
          <h1 className="text-4xl font-bold sm:text-6xl text-white">
            Pricing Plans
          </h1>
          <p className="max-w-2xl mx-auto mt-5 text-xl text-slate-500">
            <Balancer>
              You have{" "}
              <span className="font-semibold">
                {session ? userDetails?.credits : 0} credits.
              </span>{" "}
              Choose to upgrade to a plan or pay as you go.
            </Balancer>
          </p>
        </div>

        <div className="flex justify-center min-w-[80px] m-auto pb-0 md:py-8 mt-8">
          <div className="relative items-center h-11 flex w-[235px] p-1 pl-3 rounded-xl bg-slate-800 bg-opacity-50 backdrop-blur-md border border-white border-opacity-10 gap-2">
            <span
              className="absolute m-0 inset-0 pointer-events-none"
              aria-hidden="true"
            >
              <span
                className={`absolute inset-0 w-1/2 rounded-xl shadow-sm transform transition-transform duration-300 ease-in-out pricing-switch ${
                  billingInterval === "one_time"
                    ? "translate-x-0"
                    : "translate-x-full"
                }`}
              ></span>
            </span>
            <button
              className={`relative flex-1 text-sm h-8 rounded-full focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 transition-colors duration-500 ease-in-out 
              ${
                billingInterval === "one_time"
                  ? "text-slate-100"
                  : "text-slate-400"
              }`}
              onClick={() => setBillingInterval("one_time")}
              aria-pressed={billingInterval === "one_time"}
            >
              On-demand
            </button>

            <SwitchPrimitives.Root
              checked={billingInterval === "month"}
              onCheckedChange={(checked) =>
                setBillingInterval(checked ? "month" : "one_time")
              }
              className={cn(
                "peer inline-flex z-10 h-[22.5px] w-[36px] -mr-2 shrink-0 cursor-pointer items-center rounded-full border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 bg-slate-900 border border-white border-opacity-20"
              )}
            >
              <SwitchPrimitives.Thumb
                className={cn(
                  "pointer-events-none block h-4 w-4 rounded-full bg-gradient-to-b from-white to-blue-100 shadow-lg ring-0 duration-300 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0.5"
                )}
              />
            </SwitchPrimitives.Root>

            <button
              className={`relative flex-1 text-sm h-8 rounded-full focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 transition-colors duration-400 ease-in-out
              ${
                billingInterval === "month"
                  ? "text-slate-100"
                  : "text-slate-400"
              }`}
              onClick={() => setBillingInterval("month")}
              aria-pressed={billingInterval === "month"}
            >
              Monthly
            </button>
          </div>
        </div>

        <div className="space-y-4 lg:space-y-0 sm:grid sm:grid-cols-2 xl:max-w-none lg:grid-cols-3 items-center mt-9 gap-3 lg:gap-0">
          {products.map((product, index) => {
            const price = product?.prices?.find(
              (price) => price.interval === billingInterval
            );
            if (!price) return null;
            const priceString = new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: price.currency!,
              minimumFractionDigits: 0,
            }).format((price?.unit_amount || 0) / 100);

            const priceMetadata =
              product?.prices[billingInterval === "one_time" ? 1 : 0].metadata;
            const features = JSON.parse(priceMetadata["features"]);

            const isPro = product.name === "Pro";
            const textColorClass = isPro ? "text-slate-900" : "text-white";

            const matchingSubscription: boolean =
              price.id === subscription?.prices.id &&
              billingInterval === "month";

            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.2,
                  delay: index === 1 ? 0 : 0.3,
                }}
                className={cn(
                  `relative flex flex-col h-full p-10 border shadow-2xl
                   ${
                     isPro
                       ? "z-10 lg:top-2 lg:h-[115%] border-black border-opacity-20 bg-white rounded-2xl"
                       : "z-0 bg-slate-800 bg-opacity-70 border-slate-600 border-opacity-60 rounded-2xl lg:rounded-t-2xl lg:rounded-b-none lg:mb-0"
                   }`,
                  {
                    "lg:pr-16 lg:left-8": index === 0,
                    "lg:pl-16 lg:right-6": index === 2,
                  }
                )}
              >
                <ResizablePanel>
                  {isPro && (
                    <div className="absolute top-0 right-0 p-5">
                      <div className="inline-flex items-center text-xs font-semibold py-1.5 px-3 bg-slate-900 text-white rounded-lg shadow-sm shadow-slate-950/5">
                        Most Popular
                      </div>
                    </div>
                  )}
                  <div className={`font-medium mb-3 text-sm ${textColorClass}`}>
                    {product.name}
                  </div>
                  <div className="inline-flex mb-2 gap-4">
                    <motion.span
                      key={billingInterval}
                      initial={{
                        opacity: 0,
                        x: billingInterval === "month" ? -30 : 30,
                      }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`font-bold text-4xl w-15 ${textColorClass}`}
                    >
                      {priceString}
                    </motion.span>
                    <div className="flex flex-col text-sm tracking-wide">
                      <span
                        className={isPro ? "text-slate-800" : "text-slate-200"}
                      >
                        USD
                      </span>
                      <motion.span
                        key={billingInterval}
                        initial={{
                          opacity: 0,
                          x: billingInterval === "month" ? -30 : 30,
                        }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                        className={isPro ? "text-slate-500" : "text-slate-400"}
                      >
                        Billed{" "}
                        {billingInterval === "month" ? "monthly" : "once"}
                      </motion.span>
                    </div>
                  </div>

                  <Button
                    loading={priceIdLoading === price.id}
                    onClick={() => {
                      if (!session) {
                        router.push("/signin");
                      } else if (subscription && billingInterval === "month") {
                        redirectToCustomerPortal(price);
                      } else {
                        handleCheckout(price);
                      }
                    }}
                    className={`w-full h-10 mb-10 mt-4 ${
                      isPro ? "bg-slate-900 shadow-xl text-white" : ""
                    }`}
                  >
                    {priceIdLoading === price.id && (
                      <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    {matchingSubscription
                      ? "Manage Your Plan"
                      : index === 0
                      ? "Get Started"
                      : index === 1
                      ? "Upgrade to Pro"
                      : index === 2
                      ? "Go Psycho"
                      : undefined}

                    <style>{`
                      @keyframes bounce {
                        0% {
                          transform: translateX(0px);
                        }
                        50% {
                          transform: translateX(5px);
                        }
                        100% {
                          transform: translateX(0px);
                        }
                      }
                    `}</style>
                    {matchingSubscription && (
                      <ArrowRightIcon className="w-4 h-4 ml-3 animate-bounce" />
                    )}
                  </Button>

                  <div
                    className={`text-sm space-y-3 grow ${
                      isPro ? "text-slate-800" : "text-slate-100"
                    }`}
                  >
                    {features.map((feature, index) => {
                      return (
                        <li
                          key={index}
                          className={`flex items-center gap-3 border-b pb-3 border-opacity-70 ${
                            isPro
                              ? "text-slate-600 border-slate-200"
                              : "border-slate-700 text-slate-300"
                          }`}
                        >
                          <CheckCircledIcon
                            className={`w-5 h-5 flex-shrink-0 ${
                              isPro ? "text-black" : "text-slate-500"
                            }`}
                          />

                          <span>{feature.trim()}</span>
                        </li>
                      );
                    })}
                  </div>
                </ResizablePanel>
              </motion.div>
            );
          })}
        </div>
      </div>

      <div id="whiteSection" className="bg-white">
        <Testimonials />
      </div>
    </div>
  );
}
