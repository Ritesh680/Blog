import * as React from "react";
import { cva } from "class-variance-authority";
import { Link } from "react-router-dom";
import { cn } from "@/utils/utils";

const badgeVariants = cva(
	"inline-flex items-center justify-center rounded-full cursor-pointer border min-w-12  px-3 py-1.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
	{
		variants: {
			variant: {
				default:
					"border-transparent bg-primary text-primary-foreground text-center hover:bg-primary/80",
				secondary:
					"border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
				destructive:
					"border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
				outline: "text-foreground",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	}
);

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
	className?: string;
	variant?: "default" | "secondary" | "destructive" | "outline";
	tagId: string;
}

function Badge({ className, variant, tagId, ...props }: BadgeProps) {
	return (
		<Link to={`/tags/${tagId}`}>
			<div className={cn(badgeVariants({ variant }), className)} {...props} />
		</Link>
	);
}

export { Badge, badgeVariants };
