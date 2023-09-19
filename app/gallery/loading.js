import { Icons } from "@/components/ui/icons";

export default function Loading() {
  return (
    <div className="mt-48 flex flex-col items-center justify-center">
      <span className="sr-only">Loading</span>
      <Icons.spinner className="mr-2 h-5 w-5 animate-spin" />
    </div>
  );
}
