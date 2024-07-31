export type MemberInfo = {
    no: number;
    name: string;
    id: string;
    created_at: string;
    member_level: number;
  }

  export type Words = {
    no: number;
    id: number;
    word: string;
    definition: string;
    liked_at: string; // Assuming this is part of the data
    voca_id: number;
  };
  
  export interface LikeWordsListProps {
    initialWords: Words[];
    memberId:number;
    userId:string;
  }

  export type Voca = {
    no: number;
    word: string;
    definition: string;
    example: string;
    pronunce: string;
    word_level: number;
  };

export interface LikeWordsProps {
    likeWord: Words;
    memberId:number;
}

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};


export interface Choice {
  word: string;
  isAnswer: boolean;
}