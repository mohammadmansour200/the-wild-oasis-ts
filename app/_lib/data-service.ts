import { Database } from "@/types/database.types";
import { Booking, BookingEdit, FilterType } from "@/types/globalTypes.types";
import { eachDayOfInterval } from "date-fns";
import { notFound } from "next/navigation";
import supabase from "./supabase";

/////////////
// GET

export async function getCabin(id: number) {
	const { data, error } = await supabase
		.from("cabins")
		.select("*")
		.eq("id", id)
		.single();

	if (error) {
		console.error(error);
		notFound();
	}

	return data;
}

export async function getCabinPrice(id: number) {
	const { data, error } = await supabase
		.from("cabins")
		.select("regularPrice, discount")
		.eq("id", id)
		.single();

	if (error) {
		console.error(error);
	}

	return data;
}

export async function getCabins(capacityFilter: FilterType = "all") {
	let cabins = supabase
		.from("cabins")
		.select("id, name, maxCapacity, regularPrice, discount, image");

	if (capacityFilter === "all") cabins = cabins;

	if (capacityFilter === "large") cabins = cabins.gte("maxCapacity", 8);

	if (capacityFilter === "medium")
		cabins = cabins.gte("maxCapacity", 4).lte("maxCapacity", 7);

	if (capacityFilter === "small") cabins = cabins.lte("maxCapacity", 3);

	const { error, data } = await cabins;

	if (error) {
		console.error(error);
		throw new Error("Cabins could not be loaded");
	}
	return data;
}

export const getCabinsCount = async function () {
	const { count, error } = await supabase
		.from("cabins")
		.select("*", { count: "estimated", head: true });

	if (error) {
		console.error(error);
		throw new Error("Cabins could not be loaded");
	}

	return count;
};

export async function getGuest(
	email: string,
): Promise<Database["public"]["Tables"]["guests"]["Row"]> {
	const { data } = await supabase
		.from("guests")
		.select("*")
		.eq("email", email)
		.single();

	// No error here! We handle the possibility of no guest in the sign in callback
	return data;
}

export async function getBooking(id: number) {
	const { data, error } = await supabase
		.from("bookings")
		.select("id, observations, guestId, cabins(maxCapacity)")
		.eq("id", id)
		.single();

	if (error) {
		console.error(error);
		throw new Error("Booking could not get loaded");
	}

	return data as unknown as BookingEdit;
}

export async function getBookings(guestId: number) {
	const { data, error } = await supabase
		.from("bookings")
		// We actually also need data on the cabins as well. But let's ONLY take the data that we actually need, in order to reduce downloaded data.
		.select(
			"id, created_at, startDate, endDate, numNights, numGuests, totalPrice, guestId, cabinId, cabins(name, image)",
		)
		.eq("guestId", guestId)
		.order("startDate");

	if (error) {
		console.error(error);
		throw new Error("Bookings could not get loaded");
	}

	return data as unknown as Booking[];
}

export async function getBookedDatesByCabinId(cabinId: number) {
	let date = new Date();
	date.setUTCHours(0, 0, 0, 0);
	const today = date.toISOString();

	// Getting all bookings
	const { data, error } = await supabase
		.from("bookings")
		.select("*")
		.eq("cabinId", cabinId)
		.or(`startDate.gte.${today},status.eq.checked-in`);

	if (error) {
		console.error(error);
		throw new Error("Bookings could not get loaded");
	}

	// Converting to actual dates to be displayed in the date picker
	const bookedDates = data
		.map((booking) => {
			return eachDayOfInterval({
				start: new Date(booking.startDate),
				end: new Date(booking.endDate),
			});
		})
		.flat();

	return bookedDates;
}

export async function getSettings() {
	const { data, error } = await supabase.from("settings").select("*").single();

	if (error) {
		console.error(error);
		throw new Error("Settings could not be loaded");
	}

	return data;
}
interface ICountries {
	name: string;
	flag: string;
	independent: boolean;
}
export async function getCountries() {
	try {
		const res = await fetch(
			"https://restcountries.com/v2/all?fields=name,flag",
		);
		const countries: ICountries[] = await res.json();
		const countriesWithoutIsNotReal = countries.filter(
			(obj) => obj.name !== "Israel",
		);
		return countriesWithoutIsNotReal;
	} catch {
		throw new Error("Could not fetch countries");
	}
}

/////////////
// CREATE

export async function createGuest(
	newGuest: Database["public"]["Tables"]["guests"]["Insert"],
) {
	const { data, error } = await supabase.from("guests").insert([newGuest]);

	if (error) {
		console.error(error);
		throw new Error("Guest could not be created");
	}

	return data;
}

export async function createBooking(
	newBooking: Database["public"]["Tables"]["bookings"]["Insert"],
) {
	const { error } = await supabase.from("bookings").insert([newBooking]);

	if (error) {
		console.error(error);
		throw new Error("Booking could not be created");
	}
}

/////////////
// UPDATE

// The updatedFields is an object which should ONLY contain the updated data
export async function updateGuest(
	id: number,
	updatedFields: Database["public"]["Tables"]["guests"]["Update"],
) {
	const { error } = await supabase
		.from("guests")
		.update(updatedFields)
		.eq("id", id);

	if (error) {
		console.error(error);
		throw new Error("Guest could not be updated");
	}
}

export async function updateBooking(
	id: number,
	updatedFields: Database["public"]["Tables"]["bookings"]["Update"],
) {
	const { data, error } = await supabase
		.from("bookings")
		.update(updatedFields)
		.eq("id", id)
		.select()
		.single();

	if (error) {
		console.error(error);
		throw new Error("Booking could not be updated");
	}
	return data;
}

/////////////
// DELETE

export async function deleteBooking(id: number) {
	const { error } = await supabase.from("bookings").delete().eq("id", id);

	if (error) {
		console.error(error);
		throw new Error("Booking could not be deleted");
	}
}
