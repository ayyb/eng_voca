export interface Word {
    no: number; //단어번호
    word: string;
    definition: string;
    example: string;
    pronunce: string;
    word_level: number;
    part_of_speech?: string;
    translation?: string;
    liked:boolean;
  }