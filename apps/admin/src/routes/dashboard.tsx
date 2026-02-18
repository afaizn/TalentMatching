import { createFileRoute, useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard")({
	component: Dashboard,
});

function Dashboard() {
	const navigate = useNavigate();

	const handleLogout = () => {
		localStorage.removeItem("accessToken");
		localStorage.removeItem("refreshToken");
		navigate({ to: "/login" });
	};

	return (
		<div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
			<div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md text-center">
				<h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard</h1>
				<p className="text-gray-600 mb-8">Welcome to TalentMatching!</p>
				<button
					type="button"
					onClick={handleLogout}
					className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
				>
					Logout
				</button>
			</div>
		</div>
	);
}
