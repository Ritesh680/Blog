import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { Badge } from "antd";

import { Skeleton } from "../Skeleton";
import articleService from "@/service/article.service";

const FeaturedTopic = () => {
	const { data, isLoading } = useQuery({
		queryKey: ["topic", "featured"],
		queryFn: articleService.getArticles,
	});

	if (isLoading) return <Skeleton className="w-full h-[300px]" />;

	return (
		<div className="py-5">
			<div className="mb-4 text-3xl font-semibold">Explore topics</div>
			<div className="flex flex-wrap max-w-full gap-4 overflow-x-auto">
				{
					// eslint-disable-next-line @typescript-eslint/no-explicit-any
					data?.map((tag: any) => (
						<div key={tag._id}>
							<Badge>{tag.title}</Badge>
						</div>
					))
				}
			</div>
			<div className="mt-4 text-green-600 cursor-pointer hover:underline">
				<Link to="/tags">See more topics</Link>
			</div>
		</div>
	);
};

export default FeaturedTopic;
