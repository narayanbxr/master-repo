import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Blog from "../pages/Blog";
import BlogPost from "../pages/BlogPost";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";


export default function App() {
return (
<BrowserRouter>
<Navbar />
<Routes>
<Route path="/" element={<Home />} />
<Route path="/blog" element={<Blog />} />
<Route path="/blog/:id" element={<BlogPost />} />
</Routes>
<Footer />
</BrowserRouter>
);
}