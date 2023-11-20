import { ImageResponse } from "next/server";
import { notFound } from "next/navigation";
import Image from "next/image";

export default async function DynamicOG({
  params,
}: {
  params: { id: string };
}) {
  const res = await fetch(`https://api.glyph.so/predictions/${params.id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Token " + process.env.REPLICATE_API_KEY,
    },
  });
  const prediction = await res.json();

  return new ImageResponse(
    (
      <div
        tw="flex flex-col w-full h-full items-center justify-center bg-red-500 p-16"
        style={{
          backgroundImage: `url(${
            prediction.output[0] || "https://glyph.so/opengraph-image.png"
          })`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center",
        }}
      >
        <div
          tw="absolute flex bottom-[48px] flex items-center basis-full lg:basis-auto"
          style={{ gap: 28 }}
        >
          <div tw="bg-white border-4 border-black px-[52px] lowercase break-all rounded-lg text-[36px] flex items-center justify-start w-[800px] h-[150px]">
            {prediction.prompt.substring(0, 72)}
            {prediction.prompt.length > 72 && "..."}
          </div>
          <div tw="flex bg-white border-4 border-black p-5 rounded-lg relative">
            <Image
              src="https://glyph.so/logo.png"
              width={100}
              height={100}
              alt="Glyph Logo"
            />
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      headers: {
        "cache-control": "public, max-age=60, stale-while-revalidate=86400",
      },
    }
  );
}
