import Link from "next/link";
import { HomeIcon,UserIcon,PuzzlePieceIcon,SparklesIcon,HandThumbUpIcon } from "@heroicons/react/24/solid";

export default function NavFooter() {
  return (
    <>
      <div className="bg-gray-800 text-white w-full py-4 fixed bottom-0 max-w-md">
        <div className="flex justify-around">
          <Link href="/likes"><HandThumbUpIcon className="size-6 text-black-500"/></Link>
          <Link href="/quiz"><PuzzlePieceIcon className="size-6 text-black-500"/></Link>
          <Link href="/home"><HomeIcon className="size-6 text-black-500"/></Link>
          <Link href="/levels"><SparklesIcon className="size-6 text-black-500"/></Link>
          <Link href="/member"><UserIcon className="size-6 text-black-500"/></Link>
        </div>
      </div>
    </>
  );
}
