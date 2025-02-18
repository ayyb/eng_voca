import NavFooter from "@/components/NavFooter";

export default function MemberLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white p-4">
      <div className="w-full max-w-md mx-auto min-h-screen flex flex-col 
                    border border-gray-200 rounded-2xl shadow-lg relative">
        {/* <div className="bg-black flex items-center justify-center min-h-screen">
          <div className="bg-white p-4 w-full max-w-md h-screen flex flex-col items-center justify-center"> */}
            {children}
          {/* </div>
          
        </div> */}
        <NavFooter />
      </div>
    </div>
  );
}
