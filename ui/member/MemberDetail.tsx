"use client";
import { updatePassword, verifyCurrentPassword } from "@/app/api/actions";
import { useState } from "react";
import { MemberInfo } from "@/app/lib/definitions";
import Button from "@/components/common/Button";
import { useRouter } from "next/navigation";
import { signOut } from "@/auth";

const MemberDetail = () => {
  const [isHidden, setIsHidden] = useState(true);
  const [memberInfo, setMemberInfo] = useState<MemberInfo | null>(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [currentPassword, setCurrentPassword] = useState("");
  const [currentPasswordError, setCurrentPasswordError] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();

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

  const handleLogout = async () => {
    try {
      await signOut();
      router.push("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="space-y-16">
      {isEditing ? (
        <div className="space-y-12">
          <div className="flex flex-col w-full">
            <label className="text-sm text-gray-500 mb-1">Current Password</label>
            <input
              type="password"
              className="border-b-2 border-gray-300 p-2 focus:outline-none focus:border-blue-500"
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
            <label className="text-sm text-gray-500 mb-1">New Password</label>
            <input
              type="password"
              className="border-b-2 border-gray-300 p-2 focus:outline-none focus:border-blue-500"
              placeholder="New Password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>

          <div className="flex flex-col w-full">
            <label className="text-sm text-gray-500 mb-1">Confirm Password</label>
            <input
              type="password"
              className="border-b-2 border-gray-300 p-2 focus:outline-none focus:border-blue-500"
              placeholder="Confirm Password"
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

          <div className="mt-8">
            <Button onClick={() => setIsEditing(false)}>
              OK
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <Button onClick={() => setIsEditing(true)}>
            Change Password
          </Button>

          <Button variant="white" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      )}
    </div>
  );
};

export default MemberDetail;
