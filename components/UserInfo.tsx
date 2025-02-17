'use client';
import { useUserStore } from "@/store/userStore";
import { useEffect } from "react";

interface UserInfoProps {
  member: {
    id: string;
    name: string;
    member_level: number;
  };
}

export function UserInfo({ member }: UserInfoProps) {
  const { setUser } = useUserStore();

  useEffect(() => {
    setUser(member.id, member.name);
  }, [member]);

  return (
    <p className="text-3xl font-bold text-white w-full">
      Hello, {member.name}!
    </p>
  );
} 