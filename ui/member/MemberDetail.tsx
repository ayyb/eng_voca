"use client";
import { updatePassword, verifyCurrentPassword } from "@/app/api/actions";
import { useState } from "react";
import { MemberInfo } from "@/app/lib/definitions";
import Button from "@/components/common/Button";

const MemberDetail = () => {
  const [isHidden, setIsHidden] = useState(true);
  const [memberInfo, setMemberInfo] = useState<MemberInfo | null>(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [currentPassword, setCurrentPassword] = useState("");
  const [currentPasswordError, setCurrentPasswordError] = useState(false);

  const changePasswordOpen = () => {
    setIsHidden(!isHidden);
    // 폼 초기화
    setPassword("");
    setConfirmPassword("");
    setPasswordMatch(true);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    // 비밀번호 일치 여부 확인
    if (confirmPassword) {
      setPasswordMatch(e.target.value === confirmPassword);
    }
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(e.target.value);
    setPasswordMatch(e.target.value === password);
  };

  const changePassword = async () => {
    if (!passwordMatch) {
      alert("새 비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      // 현재 비밀번호 검증
      const { isValid } = await verifyCurrentPassword(currentPassword);

      if (!isValid) {
        setCurrentPasswordError(true);
        alert("현재 비밀번호가 올바르지 않습니다.");
        return;
      }

      // 비밀번호 변경
      const { message } = await updatePassword(password);
      if (message === "success") {
        alert("비밀번호가 변경되었습니다.");
        setIsHidden(true);
        // 모든 상태 초기화
        setPassword("");
        setConfirmPassword("");
        setCurrentPassword("");
        setCurrentPasswordError(false);
      } else {
        alert("비밀번호 변경에 실패했습니다.");
      }
    } catch (error) {
      alert("오류가 발생했습니다.");
      console.error(error);
    }
  };

  return (
    <>
      <div className="w-full mt-4 space-y-4 mb-10">
        <button
          className="w-full bg-black text-white p-3 rounded-lg
                   hover:bg-gray-800 transition-colors duration-200"
          onClick={changePasswordOpen}
        >
          Change Password
        </button>
      </div>

      <div className={isHidden ? "hidden" : "w-full mt-8 space-y-4"}>
        <div className="flex flex-col w-full">
          <input
            type="password"
            className="w-full border-b-2 p-2 focus:outline-none focus:border-blue-500
              ${currentPasswordError ? 'border-red-500' : 'border-gray-300'}"
            placeholder="Current Password"
            value={currentPassword}
            onChange={(e) => {
              setCurrentPassword(e.target.value);
              setCurrentPasswordError(false);
            }}
          />
          {currentPasswordError && (
            <span className="text-red-500 text-sm mt-1">
              현재 비밀번호가 올바르지 않습니다.
            </span>
          )}
        </div>

        <div className="flex flex-col w-full">
          <input
            type="password"
            className="w-full border-b-2 border-gray-300 p-2 focus:outline-none focus:border-blue-500"
            placeholder="New Password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>

        <div className="flex flex-col w-full">
          <input
            type="password"
            className="w-full border-b-2 border-gray-300 p-2 focus:outline-none focus:border-blue-500"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
          {!passwordMatch && confirmPassword && (
            <span className="text-red-500 text-sm mt-1">
              비밀번호가 일치하지 않습니다.
            </span>
          )}
          {passwordMatch && confirmPassword && (
            <span className="text-green-500 text-sm mt-1">
              비밀번호가 일치합니다.
            </span>
          )}
        </div>

        <Button
          onClick={changePassword}
          disabled={
            !passwordMatch || !password || !confirmPassword || !currentPassword
          }
        >
          Ok
        </Button>
      </div>
    </>
  );
};

export default MemberDetail;
