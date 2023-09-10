"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Session, User } from "@supabase/supabase-js";

import { Button } from "@/components/ui/button";

import { Testimonials } from "./testimonials";

import { postData } from "@/utils/helpers";
import { getStripe } from "@/utils/stripe-client";
import { cn } from "@/lib/utils";
import { Database } from "@/types_db";

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
    <div className="max-w-6xl px-4 py-8 mx-auto sm:py-24 sm:px-10 lg:px-8">
      <div className="sm:flex sm:flex-col sm:align-center">
        <h1 className="text-4xl font-extrabold sm:text-center sm:text-6xl text-slate-900 dark:text-white">
          Pricing Plans
        </h1>
        <p className="max-w-2xl m-auto mt-5 text-xl sm:text-center sm:text-2xl">
          Start building for free, then add a site plan to go live. Account
          plans unlock additional features.
        </p>
      </div>

      <div className="flex justify-center min-w-[300px] max-w-[14rem] m-auto py-8 mt-8">
        <div className="relative flex w-full p-1 rounded-full border">
          <span
            className="absolute inset-0 m-1 pointer-events-none"
            aria-hidden="true"
          >
            <span
              className={`absolute inset-0 w-1/2 bg-indigo-500 rounded-full shadow-sm shadow-indigo-950/10 transform transition-transform duration-150 ease-in-out ${
                billingInterval === null ? "translate-x-0" : "translate-x-full"
              }`}
            ></span>
          </span>
          <button
            className={`relative flex-1 text-sm font-medium h-8 rounded-full focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 dark:focus-visible:ring-slate-600 transition-colors duration-150 ease-in-out 
            ${billingInterval === null ? "text-white" : ""}`}
            onClick={() => setBillingInterval(null)}
            aria-pressed={billingInterval === null}
          >
            On demand
            {/* <span>-20%</span> */}
          </button>
          <button
            className={`relative flex-1 text-sm font-medium h-8 rounded-full focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 dark:focus-visible:ring-slate-600 transition-colors duration-150 ease-in-out 
            ${billingInterval === "month" ? "text-white" : ""}`}
            onClick={() => setBillingInterval("month")}
            aria-pressed={billingInterval === "month"}
          >
            Monthly
          </button>
        </div>
      </div>

      <div className="space-y-4 lg:space-y-0 sm:grid sm:grid-cols-2 lg:mx-auto xl:max-w-none xl:mx-0 lg:grid-cols-3 items-center mt-9 gap-3 lg:gap-0">
        {products.map((product) => {
          const price = product?.prices?.find(
            (price) => price.interval === billingInterval
          );
          if (!price) return null;
          const priceString = new Intl.NumberFormat("en-US", {
            currency: price.currency!,
            minimumFractionDigits: 0,
          }).format((price?.unit_amount || 0) / 100);

          const isPremier = product.name === "Premier";
          const textColorClass = isPremier
            ? "text-white dark:text-slate-900"
            : "text-slate-900 dark:text-slate-200";

          return (
            <div
              key={product.id}
              className={cn(
                `relative flex flex-col h-full p-10 rounded-2xl border border-slate-200 dark:border-slate-900 shadow shadow-slate-950/5
               ${
                 isPremier
                   ? "z-10 lg:-ml-6 lg:-mr-6 h-[110%] bg-slate-900 dark:bg-white"
                   : "z-0 bg-white dark:bg-slate-900"
               }`,
                {
                  "border border-pink-500": subscription
                    ? product.name === subscription?.prices?.products?.name
                    : "",
                }
              )}
            >
              {isPremier && (
                <div className="absolute top-0 right-0 mr-6 -mt-4">
                  <div className="inline-flex items-center text-xs font-semibold py-1.5 px-3 bg-emerald-500 text-white rounded-full shadow-sm shadow-slate-950/5">
                    Most Popular
                  </div>
                </div>
              )}
              <div className={`font-semibold mb-1 ${textColorClass}`}>
                {product.name}
              </div>
              <div className="inline-flex items-baseline mb-2">
                <span className={`font-bold text-3xl ${textColorClass}`}>
                  $
                </span>
                <span className={`font-bold text-4xl ${textColorClass}`}>
                  {priceString}
                </span>
                <span className="text-slate-500 font-medium">/mo</span>
              </div>

              <Button
                type="button"
                disabled={!session}
                loading={priceIdLoading === price.id}
                onClick={() => handleCheckout(price)}
                className={`w-full my-7 ${isPremier ? "bg-indigo-500" : ""}`}
              >
                {subscription ? "Manage" : "Subscribe"}
              </Button>

              <ul className="text-slate-600 dark:text-slate-400 text-sm space-y-3 grow">
                {features.map((feature, index) => {
                  return (
                    <li key={index} className="flex items-center">
                      <svg
                        className="w-3 h-3 fill-emerald-500 mr-3 shrink-0"
                        viewBox="0 0 12 12"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                      </svg>
                      <span>{feature}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>

      <Testimonials />
    </div>
  );
}

const features = [
  "Unlimited placeholder texts",
  "Consectetur adipiscing elit",
  "Excepteur sint occaecat cupidatat",
  "Officia deserunt mollit anim",
  "Predefined chunks as necessary",
];
