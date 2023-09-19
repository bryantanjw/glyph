import ImageGrid from "../components/image-grid";
import { getByCategory } from "@/sanity/sanity-utils";

export default async function CategoryPage({
  params: { category },
}: {
  params: { category: string };
}) {
  const data = await getByCategory(category);
  return <ImageGrid data={data} />;
}
