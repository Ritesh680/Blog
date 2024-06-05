import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/utils/utils";

const labelVariants = cva(
	"text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
);

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
	children?: React.ReactNode;
}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
	({ className, ...props }, ref) => (
		<label
			ref={ref}
			className={cn(labelVariants(), className)}
			{...props}></label>
	)
);
Label.displayName = "Label";

export { Label };
