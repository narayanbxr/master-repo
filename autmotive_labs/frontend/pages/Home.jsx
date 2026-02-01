import Hero from "../components/Hero";
import BlogCard from "../components/BlogCard";
import { posts } from "../data/posts";


export default function Home() {
    return (
        <>
            <Hero />


            <section className="max-w-6xl mx-auto px-6">
                <h2 className="text-3xl font-semibold mb-10">Recent Posts</h2>


                <div className="grid md:grid-cols-2 gap-10">
                    {posts.map((post) => (
                        <BlogCard key={post.id} post={post} />
                    ))}
                </div>
            </section>
        </>
    );
}