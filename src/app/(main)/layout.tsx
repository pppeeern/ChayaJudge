import SideNav from "@/components/(main)/sidenav";
import Header from "@/components/(main)/header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-screen h-screen overflow-hidden">
      <div className="grid grid-cols-[16%_1fr] w-full h-full">
        <SideNav />
        <div className="w-full h-full">
          <Header />
          <main>{children}</main>
        </div>
      </div>
    </div>
  );
}
