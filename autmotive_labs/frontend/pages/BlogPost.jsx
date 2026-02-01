import { useParams } from "react-router-dom";
import { posts } from "../data/posts"


export default function BlogPost() {
const { id } = useParams();
const post = posts.find((p) => p.id === Number(id));


if (!post) return <div className="p-10">Post not found</div>;


return (
<article className="max-w-3xl mx-auto px-6 py-20">
<img src={post.image} className="rounded-2xl mb-10" />
<h1 className="text-4xl font-semibold mb-6">{post.title}</h1>
<p className="text-gray-700 leading-relaxed">{post.content}</p>
</article>
);
}