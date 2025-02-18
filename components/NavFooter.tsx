import Link from "next/link";
import { HomeIcon, UserIcon, PuzzlePieceIcon, SparklesIcon, HandThumbUpIcon } from "@heroicons/react/24/solid";

export default function NavFooter() {
  return (
    <div className="absolute bottom-0 w-full bg-gray-800 rounded-b-2xl">
      <div className="flex justify-around py-4">
        <Link href="/likes"><HandThumbUpIcon className="size-6 text-white"/></Link>
        <Link href="/quiz"><PuzzlePieceIcon className="size-6 text-white"/></Link>
        <Link href="/home"><HomeIcon className="size-6 text-white"/></Link>
        <Link href="/levels"><SparklesIcon className="size-6 text-white"/></Link>
        <Link href="/member"><UserIcon className="size-6 text-white"/></Link>
      </div>
    </div>
  );
}
