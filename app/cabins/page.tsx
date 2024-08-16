import { FilterType } from "@/types/globalTypes.types";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { Suspense } from "react";
import CabinList from "../_components/CabinList";
import Filter from "../_components/Filter";
import ReservationReminder from "../_components/ReservationReminder";
import Spinner from "../_components/Spinner";

export const revalidate = 3600;

export const metadata = {
	title: "Cabins",
};

interface ICabinsPageProps {
	searchParams: Params;
}
export default function Page({ searchParams }: ICabinsPageProps) {
	const filter: FilterType = searchParams?.capacity ?? "all";
	return (
		<div>
			<h1 className="text-4xl mb-5 py-12 text-accent-400 font-medium">
				Our Luxury Cabins
			</h1>
			<p className="text-primary-200 text-lg mb-10 mx-3">
				Cozy yet luxurious cabins, located right in the heart of the Egypt's
				deserts near Lake Qarun. Imagine waking up to beautiful golden sand
				dunes, spending your days sand-skating or stargazing, or just relaxing
				in your private hot tub under the stars. Enjoy nature's beauty in your
				own little home away from home. The perfect spot for a peaceful, calm
				vacation. Welcome to paradise.
			</p>
			<div className="flex justify-end mb-8">
				<Filter />
			</div>
			<Suspense key={filter} fallback={<Spinner />}>
				<CabinList filter={filter} />
				<ReservationReminder />
			</Suspense>
		</div>
	);
}
