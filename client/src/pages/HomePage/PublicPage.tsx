import { useQuery } from "react-query";
import articleService from "@/service/article.service";
import BlogHorizontalCard from "@/components/BlogHorizontalCard";
import BlogList from "@/components/BlogList";

const PublicHome = () => {
	const { data, isLoading } = useQuery({
		queryKey: ["blogs"],
		queryFn: articleService.getArticles,
	});

	if (isLoading || !data) {
		return (
			<div className="flex flex-col gap-5">
				<BlogHorizontalCard />
				<BlogHorizontalCard />
			</div>
		);
	}

	return (
		<div>
			<BlogList data={data} />
		</div>
	);
};

export default PublicHome;
