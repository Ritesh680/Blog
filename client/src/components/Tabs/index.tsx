import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "@/utils/utils";

const Tabs = TabsPrimitive.Root;

interface ITabsWithClassName {
	className?: string;
	children?: React.ReactNode;
	value?: string;
}

const TabsList = React.forwardRef<HTMLDivElement, ITabsWithClassName>(
	({ className, ...props }, ref) => (
		<TabsPrimitive.List
			ref={ref}
			className={cn(
				"inline-flex h-10 items-center justify-center p-1 text-muted-foreground",
				className
			)}
			{...props}
		/>
	)
);
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<HTMLButtonElement, ITabsWithClassName>(
	({ className, ...props }, ref) => (
		<TabsPrimitive.Trigger
			value={props.value || ""}
			ref={ref}
			className={cn(
				"inline-flex items-center justify-center whitespace-nowrap min-w-28  px-3 py-1.5 text-sm font-medium ring-offset-background transition-all duration-150 border-b focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:text-foreground data-[state=active]:border-b data-[state=active]:border-black",
				className
			)}
			{...props}
		/>
	)
);
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<HTMLDivElement, ITabsWithClassName>(
	({ className, ...props }, ref) => (
		<TabsPrimitive.Content
			ref={ref}
			value={props.value || ""}
			className={cn(
				"mt-5 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
				className
			)}
			{...props}
		/>
	)
);
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
