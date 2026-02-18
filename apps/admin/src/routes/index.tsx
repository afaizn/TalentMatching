import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
	component: HomePage,
});

function HomePage() {
	return (
		<div className="p-6">
			<h1 className="text-2xl font-bold mb-4">Admin Page</h1>

			<Link
				to="/candidates"
				className="text-indigo-600 hover:text-indigo-800 font-medium"
			>
				Go To Candidates
			</Link>
		</div>
	);
}
