import { cn } from "@/lib/utils";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-pulse backdrop-blur-md bg-lightBorderColor dark:bg-darkBorderColor",
        className,
      )}
      {...props}
    />
  );
}

export { Skeleton };
