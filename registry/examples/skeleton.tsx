import { Skeleton } from "@ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default () => {
  return (
    <>
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-2">
          <Skeleton className="h-5 w-1/2" />
          <Skeleton className="h-4 w-4/5" />
        </CardHeader>
        <CardContent className="space-y-3">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </CardContent>
      </Card>
      <Card className="w-full max-w-md">
        <CardHeader className="flex items-center">
          <Skeleton className="size-8 rounded-full" />
          <Skeleton className="h-6 w-4/5" />
        </CardHeader>
        <CardContent className="space-y-3">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </CardContent>
      </Card>
    </>
  );
};
