import { useState, useEffect } from 'react';
import { EyeIcon, HeartIcon, SpeakerWaveIcon } from "@heroicons/react/24/solid";
import {
  HeartIcon as EmptyHeart,
  EyeIcon as EmptyEye,
} from "@heroicons/react/24/outline";
import { addLikeWord, deleteLikeWord } from "@/app/api/actions";

interface WordComponentProps {
    currentWord: {
        no: number;
        liked: boolean;
    };
    memberId: number;
    }

const WordComponent = ({ currentWord, memberId } : WordComponentProps) => {
  const [liked, setLiked] = useState(currentWord.liked);
  const [optimisticLiked, setOptimisticLiked] = useState(currentWord.liked);

  useEffect(() => {
    setLiked(currentWord.liked);
    setOptimisticLiked(currentWord.liked); //낙관적 업데이트
  }, [currentWord]);

  const handleClick = async () => {
    const Likes = {
      word: currentWord.no,
      member: memberId,
    };

    setOptimisticLiked(!optimisticLiked);

    try {
      if (!liked) {
        await addLikeWord(Likes);
      } else {
        await deleteLikeWord(Likes);
      }
      setLiked(!liked);
    } catch (error) {
      // 요청 실패 시 optimisticLiked 상태를 원래대로 롤백
      setOptimisticLiked(liked);
      console.error('Failed to update like status', error);
    }
  };

  return (
    <p onClick={handleClick} className="cursor-pointer">
      {optimisticLiked ? (
        <HeartIcon className="size-6 text-black-500" />
      ) : (
        <EmptyHeart className="size-6 text-black-500" />
      )}
    </p>
  );
};

export default WordComponent;