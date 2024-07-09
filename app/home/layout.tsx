import NavFooter from "@/components/NavFooter";

export default function MainLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  {
    /* {children} */
  }
  return (
    <>
      <div className="bg-white flex items-center justify-center min-h-screen">
        <div className="bg-customBlue p-4 w-full max-w-md h-screen flex flex-col items-center justify-center">
          {children}
          <NavFooter />  
        </div>
        
      </div>
    </>
  );
}
