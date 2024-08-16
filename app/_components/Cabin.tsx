import { Database } from "@/types/database.types";
import { EyeSlashIcon, MapPinIcon, UsersIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import TextExpander from "./TextExpander";

interface ICabinProps {
	cabin: Database["public"]["Tables"]["cabins"]["Row"];
}
function Cabin({ cabin }: ICabinProps) {
	const { image, name, description, maxCapacity } = cabin;
	return (
		<div className="mb-10 flex w-[90vw] flex-col items-center justify-center gap-10 py-3 min-[900px]:flex-row min-[900px]:items-start min-[900px]:gap-20">
			<div className="relative aspect-square h-[300px] w-[300px]">
				<Image
					className="object-cover"
					fill
					src={image}
					alt={`Cabin ${name}`}
				/>
			</div>
			<div className="flex items-center w-[90vw] gap-2 min-[900px]:w-[50vw]">
				<div>
					<h3 className="mb-2 w-[100%] bg-primary-950 p-6 pb-1 text-7xl font-black text-accent-100">
						Cabin {name}
					</h3>

					<p className="mb-5 w-fit whitespace-normal break-words text-lg text-primary-300">
						<TextExpander>{description}</TextExpander>
					</p>

					<ul className="mb-7 flex flex-col gap-4">
						<li className="flex items-center gap-3">
							<UsersIcon className="h-5 w-5 text-primary-600" />
							<span className="text-lg">
								For up to <span className="font-bold">{maxCapacity}</span>{" "}
								guests
							</span>
						</li>
						<li className="flex items-center gap-3">
							<MapPinIcon className="h-5 w-5 text-primary-600" />
							<span className="text-lg">
								Located in the heart of{" "}
								<span className="font-bold">Egypt (Lake Qarun)</span>
							</span>
						</li>
						<li className="flex items-center gap-3">
							<EyeSlashIcon className="h-5 w-5 text-primary-600" />
							<span className="text-lg">
								Privacy <span className="font-bold">100%</span> guaranteed
							</span>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
}

export default Cabin;
