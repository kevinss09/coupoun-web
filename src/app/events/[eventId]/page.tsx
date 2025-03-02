"use client";

import { useEffect, useState } from "react";
import { events } from "@/data/event";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function EventPage() {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [formSubmitted, setFormSubmitted] = useState(false);
	const [message, setMessage] = useState("");
	const [place, setPlace] = useState("");
	const [preferredTime, setPreferredTime] = useState("");
	const [remainingCoupons, setRemainingCoupons] = useState(0);
	const params = useParams();

	const eventId = params.eventId;
	const event = events.find((e) => e.id === eventId);

	useEffect(() => {
		if (event) {
			const redemptionsKey = `redemptions_${event.id}`;
			const redemptions = localStorage.getItem(redemptionsKey)
				? parseInt(localStorage.getItem(redemptionsKey) || "0")
				: 0;

			const remaining = Math.max(0, event.coupon_number - redemptions);
			setRemainingCoupons(remaining);
		}
	}, [event]);

	if (!event) {
		return (
			<div className="min-h-screen bg-gradient-to-br from-purple-100 to-pink-100 py-12 px-4">
				<div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
					<h1 className="text-2xl font-bold text-red-500 mb-4">
						Event not found
					</h1>
					<Link href="/" className="text-purple-600 hover:underline">
						← Back to all coupons
					</Link>
				</div>
			</div>
		);
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);

		const FORM_ID = process.env.NEXT_PUBLIC_FORM_ID;

		try {
			const response = await fetch(`https://formspree.io/f/${FORM_ID}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					eventTitle: event.title,
					place: place,
					preferredTime: preferredTime,
					message: message,
					couponsLeft: remainingCoupons > 0 ? remainingCoupons - 1 : 0,
				}),
			});

			if (response.ok) {
				const redemptionsKey = `redemptions_${event.id}`;
				const currentRedemptions = localStorage.getItem(redemptionsKey)
					? parseInt(localStorage.getItem(redemptionsKey) || "0")
					: 0;

				localStorage.setItem(
					redemptionsKey,
					(currentRedemptions + 1).toString()
				);

				setFormSubmitted(true);
			} else {
				alert("Sorry, there was a problem sending your request.");
				setIsSubmitting(false);
			}
		} catch (err) {
			alert("Sorry, there was a problem sending your request.");
			setIsSubmitting(false);
		}
	};

	if (formSubmitted) {
		return (
			<div className="min-h-screen bg-gradient-to-br from-purple-100 to-pink-100 py-12 px-4">
				<div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8 text-center">
					<h1 className="text-3xl font-bold text-green-500 mb-6">
						Sampai Ketemu disana ya!
					</h1>
					<p className="text-xl mb-8 text-black">
						Permintaan untuk &ldquo;{event.title}&rdquo; telah dikirim ke
						sayangmu!
					</p>
					<Link
						href="/"
						className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded-full transition-colors"
					>
						Kembali ke halaman utama
					</Link>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gradient-to-br from-purple-100 to-pink-100 py-12 px-4">
			<div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
				<div className="p-8">
					<Link
						href="/"
						className="text-purple-600 hover:underline inline-block mb-6"
					>
						← Back to all coupons
					</Link>

					<h1 className="text-3xl font-bold text-purple-700 mb-4">
						{event.title}
					</h1>
					<p className="text-gray-600 mb-6">{event.description}</p>

					<div className="mb-6">
						<img
							src={event.image}
							alt={event.title}
							className="w-full h-64 object-cover rounded-lg"
						/>
					</div>

					<div className="bg-purple-50 rounded-lg p-4 mb-8">
						<p className="text-purple-700 font-medium">
							{remainingCoupons} coupons available
						</p>
					</div>

					{remainingCoupons > 0 ? (
						<form onSubmit={handleSubmit} className="space-y-6">
							<div>
								<label
									htmlFor="place"
									className="block text-gray-700 font-medium mb-2"
								>
									Place:
								</label>
								<input
									type="text"
									id="place"
									value={place}
									onChange={(e) => setPlace(e.target.value)}
									className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent text-black"
									required
									placeholder="Dimana tempat makannya?"
								/>
							</div>

							<div>
								<label
									htmlFor="preferredTime"
									className="block text-gray-700 font-medium mb-2"
								>
									Preferred Time:
								</label>
								<input
									type="text"
									id="preferredTime"
									value={preferredTime}
									onChange={(e) => setPreferredTime(e.target.value)}
									className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent text-black"
									placeholder="Mau ketemu jam brp?"
									required
								/>
							</div>

							<div>
								<label
									htmlFor="message"
									className="block text-gray-700 font-medium mb-2"
								>
									Special requests or notes:
								</label>
								<textarea
									id="message"
									value={message}
									onChange={(e) => setMessage(e.target.value)}
									className="w-full border border-gray-300 rounded-lg p-3 h-32 focus:ring-2 focus:ring-purple-500 focus:border-transparent text-black"
									placeholder="Mau request apa?"
								></textarea>
							</div>

							<button
								type="submit"
								disabled={isSubmitting}
								className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-4 rounded-lg transition-colors disabled:opacity-50"
							>
								{isSubmitting ? "Sending..." : "Ambil Coupon ini"}
							</button>
						</form>
					) : (
						<div className="bg-red-50 rounded-lg p-6 text-center">
							<p className="text-red-500 font-medium">
								Maaf, coupon anda sudah habis! Hubungi sayangmu untuk
								menambahkan coupon lagi!
							</p>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
