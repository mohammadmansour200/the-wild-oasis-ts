import SideNavigation from "../_components/SideNavigation";

function Layout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className="min-[900px]:grid grid-cols-[16rem_1fr] h-full gap-6">
			<SideNavigation />
			<hr className="my-6 md:hidden md:my-0" />
			<div className="mt-2">{children}</div>
		</div>
	);
}

export default Layout;
