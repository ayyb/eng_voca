import { fetchMember } from "@/app/api/actions";
import LikeWordsList from "@/ui/Likes/LikeWordsList";
import BackButton from "@/components/common/BackButton";

export default async function LikesPage() {
  const member = await fetchMember();
  const memberId = member.no;

  return (
    <div className="p-8">
      <BackButton />
      <LikeWordsList memberId={memberId} />
    </div>
  );
}
