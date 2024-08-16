import { getBookedDatesByCabinId, getCabin } from "@/app/_lib/data-service";

import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { NextRequest } from "next/server";

export async function GET(
	_request: Request | NextRequest,
	{ params }: { params: Params },
) {
	try {
		const [cabin, bookedDates] = await Promise.all([
			getCabin(params.cabinId),
			getBookedDatesByCabinId(params.cabinId),
		]);

		return Response.json({ cabin, bookedDates });
	} catch (err) {
		return Response.json({ message: "Cabin not found" });
	}
}
