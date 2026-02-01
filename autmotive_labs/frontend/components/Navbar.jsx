import { Link } from "react-router-dom";


export default function Navbar() {
return (
<nav className="border-b sticky top-0 bg-white/80 backdrop-blur z-50">
<div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
<h1 className="text-xl font-semibold">FinInsight</h1>
<div className="flex gap-8 text-gray-600">
<Link to="/" className="hover:text-black">Home</Link>
<Link to="/blog" className="hover:text-black">Blog</Link>
<a href="#" className="hover:text-black">About</a>
<a href="#" className="hover:text-black">Contact</a>
</div>
</div>
</nav>
);
}