"use client";

import { FilterType } from "@/types/globalTypes.types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

function Filter() {
	return (
		<div className="border border-primary-800 flex">
			<Button filter="all">All cabins</Button>
			<Button filter="small">2&mdash;3 guests</Button>
			<Button filter="medium">4&mdash;7 guests</Button>
			<Button filter="large">8&mdash;12 guests</Button>
		</div>
	);
}
interface IButtonProps {
	filter: FilterType;

	children: string;
}
function Button({ filter, children }: IButtonProps) {
	const searchParams = useSearchParams();
	const router = useRouter();
	const pathname = usePathname();

	const activeFilter = searchParams.get("capacity") ?? "all";

	function handleFilter(filter: FilterType) {
		const params = new URLSearchParams(searchParams);
		params.set("capacity", filter);
		router.replace(`${pathname}?${params.toString()}`, { scroll: false });
	}

	return (
		<button
			onClick={() => handleFilter(filter)}
			className={`px-5 py-2 hover:bg-primary-700 ${filter === activeFilter ? "bg-primary-700 text-primary-50" : ""}`}
		>
			{children}
		</button>
	);
}

export default Filter;
