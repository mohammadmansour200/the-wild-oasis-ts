import { Booking } from "@/types/globalTypes.types";
import { PencilSquareIcon } from "@heroicons/react/24/solid";
import { format, formatDistance, isPast, isToday, parseISO } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import DeleteReservation from "./DeleteReservation";

export const formatDistanceFromNow = (dateStr: string) =>
	formatDistance(parseISO(dateStr), new Date(), {
		addSuffix: true,
	}).replace("about ", "");

interface IReservationCardProps {
	booking: Booking;
	onDelete: (booking: Booking) => Promise<void>;
}
function ReservationCard({ booking, onDelete }: IReservationCardProps) {
	const {
		id,
		startDate,
		endDate,
		numNights,
		totalPrice,
		numGuests,
		created_at,
		cabins: { name, image },
	} = booking;

	return (
		<div className="flex border flex-col mx-2 md:flex-row border-primary-800 md:mx-0">
			<div className="w-full flex">
				<div className="relative w-[10%] max-w-[100px] aspect-square">
					<Image
						fill
						src={image}
						alt={`Cabin ${name}`}
						className="object-cover border-r border-primary-800"
					/>
				</div>
				<div className="flex-grow px-6 py-3 flex flex-col">
					<div className="flex items-center justify-between">
						<h3 className="text-xl font-semibold">
							{numNights} nights in Cabin {name}
						</h3>
						{isPast(new Date(startDate)) ? (
							<span className="bg-yellow-800 text-yellow-200 h-7 px-3 uppercase text-xs font-bold flex items-center rounded-sm">
								past
							</span>
						) : (
							<span className="bg-green-800 text-green-200 h-7 px-3 uppercase text-xs font-bold flex items-center rounded-sm">
								upcoming
							</span>
						)}
					</div>

					<p className="text-lg text-primary-300">
						{format(new Date(startDate), "EEE, MMM dd yyyy")} (
						{isToday(new Date(startDate))
							? "Today"
							: formatDistanceFromNow(startDate)}
						) &mdash; {format(new Date(endDate), "EEE, MMM dd yyyy")}
					</p>

					<div className="flex gap-5 mt-auto items-baseline">
						<p className="text-xl font-semibold text-accent-400">
							${totalPrice}
						</p>
						<p className="text-primary-300">&bull;</p>
						<p className="text-lg text-primary-300">
							{numGuests} guest{numGuests > 1 && "s"}
						</p>
						<p className="ml-auto text-sm text-primary-400">
							Booked {format(new Date(created_at), "EEE, MMM dd yyyy, p")}
						</p>
					</div>
				</div>
			</div>

			{!isPast(startDate) && (
				<div className="flex w-full justify-center gap-5 mb-2 md:justify-normal md:gap-0 md:mb-0 md:flex-col md:w-[100px] md:border-l md:border-primary-800">
					<>
						<Link
							href={`/account/reservations/edit/${id}`}
							className="group flex px-10 py-2 md:py-0 md:px-3 items-center justify-center gap-2 uppercase text-xs font-bold text-primary-300 hover:bg-primary-600 transition-colors hover:text-primary-900 md:border-b md:border-primary-800 md:flex-grow rounded-xl md:rounded-none"
						>
							<PencilSquareIcon className="h-5 w-5 text-primary-600 group-hover:text-primary-800 transition-colors" />
							<span className="mt-1">Edit</span>
						</Link>
						<DeleteReservation onDelete={onDelete} booking={booking} />
					</>
				</div>
			)}
		</div>
	);
}

export default ReservationCard;
