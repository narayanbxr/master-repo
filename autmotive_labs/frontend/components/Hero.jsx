import { motion } from "framer-motion";


export default function Hero() {
return (
<section className="max-w-6xl mx-auto px-6 py-28">
<motion.h1
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.6 }}
className="text-5xl md:text-6xl font-semibold leading-tight"
>
Financial insights for modern investors
</motion.h1>


<p className="mt-6 text-lg text-gray-600 max-w-2xl">
Deep dives into markets, investing psychology, crypto, and long‑term wealth building.
</p>
</section>
);
}