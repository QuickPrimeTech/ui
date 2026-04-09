import { Spinner } from "@ui/spinner";

export default function SpinnerExample() {
  return (
    <div className="flex gap-3 items-center">
      <Spinner />
      <Spinner className="size-8" />
    </div>
  );
}
