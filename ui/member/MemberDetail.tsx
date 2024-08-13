"use client";
import { fetchMember,updatePassword } from "@/app/api/actions";
import { useState, useEffect, ReactEventHandler } from "react";
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
interface MemberDetailProps {
  userId: string;
}

const MemberDetail = ({ userId }: MemberDetailProps) => {
  console.log("userId", userId);
  // useState 훅을 사용하여 상태 관리
  const [isHidden, setIsHidden] = useState(true);
  const [memberInfo, setMemberInfo] = useState<MemberInfo | null>(null);
  //변경할 비밀번호
  const [password, setPassword] = useState('');
  const changePasswordOpen = () => {
    setIsHidden(!isHidden);
  };
  useEffect(() => {
    async function fetchData() {
      
      if (userId) {
        const info = await fetchMember(userId);
        console.log("member 정보", info);
        setMemberInfo(info);
      }
    }
    fetchData();
  }, []);

  if (!memberInfo) {
    //member가 null이면 조건부 렌더링
    return <div>Loading...</div>;
  }
  
  //비밀번호 변경
  const changePassword = async() => {
    //비밀번호 변경 로직
    const id = userId;
    console.log(password)
    const {message} = await updatePassword(password,id);
    if(message === 'success') {
      alert('변경 되었습니다.')
    } else {
      alert('변경이 실패하였습니다.')
    }
  };

  const setChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  }
  return (
    <>
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
      <div className={isHidden ? "hidden" : ""}>
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
            //여기 value값을 전송
            onChange={(e) => {
              setChangePassword(e);
            }}
          />
        </div>
        <div className="flex flex-col w-full">
          <input
            type="text"
            className="border-b-2 border-gray-300 p-2 focus:outline-none focus:border-blue-500"
            placeholder="reconfirm Password"
          />
        </div>
        <button className="bg-black text-white p-2 rounded-lg mt-4 flex mx-auto" onClick={changePassword}>
          OK
        </button>
      </div>
    </>
  );
};

export default MemberDetail;
