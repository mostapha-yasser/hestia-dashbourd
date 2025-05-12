import Aside from "@/components/fixedComponents/Aside";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex w-full">
      <Aside />
      {children}
    </div>
  );
}
