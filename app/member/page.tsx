"use client";
import { fetchMember } from "@/app/api/actions";
import { useState, useEffect } from "react";
import { MemberInfo } from "@/app/lib/definitions";

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



export default function MemberPage() {
  // useState 훅을 사용하여 상태 관리
  const [isHidden, setIsHidden] = useState(true);
  const [memberInfo, setMemberInfo] = useState<MemberInfo | null>(null);
  const changePasswordOpen = () => {
    setIsHidden(!isHidden);
  };
  useEffect(() => {
    async function fetchData() {
      const [info] = await fetchMember();
      console.log("member 정보", info);
      setMemberInfo(info);
    }
    fetchData();
  }, []);

  if (!memberInfo) { //member가 null이면 조건부 렌더링
    return <div>Loading...</div>;
  }
  
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
              value={memberInfo.name}
              readOnly
            />
          </div>
          <div className="flex flex-col w-full">
            <label className="text-lg">ID</label>
            <input
              type="text"
              className="border-b-2 border-gray-300 p-2 focus:outline-none focus:border-blue-500"
              value={memberInfo.id}
              readOnly
            />
          </div>
          <div className="flex flex-col w-full">
            <label className="text-lg">Levels</label>
            <input
              type="text"
              className="border-b-2 border-gray-300 p-2 focus:outline-none focus:border-blue-500"
              value={getMemberLevelText(memberInfo.member_level)}
              readOnly
            />
          </div>
          <div className="flex flex-col w-full">
            <label className="text-lg">Member Since</label>
            <input
              type="text"
              className="border-b-2 border-gray-300 p-2 focus:outline-none focus:border-blue-500"
              value={memberInfo.created_at}
              readOnly
            />
          </div>
        </div>
        <button
          className="bg-black text-white p-2 rounded-lg mt-4 flex mx-auto"
          onClick={() => {
            changePasswordOpen();
          }}
        >
          Change Password
        </button>

        {/* 비밀번호 변경 */}
        {/* isHidden이 true이면 hidden */}
        <div className={isHidden ? 'hidden' : ''}>
          <div className="flex flex-col w-full">
            <input
              type="text"
              className="border-b-2 border-gray-300 p-2 focus:outline-none focus:border-blue-500"
              placeholder="Current Password"
              readOnly
            />
          </div>
          <div className="flex flex-col w-full">
            <input
              type="text"
              className="border-b-2 border-gray-300 p-2 focus:outline-none focus:border-blue-500"
              placeholder="Password to be changed"
              readOnly
            />
          </div>
          <div className="flex flex-col w-full">
            <input
              type="text"
              className="border-b-2 border-gray-300 p-2 focus:outline-none focus:border-blue-500"
              placeholder="reconfirm Password"
              readOnly
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
