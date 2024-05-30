import { cn } from "@/utils/utils";
import React from "react";

interface ISkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
	className?: string;
}

function Skeleton({ className, ...props }: ISkeletonProps) {
	return (
		<div
			className={cn("animate-pulse rounded-md bg-gray-200", className)}
			{...props}
		/>
	);
}

export { Skeleton };
