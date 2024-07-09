import NavFooter from "@/components/NavFooter";

export default function MemberLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  {
    /* {children} */
  }
  return (
    <>
      <div className="bg-black flex items-center justify-center min-h-screen">
        <div className="bg-white p-4 w-full max-w-md h-screen flex flex-col items-center justify-center">
          {children}
          <NavFooter />  
        </div>
        
      </div>
    </>
  );
}
