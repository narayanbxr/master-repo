import { Link } from "react-router-dom";


export default function BlogCard({ post }) {
return (
<Link to={`/blog/${post.id}`}>
<div className="group cursor-pointer">
<div className="overflow-hidden rounded-2xl">
<img
src={post.image}
className="h-60 w-full object-cover group-hover:scale-105 transition duration-300"
/>
</div>


<h3 className="mt-4 text-xl font-semibold">{post.title}</h3>
<p className="mt-2 text-gray-600">{post.excerpt}</p>
</div>
</Link>
);
}