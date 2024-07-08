export default function QuizPage() {
  return (
    <>
      <div className="p-4 w-full h-full">
        <div className="mb-5">
          <p className="text-4xl font-bold">Quiz</p>
        </div>
        <p className="text-xl mt-4">Select a range</p>
        <div className="flex flex-col space-y-4 mt-5 mb-10 w-full">
          <div className="bg-white rounded-lg box-border border-1  h-14">
            <div className="p-3 flex ml-4">
              <p className="text-xl">Likes</p>
              <div className="flex ml-auto px-4 items-center">
                <input type="checkbox" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg box-border border-1  h-14">
            <div className="p-3 flex ml-4">
              <p className="text-xl">Beginner</p>
              <div className="flex ml-auto px-4 items-center">
                <input type="checkbox" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg box-border border-1  h-14">
            <div className="p-3 flex ml-4">
              <p className="text-xl">Intermediate</p>
              <div className="flex ml-auto px-4 items-center">
                <input type="checkbox" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg box-border border-1  h-14">
            <div className="p-3 flex ml-4">
              <p className="text-xl">Advanced</p>
              <div className="flex ml-auto px-4 items-center">
                <input type="checkbox" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg box-border border-1 border-red-300 h-14">
            <div className="p-3 flex ml-4">
              <p className="text-xl">Expert</p>
              <div className="flex ml-auto px-4 items-center">
                <input type="checkbox" />
              </div>
            </div>
          </div>
        </div>
        <div className="h-1/4">
          <p className="text-xl font-bold">Count</p>
          <select className="w-1/4 h-10 border-2 border-gray-300 rounded-lg p-2">
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
          </select>
        </div>

        <div className="">
            <button className="bg-gray-400 text-white p-3 mt-2 rounded w-full " id="start">
                Start
            </button>
        </div>
      </div>
    </>
  );
}
