import { cn } from "@/utils/utils";
import { cva } from "class-variance-authority";

const InfiniteLoader = () => {
	const loaderVariant = cva(
		"border-t-2 border-2 border-t-transparent rounded-full",
		{
			variants: {
				variant: {
					default: "bg-primary text-primary-foreground hover:bg-primary/90",
					destructive:
						"bg-destructive text-destructive-foreground hover:bg-destructive/90",
					outline:
						"border border-input bg-background hover:bg-accent hover:text-accent-foreground",
					secondary:
						"bg-secondary text-secondary-foreground hover:bg-secondary/80",
					ghost: "hover:bg-accent hover:text-accent-foreground",
					link: "text-primary underline-offset-4 hover:underline",
				},
				size: {
					default: "h-4 w-4",
					sm: "h-4 w-4",
					lg: "h-8 w-8",
				},
			},
			defaultVariants: {
				variant: "default",
				size: "default",
			},
		}
	);
	return (
		<div>
			<style>
				{`
          @keyframes progress {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
        `}
			</style>

			<div
				className={cn(loaderVariant({ variant: "default", size: "default" }))}
				style={{ animation: "progress 1.5s linear infinite" }}></div>
		</div>
	);
};
export default InfiniteLoader;
