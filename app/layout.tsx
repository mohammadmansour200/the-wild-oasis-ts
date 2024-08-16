import "@/app/_styles/globals.css";
import { Metadata } from "next";
import { Josefin_Sans } from "next/font/google";
import Header from "./_components/Header";
import { ReservationProvider } from "./context/ReservationContext";

const josefin = Josefin_Sans({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
	title: {
		template: "%s - The Wild Oasis",
		default: "The Wild Oasis",
	},
	description:
		"Luxurious cabin hotel, located in the heart of Egypt (Lake Qarun), Known for its deep blue waters and surrounding golden dunes.",
};
export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${josefin.className} antialiased bg-primary-950 text-primary-100 min-h-screen flex flex-col`}
			>
				<Header />
				<div className="flex-1 grid">
					<main className="max-w-7xl mx-auto w-full">
						<ReservationProvider>{children}</ReservationProvider>
					</main>
				</div>
			</body>
		</html>
	);
}
