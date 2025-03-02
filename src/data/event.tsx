export interface Event {
	id: string;
	title: string;
	description: string;
	image: string;
	coupon_number: number;
}

export const events: Event[] = [
	{
		id: "1",
		title: "Makan Horin",
		description: "Makan horin bareng sayangku",
		image: "/images/horin-ramen.jpg",
		coupon_number: 5,
	},
	{
		id: "2",
		title: "Jemput Sayangku",
		description: "Jemput sayangku ke tempat kerja",
		image: "/images/egget.jpg",
		coupon_number: 5,
	},
];
