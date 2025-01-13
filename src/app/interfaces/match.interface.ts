export interface PartyMatch {
  abstimmungs_id: string;
  party: string;
  match: number;
}

export interface QuestionMatch {
  abstimmungs_id: string;
  partyMatches: { [key: string]: number };
}

export type QuestionMatchMap = { [abstimmungs_id: string]: QuestionMatch };
