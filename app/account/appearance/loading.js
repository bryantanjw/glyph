import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

export default function Loading() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Appearance</h3>
        <p className="text-sm text-muted-foreground">
          Customize the appearance of the app by switching between day and night
          themes.
        </p>
      </div>
      <Separator />
      <div className="flex gap-5">
        <Skeleton className="h-11 w-[300px]" />
        <Skeleton className="h-11 w-[300px]" />
      </div>
    </div>
  );
}
