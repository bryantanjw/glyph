import { Icons } from "@/components/ui/icons";

export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen">
      <span className="sr-only">Loading</span>
      <Icons.spinner className="h-5 w-5 animate-spin" />
    </div>
  );
}
