"use client";
import { createContext, useContext, useState } from "react";
import { DateRange } from "react-day-picker";

const initialState: DateRange = {
	from: undefined,
	to: undefined,
};

const ReservationContext = createContext({
	range: initialState,
	setRange: (_range: DateRange) => {},
	resetRange: () => {},
});

interface IReservationContextProps {
	children: React.ReactNode;
}
function ReservationProvider({ children }: IReservationContextProps) {
	const [range, setRange] = useState<DateRange>(initialState);

	const resetRange = () => setRange(initialState);

	return (
		<ReservationContext.Provider value={{ range, setRange, resetRange }}>
			{children}
		</ReservationContext.Provider>
	);
}

function useReservation() {
	const context = useContext(ReservationContext);

	if (context === undefined)
		throw new Error("Context was used outside provider");

	return context;
}

export { useReservation, ReservationProvider };
