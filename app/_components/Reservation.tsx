import { Database } from "@/types/database.types";
import { auth } from "../_lib/auth";
import { getBookedDatesByCabinId, getSettings } from "../_lib/data-service";
import DateSelector from "./DateSelector";
import LoginMessage from "./LoginMessage";
import ReservationForm from "./ReservationForm";

interface IReservationProps {
	cabin: Database["public"]["Tables"]["cabins"]["Row"];
}
async function Reservation({ cabin }: IReservationProps) {
	const [settings, bookedDates] = await Promise.all([
		getSettings(),
		getBookedDatesByCabinId(cabin.id),
	]);
	const session = await auth();

	return (
		<div className="flex flex-col justify-center gap-10">
			<DateSelector
				cabin={cabin}
				settings={settings}
				bookedDates={bookedDates}
			/>
			{session?.user ? (
				<ReservationForm cabin={cabin} user={session.user} />
			) : (
				<LoginMessage />
			)}
		</div>
	);
}

export default Reservation;
