import SideNavigation from "../_components/SideNavigation";

function Layout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className="grid grid-cols-[16rem_1fr] h-full gap-12">
			<SideNavigation />
			<div className="mt-2">{children}</div>
		</div>
	);
}

export default Layout;
