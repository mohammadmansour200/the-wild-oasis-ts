export type Database = {
	public: {
		Tables: {
			bookings: {
				Row: {
					cabinId: number;
					cabinPrice: number;
					created_at: string;
					endDate: string;
					extrasPrice: number;
					guestId: number;
					hasBreakfast: boolean;
					id: number;
					isPaid: boolean;
					numGuests: number;
					numNights: number;
					observations: string;
					startDate: string;
					status: string;
					totalPrice: number;
					cabins: Database["public"]["Tables"]["cabins"]["Row"];
				};
				Insert: {
					cabinId?: number;
					cabinPrice?: number;
					created_at?: string;
					endDate?: Date | string;
					extrasPrice?: number;
					guestId?: number;
					hasBreakfast?: boolean;
					id?: number;
					isPaid?: boolean;
					numGuests?: number;
					numNights?: number;
					observations?: string;
					startDate?: Date | string;
					status?: string;
					totalPrice?: number;
				};
				Update: {
					cabinId?: number | null;
					cabinPrice?: number | null;
					created_at?: string;
					endDate?: string | null;
					extrasPrice?: number | null;
					guestId?: number | null;
					hasBreakfast?: boolean | null;
					id?: number;
					isPaid?: boolean | null;
					numGuests?: number | null;
					numNights?: number | null;
					observations?: string | null;
					startDate?: string | null;
					status?: string | null;
					totalPrice?: number | null;
				};
			};
			cabins: {
				Row: {
					created_at: string;
					description: string;
					discount: number;
					id: number;
					image: string;
					maxCapacity: number;
					name: string;
					regularPrice: number;
				};
				Insert: {
					created_at: string;
					description: string;
					discount: number;
					id: number;
					image: string;
					maxCapacity: number;
					name: string;
					regularPrice: number;
				};
				Update: {
					created_at: string;
					description: string;
					discount: number;
					id: number;
					image: string;
					maxCapacity: number;
					name: string;
					regularPrice: number;
				};
			};
			guests: {
				Row: {
					created_at: string;
					email: string;
					fullName: string;
					id: number;
					countryFlag: string | null;
					nationalID: string | null;
					nationality: string | null;
				};
				Insert: {
					countryFlag?: string | null;
					created_at?: string;
					email?: string;
					fullName?: string;
					id?: number;
					nationalID?: string | null;
					nationality?: string | null;
				};
				Update: {
					countryFlag?: string | null;
					created_at?: string;
					email?: string;
					fullName?: string;
					id?: number;
					nationalID?: string | null;
					nationality?: string | null;
				};
			};
			settings: {
				Row: {
					breakfastPrice: number;
					created_at: string;
					id: number;
					maxBookingLength: number;
					maxGuestsPerBooking: number;
					minBookingLength: number;
				};
				Insert: {
					breakfastPrice?: number | null;
					created_at?: string;
					id?: number;
					maxBookingLength?: number | null;
					maxGuestsPerBooking?: number | null;
					minBookingLength?: number | null;
				};
				Update: {
					breakfastPrice?: number | null;
					created_at?: string;
					id?: number;
					maxBookingLength?: number | null;
					maxGuestsPerBooking?: number | null;
					minBookingLength?: number | null;
				};
			};
		};
	};
};

export interface ICabinInsert
	extends Omit<Database["public"]["Tables"]["cabins"]["Update"], "image"> {
	image: FileList | string;
}
