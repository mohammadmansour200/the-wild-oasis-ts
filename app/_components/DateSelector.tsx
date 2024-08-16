"use client";
import { Database } from "@/types/database.types";
import {
	differenceInDays,
	isPast,
	isSameDay,
	isWithinInterval,
} from "date-fns";
import { DateRange, DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { useReservation } from "../context/ReservationContext";

function isAlreadyBooked(range: DateRange, datesArr: Date[]) {
	return (
		range.from &&
		range.to &&
		datesArr.some((date) =>
			isWithinInterval(date, { start: range.from || "", end: range.to || "" }),
		)
	);
}

interface IDateSelectorProps {
	settings: Database["public"]["Tables"]["settings"]["Row"];
	bookedDates: Date[];
	cabin: Database["public"]["Tables"]["cabins"]["Row"];
}
function DateSelector({ settings, bookedDates, cabin }: IDateSelectorProps) {
	const { range, setRange, resetRange } = useReservation();

	const displayRange: DateRange | {} = isAlreadyBooked(range, bookedDates)
		? {}
		: range;

	const { regularPrice, discount } = cabin;

	const numNights = differenceInDays(
		(displayRange as DateRange)?.to || "",
		(displayRange as DateRange)?.from || "",
	);

	const cabinPrice = numNights * (regularPrice - discount);

	const { minBookingLength, maxBookingLength } = settings;

	return (
		<div className="flex flex-col justify-between">
			<DayPicker
				classNames={{
					months: "justify-center flex flex-col md:flex-row gap-10",
				}}
				onSelect={setRange}
				selected={(displayRange as DateRange) || undefined}
				className="place-self-center"
				mode="range"
				min={minBookingLength + 1}
				max={maxBookingLength}
				fromMonth={new Date()}
				fromDate={new Date()}
				toYear={new Date().getFullYear() + 5}
				captionLayout="dropdown"
				numberOfMonths={2}
				required
				disabled={(currDate): boolean =>
					isPast(currDate) ||
					bookedDates.some((date) => isSameDay(date, currDate))
				}
			/>

			<div className="flex items-center justify-between px-8 bg-accent-500 text-primary-800 h-[72px]">
				<div className="flex items-baseline gap-6">
					<p className="flex gap-2 items-baseline">
						{discount > 0 ? (
							<>
								<span className="text-2xl">${regularPrice - discount}</span>
								<span className="line-through font-semibold text-primary-700">
									${regularPrice}
								</span>
							</>
						) : (
							<span className="text-2xl">${regularPrice}</span>
						)}
						<span className="">/night</span>
					</p>
					{numNights ? (
						<>
							<p className="bg-accent-600 px-3 py-2 text-2xl">
								<span>&times;</span> <span>{numNights}</span>
							</p>
							<p>
								<span className="text-lg font-bold uppercase">Total</span>{" "}
								<span className="text-2xl font-semibold">${cabinPrice}</span>
							</p>
						</>
					) : null}
				</div>

				{range.from || range.to ? (
					<button
						className="border border-primary-800 py-2 px-4 text-sm font-semibold"
						onClick={() => resetRange()}
					>
						Clear
					</button>
				) : null}
			</div>
		</div>
	);
}

export default DateSelector;
