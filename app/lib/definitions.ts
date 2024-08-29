export type MemberInfo = {
  no: number;
  name: string;
  id: string;
  created_at: string;
  member_level: number;
};

export type Words = {
  word_no: number;
  id: number;
  word: string;
  word_kr: string;
  definition: string;
  example: string;
  example_kr: string;
  liked_at: string; // Assuming this is part of the data
  voca_id: number;
  isHidden?: boolean;
};

export interface LikeWordsListProps {
  memberId: number;
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
  memberId: number;
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

export interface QuizResultDetail {
  example: string;
  example_kr: string;
  answer: string;
  choice_answer: string;
}

export interface QuizAnswer {
  example: string;
  example_kr: string;
  answer: string;
  choice_answer: string;
}

export interface QuizResult {
  userId?: string;
  score: number;
  total_count: number;
  answers: QuizAnswer[];
}

export interface Answers {
  word: string;
  example: string;
  example_kr: string;
}