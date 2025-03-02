import { useEffect } from "react";
import { useState } from "react";
import { Event } from "../../data/event";
import Link from "next/link";

interface EventCardProps {
	event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
	const [remainingCoupons, setRemainingCoupons] = useState(event.coupon_number);

	useEffect(() => {
		const redemptionsKey = `redemptions_${event.id}`;
		const redemptions = localStorage.getItem(redemptionsKey)
			? parseInt(localStorage.getItem(redemptionsKey) || "0")
			: 0;

		const remaining = Math.max(0, event.coupon_number - redemptions);
		setRemainingCoupons(remaining);
	}, [event.id, event.coupon_number]);

	return (
		<div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-105">
			<div className="p-6">
				<h2 className="text-2xl font-bold text-purple-700 mb-2">
					{event.title}
				</h2>
				<p className="text-gray-600 mb-4">{event.description}</p>
				<img
					src={event.image}
					alt={event.title}
					className="w-full h-64 object-cover rounded-lg"
				/>
				<div className="flex justify-between items-center mt-10">
					<span className="text-sm text-gray-500">
						{remainingCoupons} coupons available
					</span>
					<Link
						href={`/events/${event.id}`}
						className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full transition-colors"
					>
						GASS
					</Link>
				</div>
			</div>
		</div>
	);
};

export default EventCard;
