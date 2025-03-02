"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ResetPage() {
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [success, setSuccess] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const router = useRouter();

	const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_PASSWORD;

	const handleReset = (e: React.FormEvent) => {
		e.preventDefault();

		if (password === ADMIN_PASSWORD) {
			Object.keys(localStorage).forEach((key) => {
				if (key.startsWith("redemptions_")) {
					localStorage.removeItem(key);
				}
			});

			setSuccess(true);
			setTimeout(() => {
				router.push("/");
			}, 2000);
		} else {
			setError("Incorrect password. Try again.");
		}
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-purple-100 to-pink-100 py-12 px-4">
			<div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8">
				<Link
					href="/"
					className="text-purple-600 hover:underline mb-6 inline-block"
				>
					← Back to home
				</Link>

				<h1 className="text-2xl font-bold text-purple-700 mb-6">Admin Reset</h1>

				{success ? (
					<div className="bg-green-50 p-4 rounded-lg mb-6">
						<p className="text-green-600">
							All coupons have been reset successfully! Redirecting...
						</p>
					</div>
				) : (
					<form onSubmit={handleReset} className="space-y-4">
						<div>
							<label
								htmlFor="password"
								className="block text-gray-700 font-medium mb-2"
							>
								Admin Password
							</label>
							<div className="relative">
								<input
									type={showPassword ? "text" : "password"}
									id="password"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent text-black"
									placeholder="Enter admin password"
								/>
								<button
									type="button"
									className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
									onClick={() => setShowPassword(!showPassword)}
								>
									{showPassword ? "Hide" : "Show"}
								</button>
							</div>
						</div>

						{error && (
							<div className="bg-red-50 p-3 rounded-lg">
								<p className="text-red-500">{error}</p>
							</div>
						)}

						<button
							type="submit"
							className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-4 rounded-lg transition-colors"
						>
							Reset All Coupons
						</button>
					</form>
				)}
			</div>
		</div>
	);
}
