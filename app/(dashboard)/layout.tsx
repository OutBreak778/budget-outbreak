import Header from "@/components/Header";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div suppressHydrationWarning>
      <Header />
      <main className="px-4 lg:px-12">{children}</main>
    </div>
  );
};

export default DashboardLayout;
