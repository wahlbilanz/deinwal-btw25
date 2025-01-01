import { Injectable } from '@angular/core';
import ergebnisse from './deinwal_ergebnisse.json';
import fragen from './deinwal_fragen.json';
import { DeinwalErgebnis, DeinwalFrage } from './data.model';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  // proper typing for the data
  private readonly fragen: DeinwalFrage[] = fragen;
  private readonly ergebnisse: { [key: string]: { [key: string]: DeinwalErgebnis } } = ergebnisse;

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
}
