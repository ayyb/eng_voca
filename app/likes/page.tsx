import LikeWordsList from "@/ui/Likes/LikeWordsList";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import BackButton from "@/components/common/BackButton";

export default async function LikesPage() {
  const session = await auth();
  if (!session?.user?.id) redirect('/login');
  
  const memberId = parseInt(session.user.id);

  return (
    <div className="p-8 pb-24">
      <BackButton />
      <LikeWordsList memberId={memberId} />
    </div>
  );
}
