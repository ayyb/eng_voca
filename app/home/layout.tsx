import NavFooter from "@/components/NavFooter";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white p-4">
      <div className="w-full max-w-md mx-auto min-h-screen flex flex-col 
                    border border-gray-200 rounded-2xl shadow-lg relative bg-customBlue">
        <div className="flex-1 pt-12">
          {children}
        </div>
        <NavFooter />
      </div>
    </div>
  );
}
