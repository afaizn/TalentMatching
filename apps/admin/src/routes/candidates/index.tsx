import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/candidates/")({
	component: CandidateListPage,
});

const candidates = [
	{ id: 1, name: "Budi Santoso", email: "budi.1@kerja.id" },
	{ id: 2, name: "Siti Aminah", email: "siti.2@kerja.id" },
	{ id: 3, name: "Rizky Pratama", email: "rizky.3@kerja.id" },
];

function CandidateListPage() {
	return (
		<div className="p-6">
			<h1 className="text-2xl font-bold mb-6">Candidate List</h1>

			<div className="space-y-3">
				{candidates.map((c) => (
					<div key={c.id} className="p-4 bg-white rounded-xl shadow-sm border">
						<Link
							to="/candidates/profile"
							search={{ email: c.email }}
							className="text-indigo-600 hover:text-indigo-800 font-medium"
						>
							{c.name}
						</Link>
					</div>
				))}
			</div>
		</div>
	);
}
