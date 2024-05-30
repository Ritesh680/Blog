import BlogCardHorizontal from "../BlogCardHorizontal";

const BlogList = ({ data }: { data: IArticle[] }) => {
	if (data?.length === 0)
		return (
			<div className="flex gap-2 text-xl underline cursor-default">
				No blogs found
			</div>
		);
	return (
		<div className="flex flex-wrap items-stretch h-[400px]">
			{data?.map((data) => (
				<div key={data._id} className="mb-5">
					{/* <BlogCard data={data} /> */}
					<BlogCardHorizontal data={data} />
				</div>
			))}
		</div>
	);
};

export default BlogList;
