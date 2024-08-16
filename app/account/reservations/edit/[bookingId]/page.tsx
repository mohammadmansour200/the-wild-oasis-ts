import FormSubmitButton from "@/app/_components/FormSubmitButton";
import { updateReservation } from "@/app/_lib/action";
import { getBooking } from "@/app/_lib/data-service";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

interface IEditBookingPageProps {
	params: Params;
}
export default async function Page({ params }: IEditBookingPageProps) {
	const booking = await getBooking(params.bookingId);
	const editBookingWithData = updateReservation.bind(null, booking);
	return (
		<div className="mx-10">
			<h2 className="font-semibold text-2xl text-accent-400 mb-7">
				Edit Reservation #{params.bookingId}
			</h2>

			<form
				action={editBookingWithData}
				className="bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col"
			>
				<div className="space-y-2">
					<label htmlFor="numGuests">How many guests?</label>
					<select
						name="numGuests"
						id="numGuests"
						className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
						required
					>
						<option value="" key="">
							Select number of guests...
						</option>
						{Array.from(
							{ length: booking.cabins.maxCapacity },
							(_, i) => i + 1,
						).map((x) => (
							<option value={x} key={x}>
								{x} {x === 1 ? "guest" : "guests"}
							</option>
						))}
					</select>
				</div>

				<div className="space-y-2">
					<label htmlFor="observations">
						Anything we should know about your stay?
					</label>
					<textarea
						defaultValue={booking.observations}
						name="observations"
						className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
					/>
				</div>

				<div className="flex justify-end items-center gap-6">
					<FormSubmitButton btnLabel="Update reservation" />
				</div>
			</form>
		</div>
	);
}
