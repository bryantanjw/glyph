import { del } from "@vercel/blob";

export const runtime = "edge";

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const urlToDelete = searchParams.get("url");

  try {
    const res = await del(urlToDelete);
    console.log("blob/delete res", res);
    return new Response();
  } catch (error) {
    console.log("blob/delete error", error);
    return new Response(error, { status: 500 });
  }
}
