import BlogCard from "../components/BlogCard";
import { posts } from "../data/posts";


export default function Blog() {
return (
<section className="max-w-6xl mx-auto px-6 py-20">
<h1 className="text-4xl font-semibold mb-12">Blog</h1>


<div className="grid md:grid-cols-2 gap-10">
{posts.map((post) => (
<BlogCard key={post.id} post={post} />
))}
</div>
</section>
);
}