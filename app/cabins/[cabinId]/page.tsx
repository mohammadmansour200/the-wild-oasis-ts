import Cabin from "@/app/_components/Cabin";
import Reservation from "@/app/_components/Reservation";
import Spinner from "@/app/_components/Spinner";
import { getCabin } from "@/app/_lib/data-service";
import { Metadata } from "next";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { Suspense } from "react";

export const revalidate = 86400;

export const metadata: Metadata = {
	title: "",
};

interface ICabinPageProps {
	params: Params;
}

export default async function Page({ params }: ICabinPageProps) {
	const cabin = await getCabin(params.cabinId);
	const { name, description } = cabin;

	metadata.title = name;
	metadata.description = description;

	return (
		<div className="flex justify-center items-center flex-col mt-8">
			<Cabin cabin={cabin} />
			<div>
				<h2 className="text-5xl font-semibold text-center">
					Reserve {name} today. Pay on arrival.
				</h2>
				<hr className="my-4" />
				<Suspense fallback={<Spinner />}>
					<Reservation cabin={cabin} />
				</Suspense>
			</div>
		</div>
	);
}
