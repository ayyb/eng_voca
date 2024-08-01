export interface Word {
    word_no: number; //단어번호
    word: string;
    word_kr:string;
    definition: string;
    example: string;
    example_kr: string;
    pronunce: string;
    word_level: number;
    part_of_speech?: string;
    translation?: string;
    liked:boolean;
  }