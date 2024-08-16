"use client";

import { Booking } from "@/types/globalTypes.types";
import { useOptimistic } from "react";
import { deleteReservation } from "../_lib/action";
import ReservationCard from "./ReservationCard";

interface IReservationListProps {
	bookings: Booking[];
}
function ReservationList({ bookings }: IReservationListProps) {
	const [optimisticBookings, optimisticDelete] = useOptimistic(
		bookings,
		(currBookings, bookingId) => {
			return currBookings.filter((booking) => booking.id !== bookingId);
		},
	);

	async function handleBookingDelete(booking: Booking) {
		optimisticDelete(booking.id);
		await deleteReservation(booking);
	}

	return (
		<ul className="space-y-6">
			{optimisticBookings.map((booking) => (
				<ReservationCard
					onDelete={handleBookingDelete}
					booking={booking}
					key={booking.id}
				/>
			))}
		</ul>
	);
}

export default ReservationList;
