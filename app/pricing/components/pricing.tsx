"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Session, User } from "@supabase/supabase-js";
import { CheckCircledIcon, CheckIcon } from "@radix-ui/react-icons";
import * as SwitchPrimitives from "@radix-ui/react-switch";

import { Button } from "@/components/ui/button";

import { Navbar } from "@/app/home/navbar";
import { Testimonials } from "./testimonials";

import { postData } from "@/utils/helpers";
import { getStripe } from "@/utils/stripe-client";
import { cn } from "@/lib/utils";
import { Database } from "@/types_db";
import { Switch } from "@/components/ui/switch";

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

interface Props {
  session: Session | null;
  user: User | null | undefined;
  products: ProductWithPrices[];
  subscription: SubscriptionWithProduct | null;
}

type BillingInterval = "month" | null;

export default function Pricing({
  session,
  user,
  products,
  subscription,
}: Props) {
  console.log("products", products);
  const router = useRouter();
  const whiteSectionRef = React.useRef(null);
  const [billingInterval, setBillingInterval] = useState<BillingInterval>(null);
  const [priceIdLoading, setPriceIdLoading] = useState<string>();

  const handleCheckout = async (price: Price) => {
    setPriceIdLoading(price.id);
    if (!user) {
      return router.push("/signin");
    }
    if (subscription) {
      return router.push("/account");
    }
    try {
      const { sessionId } = await postData({
        url: "/api/create-checkout-session",
        data: { price },
      });

      const stripe = await getStripe();
      stripe?.redirectToCheckout({ sessionId });
    } catch (error) {
      return alert((error as Error)?.message);
    } finally {
      setPriceIdLoading(undefined);
    }
  };

  if (!products.length)
    return (
      <section className="bg-black">
        <div className="max-w-6xl px-4 py-8 mx-auto sm:py-24 sm:px-6 lg:px-8">
          <div className="sm:flex sm:flex-col sm:align-center"></div>
          <p className="text-4xl font-extrabold text-white sm:text-center sm:text-6xl">
            No subscription pricing plans found. Create them in your{" "}
            <a
              className="text-pink-500 underline"
              href="https://dashboard.stripe.com/products"
              rel="noopener noreferrer"
              target="_blank"
            >
              Stripe Dashboard
            </a>
            .
          </p>
        </div>
      </section>
    );

  return (
    <div className="overflow-hidden">
      <Navbar page="pricing" />
      <div
        className="pt-32 md:pt-48 px-10 lg:px-12 pb-12 lg:pb-0"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 85% 120% at center bottom, rgb(29, 78, 216) 0%, rgb(30, 64, 175) 30%, rgb(15 23 42) 60%)",
        }}
      >
        <div className="sm:flex sm:flex-col sm:align-center">
          <h1 className="text-4xl font-bold sm:text-center sm:text-6xl text-white">
            Pricing Plans
          </h1>
          <p className="max-w-2xl m-auto mt-5 sm:text-center text-xl text-slate-500">
            Start building for free, then add a site plan to go live. Account
            plans unlock additional features.
          </p>
        </div>

        <div className="flex justify-center min-w-[80px] m-auto pb-0 md:py-8 mt-12">
          <div className="relative items-center h-11 flex w-[220px] p-1 pl-3 rounded-xl bg-slate-800 bg-opacity-50 backdrop-blur-md border border-white border-opacity-10 gap-2">
            <span
              className="absolute m-0 inset-0 m-0 pointer-events-none"
              aria-hidden="true"
            >
              <span
                className={`absolute inset-0 w-1/2 rounded-xl shadow-sm transform transition-transform duration-150 ease-in-out pricing-switch ${
                  billingInterval === null
                    ? "translate-x-0"
                    : "translate-x-full"
                }`}
              ></span>
            </span>
            <button
              className={`relative flex-1 text-xs h-8 rounded-full focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 transition-colors duration-150 ease-in-out 
              ${
                billingInterval === null ? "text-slate-100" : "text-slate-400"
              }`}
              onClick={() => setBillingInterval(null)}
              aria-pressed={billingInterval === null}
            >
              On demand
            </button>

            <SwitchPrimitives.Root
              checked={billingInterval === "month"}
              onCheckedChange={(checked) =>
                setBillingInterval(checked ? "month" : null)
              }
              className={cn(
                "peer inline-flex z-10 h-[20px] w-[36px] -mr-2 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 bg-slate-900 border border-white border-opacity-20"
              )}
            >
              <SwitchPrimitives.Thumb
                className={cn(
                  "pointer-events-none block h-4 w-4 rounded-full bg-gradient-to-b from-white to-blue-100 shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0.5"
                )}
              />
            </SwitchPrimitives.Root>

            <button
              className={`relative flex-1 text-xs h-8 rounded-full focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 transition-colors duration-150 ease-in-out
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

        <div className="space-y-4 lg:space-y-0 sm:grid sm:grid-cols-2 lg:mx-auto xl:max-w-none xl:mx-0 lg:grid-cols-3 items-center mt-9 gap-3 lg:gap-0">
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

            const features = product.description.split(";");

            const isPremier = product.name === "Premier";
            const textColorClass = isPremier ? "text-slate-900" : "text-white";

            return (
              <div
                key={product.id}
                className={cn(
                  `relative flex flex-col h-full p-10 border shadow-2xl mb-8
               ${
                 isPremier
                   ? "z-10 lg:top-2 h-[105%] lg:h-[115%] border-black border-opacity-20 bg-white rounded-2xl"
                   : "z-0 bg-slate-800 bg-opacity-80 border-slate-600 border-opacity-60 rounded-2xl lg:rounded-t-2xl lg:rounded-b-none lg:mb-0"
               }`,
                  {
                    "border border-pink-500": subscription
                      ? product.name === subscription?.prices?.products?.name
                      : "",
                    "lg:pr-20 lg:-mr-8": index === 0,
                    "lg:pl-16 lg:-ml-6": index === 2,
                  }
                )}
              >
                {isPremier && (
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
                  <span className={`font-bold text-4xl ${textColorClass}`}>
                    {priceString}
                  </span>
                  <div className="flex flex-col text-sm tracking-wide">
                    <span
                      className={`text-slate-500 font-normal ${
                        isPremier ? "text-slate-800" : "text-slate-100"
                      }`}
                    >
                      USD
                    </span>
                    <span
                      className={`text-slate-500 font-normal ${
                        isPremier ? "text-slate-500" : "text-slate-400"
                      }`}
                    >
                      Billed {billingInterval === "month" ? "monthly" : "once"}
                    </span>
                  </div>
                </div>

                <Button
                  type="button"
                  disabled={!session}
                  loading={priceIdLoading === price.id}
                  onClick={() => handleCheckout(price)}
                  className={`w-full h-10 mb-10 mt-4 ${
                    isPremier ? "bg-slate-900 shadow-xl" : ""
                  }`}
                >
                  {subscription ? "Manage" : "Subscribe"}
                </Button>

                <ul
                  className={`text-sm space-y-3 grow ${
                    isPremier ? "text-slate-800" : "text-slate-100"
                  }`}
                >
                  {features.map((feature, index) => {
                    return (
                      <>
                        <li
                          key={index}
                          className={`flex items-center gap-3 border-b pb-3 border-opacity-70 ${
                            isPremier
                              ? "text-slate-600 border-slate-200"
                              : "border-slate-700 text-slate-300"
                          }`}
                        >
                          <CheckCircledIcon
                            className={`w-5 h-5 flex-shrink-0 ${
                              isPremier ? "text-black" : "text-slate-500"
                            }`}
                          />

                          <span>{feature.trim()}</span>
                        </li>
                      </>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>
      </div>

      <div id="whiteSection">
        <Testimonials />
      </div>
    </div>
  );
}

const features = "30 credits; Up to 10 images every 15 minutes";
