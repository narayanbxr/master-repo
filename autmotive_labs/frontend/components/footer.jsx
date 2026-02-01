export default function Footer() {
return (
<footer className="border-t mt-24">
<div className="max-w-6xl mx-auto px-6 py-12 text-gray-500">
© {new Date().getFullYear()} FinInsight. All rights reserved.
</div>
</footer>
);
}