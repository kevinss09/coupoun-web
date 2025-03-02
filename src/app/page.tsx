"use client";

import { events } from "@/data/event";
import EventCard from "@/app/components/EventCard";

export default function Home() {
	return (
		<main className="min-h-screen bg-gradient-to-br from-purple-100 to-pink-100 py-12 px-4">
			<div className="max-w-5xl mx-auto">
				<div className="text-center mb-12">
					<h1 className="text-4xl md:text-5xl font-bold text-pink-500 mb-4">
						Coupon buat sayangku
					</h1>
					<p className="text-xl text-gray-600 max-w-2xl mx-auto">
						HAYOO PILIH YANG MANAAA
					</p>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
					{events.map((event) => (
						<EventCard key={event.id} event={event} />
					))}
				</div>
			</div>
		</main>
	);
}
