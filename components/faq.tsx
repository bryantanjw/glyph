import { Balancer } from "react-wrap-balancer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";
import Link from "next/link";
import { Row } from "./ui/row";

export default function FAQ() {
  return (
    <div className="text-left">
      <div className="mx-4 flex grid items-center lg:grid-cols-2">
        <div className="mb-12 lg:mb-0">
          <div className="block rounded-lg bg-[hsla(0,0%,100%,0.55)] px-6 py-12 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-[hsla(0,0%,5%,0.55)] dark:shadow-black/20 md:px-12 lg:-mr-14 backdrop-blur-[30px]">
            <h3 className="mb-3 font-semibold text-blue-500 tracking-wider">
              Frequently asked questions
            </h3>
            <Balancer>
              <h5 className="pr-8 text-3xl md:text-5xl font-bold text-primary dark:text-primary-400 mb-10">
                Everything you need to know
              </h5>
            </Balancer>

            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger className="md:text-md text-left">
                  What kind of images can I generate?
                </AccordionTrigger>
                <AccordionContent className="mb-6 text-gray-500 dark:text-neutral-300">
                  You can generate QR codes and images with subliminal meanings
                  of various forms based on images uploaded, prompt words, and
                  various parameters. The platform is not responsible for any
                  illegal content generated by any user.
                  <br />
                  <br />
                  You can check out some amazing examples generated by the
                  community at the{" "}
                  <Link
                    href="/gallery"
                    className="text-blue-500 hover:underline"
                  >
                    Gallery
                  </Link>
                  .
                </AccordionContent>
              </AccordionItem>

              <Row className="w-full h-[1px] bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-800 to-transparent" />

              <AccordionItem value="item-2">
                <AccordionTrigger className="md:text-md text-left">
                  How to improve the recognition rate of QR codes?
                </AccordionTrigger>
                <AccordionContent className="mb-6 text-gray-500 dark:text-neutral-300">
                  The control weight parameter is crucial for improving the
                  scanning recognition rate.
                  <br />
                  <br />
                  The higher the control weight of the QR code, the higher the
                  contrast of the generated image and the more it deviates from
                  the prompt word. The lower the control weight, the more
                  difficult the generated image is to be recognized, but it will
                  have a more natural visual effect, and it needs to be adjusted
                  properly for different prompt words and seeds.
                  <br />
                  <br />
                  In addition, trying different seeds can also be helpful.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
        <div>
          <Image
            src="https://cdn.sanity.io/images/s3mrlbj8/production/fbe2b8c5ee6832d523ec745536977b0c13f731a7-768x768.png"
            className="rounded-lg shadow-lg dark:shadow-black/20"
            alt=""
            width={768}
            height={768}
          />
        </div>
      </div>
    </div>
  );
}
