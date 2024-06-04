import * as React from "react";
import { cn } from "@/utils/utils";

interface SeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
	orientation?: "horizontal" | "vertical";
	decorative?: boolean;
	className?: string;
}
const Separator = React.forwardRef<HTMLDivElement, SeparatorProps>(
	(
		{ className, orientation = "horizontal", decorative = true, ...props },
		ref
	) => (
		<div
			ref={ref}
			// orientation={orientation}
			className={cn(
				"shrink-0 bg-border",
				orientation === "horizontal" ? "h-[0.5px] w-full" : "h-full w-[1px]",
				className
			)}
			{...props}
		/>
	)
);
// Separator.displayName = SeparatorPrimitive.Root.displayName;

export { Separator };
