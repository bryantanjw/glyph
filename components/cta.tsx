import Image from "next/image";
import Link from "next/link";
import { Balancer } from "react-wrap-balancer";

export default function CTA() {
  return (
    <div className="relative isolate w-full overflow-hidden bg-gray-900 px-6 pt-16 shadow-2xl sm:rounded-3xl sm:px-16 md:max-h-[400px] md:pt-0 md:flex md:gap-x-20">
      <svg
        viewBox="0 0 1024 1024"
        className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 md:left-1/2 md:ml-0 md:-translate-x-1/2 md:translate-y-0"
        aria-hidden="true"
      >
        <circle
          cx={512}
          cy={512}
          r={512}
          fill="url(#759c1415-0410-454c-8f7c-9a820de03641)"
          fillOpacity="0.7"
        />
        <defs>
          <radialGradient id="759c1415-0410-454c-8f7c-9a820de03641">
            <stop stopColor="#7775D6" />
            <stop offset={1} stopColor="#E935C1" />
          </radialGradient>
        </defs>
      </svg>
      <div className="mx-auto max-w-md text-center md:mx-0 md:flex-auto md:py-20 md:text-left">
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          <Balancer>Reinvent your QR codes.</Balancer>
          <br />
          <Balancer>Try our application now.</Balancer>
        </h2>
        <p className="mt-6 text-lg leading-8 text-gray-300">
          Create aesthetic and effective QR codes. Experience the future of
          branding today.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6 md:justify-start">
          <Link
            href="/signin"
            className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Get started for free
          </Link>
          <Link
            href="/pricing"
            className="text-sm font-semibold leading-6 text-white"
          >
            Learn more <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
      <div className="relative mt-16 h-80 lg:mt-8">
        <Image
          className="absolute max-w-none"
          src="/app-screenshot.png"
          alt="App screenshot"
          width={768}
          height={768}
          quality={100}
        />
      </div>
    </div>
  );
}
