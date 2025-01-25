export interface DeinwalInfo {
  text: string;
  link?: string;
}

export interface DeinwalFrage {
  abstimmungs_id: string;
  kategorie: string;
  stichwort: string;
  hintergrund: string;
  frage: string;
  weiterfuehrende_informationen: DeinwalInfo[];
}

export interface Abstimmungsergebnis {
  ja: number;
  nein: number;
  enthalten: number;
  gesamt: number;
}

export interface DeinwalErgebnis {
  abstimmungs_id: string;
  fraktion: string;
  ja: number;
  nein: number;
  enthalten: number;
  gesamt: number;
  decision: number;
}

export type DeinwalFragenErgebnis = { [key: string]: DeinwalErgebnis };

export type DeinwalFragenErgebnisse = { [abstimmungs_id: string]: DeinwalFragenErgebnis };

export interface DeinwalFraktion {
  color: string;
  short?: string;
}

export type DeinwalFraktionenMap = { [fraktion: string]: DeinwalFraktion };
