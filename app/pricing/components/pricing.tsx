"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Session, User } from "@supabase/supabase-js";

import { Button } from "@/components/ui/button";

import { Navbar } from "@/app/home/navbar";
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
        className="pt-32 md:pt-48 px-10 lg:px-24 pb-12 lg:pb-0"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 85% 120% at center bottom, rgb(29, 78, 216) 0%, rgb(30, 64, 175) 30%, rgb(15 23 42) 60%)",
        }}
      >
        <div className="sm:flex sm:flex-col sm:align-center">
          <h1 className="text-4xl font-extrabold sm:text-center sm:text-6xl text-white">
            Pricing Plans
          </h1>
          <p className="max-w-2xl m-auto mt-5 text-xl sm:text-center sm:text-2xl text-white">
            Start building for free, then add a site plan to go live. Account
            plans unlock additional features.
          </p>
        </div>

        <div className="flex justify-center min-w-[80px] max-w-[14rem] m-auto pb-0 md:py-8 mt-12">
          <div className="relative flex w-full p-1 rounded-full bg-gray-500 bg-opacity-20 backdrop-blur">
            <span
              className="absolute inset-0 m-1 pointer-events-none"
              aria-hidden="true"
            >
              <span
                className={`absolute inset-0 w-1/2 bg-slate-500 rounded-full shadow-sm shadow-indigo-950/10 transform transition-transform duration-150 ease-in-out ${
                  billingInterval === null
                    ? "translate-x-0"
                    : "translate-x-full"
                }`}
              ></span>
            </span>
            <button
              className={`relative flex-1 text-xs font-medium h-8 rounded-full focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 transition-colors duration-150 ease-in-out 
           text-white`}
              onClick={() => setBillingInterval(null)}
              aria-pressed={billingInterval === null}
            >
              On demand
              {/* <span>-20%</span> */}
            </button>
            <button
              className={`relative flex-1 text-xs font-medium h-8 rounded-full focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 transition-colors duration-150 ease-in-out 
           text-white`}
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
              style: "currency",
              currency: price.currency!,
              minimumFractionDigits: 0,
            }).format((price?.unit_amount || 0) / 100);

            const isPremier = product.name === "Premier";
            const textColorClass = isPremier ? "text-slate-900" : "text-white";

            return (
              <div
                key={product.id}
                className={cn(
                  `relative flex flex-col h-full px-10 py-12 border border-opacity-60 shadow-xl
               ${
                 isPremier
                   ? "z-10 lg:-ml-6 lg:-mr-6 lg:top-5 h-[105%] lg:h-[120%] border-slate-300 bg-white rounded-2xl"
                   : "z-0 bg-slate-800 bg-opacity-70 border-slate-600 rounded-2xl lg:rounded-t-2xl lg:rounded-b-none mb-8 lg:mb-0"
               }`,
                  {
                    "border border-pink-500": subscription
                      ? product.name === subscription?.prices?.products?.name
                      : "",
                  }
                )}
              >
                {isPremier && (
                  <div className="absolute top-0 right-0 p-5">
                    <div className="inline-flex items-center text-xs font-semibold py-1.5 px-3 bg-slate-700 text-white rounded-lg shadow-sm shadow-slate-950/5">
                      Most Popular
                    </div>
                  </div>
                )}
                <div
                  className={`font-semibold mb-3 text-sm tracking-wide ${textColorClass}`}
                >
                  {product.name}
                </div>
                <div className="inline-flex items-baseline mb-2">
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
                  className={`w-full mb-10 mt-4 ${
                    isPremier ? "bg-indigo-500" : ""
                  }`}
                >
                  {subscription ? "Manage" : "Subscribe"}
                </Button>

                <ul className="text-slate-600 text-sm space-y-3 grow">
                  {features.map((feature, index) => {
                    return (
                      <li key={index} className="flex items-center">
                        <svg
                          className={`w-3 h-3 mr-3 shrink-0
                        ${isPremier ? "fill-emerald-500" : "fill-slate-900"}"}`}
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
      </div>

      <div id="whiteSection">
        <Testimonials />
      </div>
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
