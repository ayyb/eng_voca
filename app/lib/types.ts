export interface Word {
    id: number; //단어번호
    word: string;
    definition:string;
    definition_kr: string;
    example: string;
    example_kr: string;
    pronunciation: string;
    word_level: number;
    part_of_speech?: string;
    translation?: string;
    liked:boolean;
  }