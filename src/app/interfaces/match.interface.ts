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
