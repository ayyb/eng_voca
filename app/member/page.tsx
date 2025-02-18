import { fetchMember } from "@/app/api/actions";
import MemberDetail from "@/ui/member/MemberDetail";
import BackButton from "@/components/common/BackButton";

const getMemberLevelText = (level: Number) => {
  switch (level) {
    case 1:
      return "Beginner";
    case 2:
      return "Intermediate";
    case 3:
      return "Advanced";
    default:
      return "Unknown";
  }
};
// MemberInfo 타입 정의

export default async function MemberPage() {
  const memberInfo = await fetchMember();
  
  return (
    <div className="p-8">
      <BackButton />

      {/* 상단 텍스트 영역 */}
      <div className="mt-8 mb-12">
        <p className="font-bold text-4xl text-black">My Page</p>
      </div>

      {/* 프로필 정보 영역 */}
      <div className="flex-1">
        <div className="space-y-12">
          <div className="flex flex-col w-full">
            <label className="text-sm text-gray-500 mb-1">Name</label>
            <input
              type="text"
              className="border-b-2 border-gray-300 p-2 focus:outline-none focus:border-blue-500"
              value={memberInfo.name}
              readOnly
            />
          </div>

          <div className="flex flex-col w-full">
            <label className="text-sm text-gray-500 mb-1">ID</label>
            <input
              type="text"
              className="border-b-2 border-gray-300 p-2 focus:outline-none focus:border-blue-500"
              value={memberInfo.id}
              readOnly
            />
          </div>

          <div className="flex flex-col w-full">
            <label className="text-sm text-gray-500 mb-1">Level</label>
            <input
              type="text"
              className="border-b-2 border-gray-300 p-2 focus:outline-none focus:border-blue-500"
              value={getMemberLevelText(memberInfo.member_level)}
              readOnly
            />
          </div>

          <div className="flex flex-col w-full">
            <label className="text-sm text-gray-500 mb-1">Member Since</label>
            <input
              type="text"
              className="border-b-2 border-gray-300 p-2 focus:outline-none focus:border-blue-500"
              value={memberInfo.created_at}
              readOnly
            />
          </div>
        </div>

        {/* Change Password 버튼 영역 */}
        <div className="mt-16">
          <MemberDetail />
        </div>
      </div>
    </div>
  );
}
