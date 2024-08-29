"use client";
import { updatePassword } from "@/app/api/actions";
import { useState } from "react";
import { MemberInfo } from "@/app/lib/definitions";

const MemberDetail = () => {
  // useState 훅을 사용하여 상태 관리
  const [isHidden, setIsHidden] = useState(true);
  const [memberInfo, setMemberInfo] = useState<MemberInfo | null>(null);
  //변경할 비밀번호
  const [password, setPassword] = useState('');
  const changePasswordOpen = () => {
    setIsHidden(!isHidden);
  };
  
  //비밀번호 변경
  const changePassword = async() => {
    //비밀번호 변경 로직
    const {message} = await updatePassword(password);
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
