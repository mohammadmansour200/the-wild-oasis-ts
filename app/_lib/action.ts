"use server";

import { Database } from "@/types/database.types";
import { Booking, BookingEdit } from "@/types/globalTypes.types";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth, signIn, signOut } from "./auth";
import {
	createBooking,
	deleteBooking,
	updateBooking,
	updateGuest,
} from "./data-service";

export async function updateProfile(formData: FormData) {
	const session = await auth();
	if (!session) throw new Error("You must be logged in");

	const nationalID = formData.get("nationalID")?.toString() || "";

	const fromNationality = formData.get("nationality")?.toString().split("%")!;

	const nationality = fromNationality[0];
	const countryFlag = fromNationality[1];

	if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID))
		throw new Error("Please provide a valid national ID");

	const updateData = { nationality, countryFlag, nationalID };

	if (!session.user?.guestId) throw new Error("Please login.");

	await updateGuest(session.user?.guestId, updateData);

	revalidatePath("/account/profile");
}

export async function deleteReservation(booking: Booking) {
	const session = await auth();
	if (!session) throw new Error("You must be logged in");
	if (booking.guestId !== session.user?.guestId)
		throw new Error("Unauthorized");

	await deleteBooking(booking.id);
	revalidatePath("/account/reservations");
}

export async function createReservation(
	bookingData: Database["public"]["Tables"]["bookings"]["Insert"],
	formData: FormData,
) {
	const session = await auth();
	if (!session) throw new Error("You must be logged in");
	if (!bookingData.numNights) return;

	const newBooking = {
		...bookingData,
		guestId: session.user?.guestId,
		numGuests: Number(formData.get("numGuests")),
		observations: formData.get("observations")?.slice(0, 1000).toString(),
		extrasPrice: 0,
		totalPrice: bookingData.cabinPrice,
		status: "unconfirmed",
		isPaid: false,
		hasBreakfast: false,
	};

	await createBooking(newBooking);
	revalidatePath(`/cabin/${bookingData.cabinId}`);
	redirect("/cabins/thankyou");
}

export async function updateReservation(
	booking: BookingEdit,
	formData: FormData,
) {
	const session = await auth();
	if (!session) throw new Error("You must be logged in");
	if (booking.guestId !== session.user?.guestId)
		throw new Error("Unauthorized");

	const numGuests = Number(formData.get("numGuests"));

	const observations = formData.get("observations")?.slice(0, 1000).toString();

	await updateBooking(booking.id, { numGuests, observations });
	revalidatePath("/account/reservations");
	revalidatePath(`/account/reservations/edit/${booking.id}`);
	redirect("/account/reservations");
}

export async function signInAction() {
	await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
	await signOut({ redirectTo: "/" });
}
