import NavFooter from "@/components/NavFooter";

export default function LevelsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white">
      <div className="w-full max-w-md mx-auto min-h-screen flex flex-col 
                    border border-gray-200 shadow-lg relative bg-customBlue">
        {children}
        <NavFooter />
      </div>
    </div>
  );
}
