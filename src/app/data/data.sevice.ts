import { Injectable } from '@angular/core';
import ergebnisse from './deinwal_ergebnisse.json';
import fragen from './deinwal_fragen.json';
import {
  DeinwalErgebnis,
  DeinwalFrage,
  DeinwalFragenErgebnis,
  DeinwalFragenErgebnisse,
} from '../interfaces/data.interface';
import { Antwort } from '../interfaces/antworten.interface';
import { AGREEMENT } from '../enums/agreement.enum';
import { PartyDecisionThreshold } from '../consts/threshold.const';
import { computeAgreement } from '../functions/aggrement.function';
import { partyDecision } from '../functions/party-decision.function';
import {
  generateDeinwalErgebnis,
  generateDeinwalFragenErgebnis,
  generateDeinwalFragenErgebnisse,
  generateMap,
} from '../functions/data-massage.function';
import { Agreement, AgreementMap } from '../interfaces/agreement.interface';
import { QuestionMatchMap } from '../interfaces/match.interface';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  // proper typing for the data
  private readonly fragen: DeinwalFrage[] = fragen;
  private readonly ergebnisse: DeinwalFragenErgebnisse =
    generateDeinwalFragenErgebnisse(ergebnisse);

  // precompute a couple things
  private readonly kategorien: string[] = Array.from(
    new Set(this.fragen.map(frage => frage.kategorie)),
  ).sort();
  private readonly fraktionen: string[] = Array.from(
    new Set(
      Object.values(this.ergebnisse)
        .map(ergebnis => Object.values(ergebnis).map(e => e.fraktion))
        .flat(),
    ),
  )
    .filter(fraktion => fraktion !== 'Fraktionslos')
    .sort();

  public constructor() {
    console.log(this.kategorien);
    console.log(this.fraktionen);
  }

  public getFragen(kategorie: string): DeinwalFrage[] {
    // console.log(kategorie, this.fragen);
    return this.fragen.filter(frage => frage.kategorie === kategorie);
  }

  public getErgebnisse(): { [key: string]: { [key: string]: DeinwalErgebnis } } {
    return this.ergebnisse;
  }

  public getFirstKategorie(): string {
    return this.kategorien[0];
  }

  public getNextKategorie(kategorie: string): string | null {
    const index = this.kategorien.indexOf(kategorie);
    if (index + 1 >= this.kategorien.length) {
      return null;
    }
    return this.kategorien[(index + 1) % this.kategorien.length];
  }

  public getPrevKategorie(kategorie: string): string | null {
    const index = this.kategorien.indexOf(kategorie);
    console.log(index);
    if (index < 1) {
      return null;
    }
    return this.kategorien[(index - 1) % this.kategorien.length];
  }

  public matchAntworten(antworten: Antwort[] | undefined): QuestionMatchMap {
    for (let i = 0; i < (antworten?.length || 0); i++) {}
    // return undefined;
  }

  public matchQuestion(abstimmungs_id: string, antwort: number): AgreementMap {
    const fraktionsErgebnisse = this.ergebnisse[abstimmungs_id];
    return generateMap(
      Object.values(fraktionsErgebnisse).map(fraktion => [
        fraktion.fraktion,
        {
          fraktion: fraktion.fraktion,
          abstimmungs_id: fraktion.abstimmungs_id,
          agreement: computeAgreement(partyDecision(fraktion), antwort),
        },
      ]),
    );
  }
}
