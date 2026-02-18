import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({ component: App });

function App() {
	return (
		<div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 space-y-8">
			<h1 className="text-4xl font-bold text-gray-900">
				Welcome to TalentMatching
			</h1>
			<div className="flex space-x-4">
				<Link
					to="/login"
					className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
				>
					Login
				</Link>
				<Link
					to="/register"
					className="px-6 py-3 bg-white text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium"
				>
					Register
				</Link>
			</div>
		</div>
	);
}
