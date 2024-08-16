import { getCabins } from "@/app/_lib/data-service";
import { FilterType } from "@/types/globalTypes.types";
import CabinCard from "./CabinCard";

interface ICabinListProps {
	filter: FilterType;
}
async function CabinList({ filter }: ICabinListProps) {
	const cabins = await getCabins(filter);
	if (!cabins.length) return;

	return (
		<div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
			{cabins.map((cabin) => (
				<CabinCard cabin={cabin} key={cabin.id} />
			))}
		</div>
	);
}

export default CabinList;
