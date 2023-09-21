import ImageGrid from "./components/image-grid";
import { getAll } from "@/sanity/sanity-utils";

export default async function GalleryPage() {
  const data = await getAll();
  return (
    <div className="items-center justify-center">
      <ImageGrid data={data} />
    </div>
  );
}
