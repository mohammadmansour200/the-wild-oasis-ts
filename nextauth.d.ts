import { AdapterUser } from "next-auth/adapters";

declare module "next-auth" {
	interface User extends AdapterUser {
		guestId: number;
	}

	interface Session extends DefaultSession {
		user?: User;
	}
}
