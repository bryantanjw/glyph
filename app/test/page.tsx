import { ImageResponse } from "next/server";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

export default async function TestPage() {
  const res = await fetch(
    `https://api.glyph.so/predictions/ha4d2ctbbqzbmcupn32hb3zoaa`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + process.env.REPLICATE_API_KEY,
      },
    }
  );
  const prediction = await res.json();
  console.log("prdiction", prediction);

  return (
    <div className="flex flex-col justify-center items-center h-full w-full">
      <div className="w-[40%]   ">
        <Image
          src={
            prediction?.output[0] || "https://www.glyph.so/opengraph-image.png"
          }
          alt={prediction?.input.prompt || "Glyph image"}
        />
      </div>
      <div className="flex items-end space-x-4 -mt-12">
        <Avatar>
          <AvatarImage src="/avatar-icon.png" alt="Avatar" />
        </Avatar>
        <div className="relative p-4 max-w-md bg-blue-600 text-white rounded-xl rounded-bl-none text-left">
          <p>
            {prediction?.input.prompt.substring(0, 72)}
            {prediction?.input.prompt.length > 72 && "..."}
          </p>
        </div>
      </div>
    </div>
  );
}
