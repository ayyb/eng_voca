'use client';
import { useUserStore } from "@/store/userStore";
import { useEffect } from "react";

interface UserInfoProps {
  member: {
    username: string;
    name: string;
    created_at: string;
    member_level: number;
  };
}

export function UserInfo({ member }: UserInfoProps) {
  const { setUser } = useUserStore();

  useEffect(() => {
    setUser(member.username, member.name);
  }, [member]);

  return (
    <p className="text-3xl font-bold text-white w-full">
      Hello, {member.name}!
    </p>
  );
} 