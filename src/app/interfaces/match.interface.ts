export interface PartyMatch {
  party: string;
  color: string;
  match: number;
  matchByQuestion: { [key: string]: number };
}

export interface QuestionMatch {
  question: string;
  partyMatches: { [key: string]: number };
}

export type QuestionMatchMap = { [abstimmung: string]: QuestionMatch };
