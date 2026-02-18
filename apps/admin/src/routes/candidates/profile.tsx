import { createFileRoute } from "@tanstack/react-router";

type Candidate = {
	name: string;
	last_role: string;
	profile_summary: string;
	last_education: string;
	last_salary: string;
	expectation: string;
	company: string;
	address: string;
	phone: string;
	email: string;
};

export const Route = createFileRoute("/candidates/profile")({
	validateSearch: (search): { email?: string } => ({
		email: typeof search.email === "string" ? search.email : undefined,
	}),

	component: CandidateProfilePage,
});

const dataset: Record<string, Candidate> = {
	"budi.1@kerja.id": {
		name: "Budi Santoso",
		last_role: "Frontend Engineer",
		profile_summary:
			"Results-oriented Frontend Engineer with 4+ years of experience in building scalable web applications using React.js and Next.js.",
		last_education: "S1 Teknik Informatika - ITB",
		last_salary: "12,000,000",
		expectation: "15,500,000",
		company: "PT Aurora Beauty Indonesia",
		address: "Jl. Thamrin No. 12, Menteng, Jakarta Pusat",
		phone: "081298374651",
		email: "budi.1@kerja.id",
	},
};

const emptyCandidate: Candidate = {
	name: "Candidate Not Found",
	last_role: "-",
	profile_summary: "-",
	last_education: "-",
	last_salary: "-",
	expectation: "-",
	company: "-",
	address: "-",
	phone: "-",
	email: "-",
};

function CandidateProfilePage() {
	const { email } = Route.useSearch();

	let candidate: Candidate;

	if (email && dataset[email]) {
		candidate = dataset[email];
	} else {
		candidate = emptyCandidate;
	}

	return (
		<div className="min-h-screen bg-zinc-100 p-6">
			<div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-6">
				<div className="flex justify-between items-start">
					<div>
						<h1 className="text-2xl font-bold">{candidate.name}</h1>
						<p className="text-zinc-500">{candidate.last_role}</p>
					</div>

					<div className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm">
						Candidate
					</div>
				</div>

				<hr className="my-6" />

				<h3 className="font-semibold mb-2">Profile Summary</h3>

				<div className="p-4 rounded-xl bg-zinc-50 text-sm leading-relaxed">
					{candidate.profile_summary}
				</div>

				<hr className="my-6" />

				<h3 className="font-semibold mb-3">Candidate Information</h3>

				<div className="grid grid-cols-2 gap-3">
					<Info label="Full Name" value={candidate.name} />
					<Info label="Email" value={candidate.email} />
					<Info label="Phone" value={candidate.phone} />
					<Info label="Last Role" value={candidate.last_role} />
					<Info label="Last Education" value={candidate.last_education} />
					<Info label="Last Salary" value={`Rp ${candidate.last_salary}`} />
					<Info label="Expectation" value={`Rp ${candidate.expectation}`} />
					<Info label="Company" value={candidate.company} />
					<Info label="Address" value={candidate.address} />
				</div>
			</div>
		</div>
	);
}

function Info({ label, value }: { label: string; value: string }) {
	return (
		<div className="p-3 rounded-xl bg-zinc-50">
			<div className="text-xs text-zinc-500">{label}</div>
			<div className="font-semibold text-sm">{value}</div>
		</div>
	);
}
