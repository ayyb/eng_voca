export default function MemberPage() {
  return (
    <>
      <div className="p-3 w-full h-full ">
        <p className="text-4xl font-bold mb-9">My Page</p>

        <div className="flex flex-col w-full space-y-4 flex-1 mb-9">
          {/* name, id, levels, member since */}
          <div className="flex flex-col w-full">
            <label className="text-lg">Name</label>
            <input
              type="text"
              className="border-b-2 border-gray-300 p-2 focus:outline-none focus:border-blue-500"
              value="Myeong Seop Lee"
            />
          </div>
          <div className="flex flex-col w-full">
            <label className="text-lg">ID</label>
            <input
              type="text"
              className="border-b-2 border-gray-300 p-2 focus:outline-none focus:border-blue-500"
              value="rabbitistokki"
            />
          </div>
          <div className="flex flex-col w-full">
            <label className="text-lg">Levels</label>
            <input
              type="text"
              className="border-b-2 border-gray-300 p-2 focus:outline-none focus:border-blue-500"
              value="beginner"
            />
          </div>
          <div className="flex flex-col w-full">
            <label className="text-lg">Member Since</label>
            <input
              type="text"
              className="border-b-2 border-gray-300 p-2 focus:outline-none focus:border-blue-500"
              value="2023. 04. 27"
            />
          </div>
        </div>
        <button className="bg-black text-white p-2 rounded-lg mt-4 flex mx-auto">
          Change Password
        </button>

        {/* password change form */}
        <div className="hidden">
          <div className="flex flex-col w-full">
            <input
              type="text"
              className="border-b-2 border-gray-300 p-2 focus:outline-none focus:border-blue-500"
              placeholder="Current Password"
            />
          </div>
          <div className="flex flex-col w-full">
            <input
              type="text"
              className="border-b-2 border-gray-300 p-2 focus:outline-none focus:border-blue-500"
              placeholder="Password to be changed"
            />
          </div>
          <div className="flex flex-col w-full">
            <input
              type="text"
              className="border-b-2 border-gray-300 p-2 focus:outline-none focus:border-blue-500"
              placeholder="reconfirm Password"
            />
          </div>
          <button className="bg-black text-white p-2 rounded-lg mt-4 flex mx-auto">
            OK
          </button>
        </div>
      </div>
    </>
  );
}
