export interface DeinwalInfo {
  text: string;
  link?: string;
}

export interface DeinwalFrage {
  abstimmungs_id: string;
  kategorie: string;
  hintergrund: string;
  frage: string;
  weiterfuehrende_informationen: DeinwalInfo[];
}

export interface DeinwalErgebnis {
  abstimmungs_id: string;
  fraktion: string;
  ja: number;
  nein: number;
  enthalten: number;
}

export type DeinwalFragenErgebnis = { [fraktion: string]: DeinwalErgebnis };

export type DeinwalFragenErgebnisse = { [abstimmungs_id: string]: DeinwalFragenErgebnis };
