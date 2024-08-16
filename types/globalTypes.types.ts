import { Database } from "./database.types";

export type FilterType = "all" | "large" | "medium" | "small";

export type Booking = Pick<
	Database["public"]["Tables"]["bookings"]["Row"],
	| "id"
	| "created_at"
	| "startDate"
	| "endDate"
	| "numNights"
	| "numGuests"
	| "totalPrice"
	| "guestId"
	| "cabinId"
> & {
	cabins: Pick<
		Database["public"]["Tables"]["bookings"]["Row"]["cabins"],
		"name" | "image"
	>;
};

export type BookingEdit = Pick<
	Database["public"]["Tables"]["bookings"]["Row"],
	"observations" | "guestId" | "id"
> & {
	cabins: Pick<
		Database["public"]["Tables"]["bookings"]["Row"]["cabins"],
		"maxCapacity"
	>;
};
