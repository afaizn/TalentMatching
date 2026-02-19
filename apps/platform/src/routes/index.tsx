import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { api } from "@/utils/api";

export const Route = createFileRoute("/")({
	component: App,
	loader: async () => {
		const res = await api.companies.$get();
		const data = await res.json();
		return data;
	},
});

function App() {
	const router = useRouter();
	const data = Route.useLoaderData();

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");

	async function handleAddCompany(e) {
		e.preventDefault();
		const res = await api.companies.$post({
			json: {
				name,
				email,
				phone,
			},
		});

		const data = await res.json();
		router.invalidate();

		setName("");
		setEmail("");
		setPhone("");

		return data;
	}

	return (
		<div>
			<div>
				{data.companies.map((company) => (
					<div key={company.id}>{company.name}</div>
				))}
			</div>

			<form onSubmit={handleAddCompany} className="space-x-2">
				<input
					className="px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-1 focus:ring-sky-300 focus:border-sky-300 focus:outline-none transition"
					placeholder="name"
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
				<input
					className="px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-1 transition focus:ring-sky-300 focus:border-sky-300 focus:outline-none transition"
					placeholder="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<input
					className="px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-1 focus:ring-sky-300 focus:border-sky-300 focus:outline-none transition"
					placeholder="phone"
					value={phone}
					onChange={(e) => setPhone(e.target.value)}
				/>
				<button
					className="text-sm px-6 py-2 text-white font-medium hover:bg-sky-600 focus:ring-2 focus:ring-sky-400 focus:outline-none transition rounded-lg bg-sky-200"
					type="submit"
				>
					Add
				</button>
			</form>
		</div>
	);
}
