import { Injectable } from '@angular/core';
import ergebnisse from './deinwal_ergebnisse.json';
import fragen from './deinwal_fragen.json';
import fraktionen from './deinwal_fraktionen.json';
import {
  DeinwalErgebnis,
  DeinwalFrage,
  DeinwalFragenErgebnis,
  DeinwalFragenErgebnisse,
  DeinwalFraktionenMap,
} from '../interfaces/data.interface';
import { Antwort } from '../interfaces/antworten.interface';
import { computeAgreement } from '../functions/aggrement.function';
import { partyDecision } from '../functions/party-decision.function';
import { generateDeinwalFragenErgebnisse, generateMap } from '../functions/data-massage.function';
import { AgreementMap } from '../interfaces/agreement.interface';
import { QuestionMatchMap } from '../interfaces/match.interface';
import { partyMatcher } from '../functions/party-matcher.function';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  // proper typing for the data
  private readonly fragen: DeinwalFrage[] = fragen;
  private readonly ergebnisse: DeinwalFragenErgebnisse =
    generateDeinwalFragenErgebnisse(ergebnisse);
  private readonly fraktionen: DeinwalFraktionenMap = fraktionen;

  // precompute a couple things
  private readonly kategorien: string[] = Array.from(
    new Set(this.fragen.map(frage => frage.kategorie)),
  ).sort();
  // private readonly fraktionen: string[] = Array.from(
  //   new Set(
  //     Object.values(this.ergebnisse)
  //       .map(ergebnis => Object.values(ergebnis).map(e => e.fraktion))
  //       .flat(),
  //   ),
  // )
  //   .filter(fraktion => fraktion !== 'Fraktionslos')
  //   .sort();

  public constructor() {
    console.log(this.kategorien);
    console.log(this.fraktionen);
  }

  public getFragen(kategorie: string): DeinwalFrage[] {
    return this.fragen.filter(frage => frage.kategorie === kategorie);
  }

  public getErgebnisse(): { [key: string]: { [key: string]: DeinwalErgebnis } } {
    return this.ergebnisse;
  }
  public getKategorie(abstimmungs_id: string): string | undefined {
    return this.fragen.find(f => f.abstimmungs_id === abstimmungs_id)?.kategorie;
  }

  public getAlleKategorien(): string[] {
    return this.kategorien;
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
    if (index < 1) {
      return null;
    }
    return this.kategorien[(index - 1) % this.kategorien.length];
  }

  public getFraktionsFarbe(fraktion: string): string {
    return this.fraktionen[fraktion]?.color || '#3cc9a7';
  }

  public getFraktionsColorizerFn(): (fraktion: string) => string {
    const f = this.fraktionen;
    return (fraktion: string): string => f[fraktion]?.color || '#3cc9a7';
  }

  public getAbstimmungsResolverFn(): (abstimmungs_id: string) => DeinwalFrage | undefined {
    const a = this.fragen;
    return (abstimmungs_id: string): DeinwalFrage | undefined =>
      a.find(abst => abst.abstimmungs_id === abstimmungs_id);
  }

  public getErgebnisseOfAbstimmung(abstimmungs_id: string): DeinwalFragenErgebnis {
    return this.ergebnisse[abstimmungs_id];
  }

  public matchAntworten(antworten: Antwort[] | undefined): QuestionMatchMap {
    if (!antworten?.length) {
      return {};
    }

    return generateMap(
      antworten
        .filter(antwort => !!antwort)
        .map(antwort => [
          antwort.abstimmungs_id,
          partyMatcher(antwort, this.getErgebnisseOfAbstimmung(antwort.abstimmungs_id)),
        ]),
    );
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
