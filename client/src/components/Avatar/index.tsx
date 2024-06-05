import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";

import { cn } from "@/utils/utils";

interface IAvatarWithClassName {
	className?: string;
	children?: React.ReactNode;
}
interface IAvatarImageWithClassName
	extends React.ImgHTMLAttributes<HTMLImageElement> {
	className?: string;
	children?: React.ReactNode;
}

const Avatar = React.forwardRef<HTMLDivElement, IAvatarWithClassName>(
	({ className, ...props }, ref) => (
		<AvatarPrimitive.Root
			ref={ref}
			className={cn(
				"relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
				className
			)}
			{...props}
		/>
	)
);
Avatar.displayName = AvatarPrimitive.Root.displayName;

const AvatarImage = React.forwardRef<
	HTMLImageElement,
	IAvatarImageWithClassName
>(({ className, ...props }, ref) => (
	<AvatarPrimitive.Image
		ref={ref}
		className={cn("aspect-square h-full w-full object-cover", className)}
		{...props}
	/>
));
AvatarImage.displayName = AvatarPrimitive.Image.displayName;

const AvatarFallback = React.forwardRef<HTMLDivElement, IAvatarWithClassName>(
	({ className, ...props }, ref) => (
		<AvatarPrimitive.Fallback
			ref={ref}
			className={cn(
				"flex h-full w-full items-center justify-center rounded-full bg-gray-300",
				className
			)}
			{...props}
		/>
	)
);
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

export { Avatar, AvatarImage, AvatarFallback };
