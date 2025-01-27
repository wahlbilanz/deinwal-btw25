import { Injectable } from '@angular/core';
import ergebnisse from './deinwal_ergebnisse.json';
import fragen from './deinwal_fragen.json';
import fraktionen from './deinwal_fraktionen.json';
import {
  DeinwalFrage,
  DeinwalFragenErgebnis,
  DeinwalFragenErgebnisse,
  DeinwalFraktionenMap,
} from '../interfaces/data.interface';
import {
  filterDeinwalFragen,
  generateDeinwalFragenErgebnisse,
} from '../functions/data-massage.function';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  // proper typing for the data
  private readonly ergebnisse: DeinwalFragenErgebnisse =
    generateDeinwalFragenErgebnisse(ergebnisse);
  private readonly fragen: DeinwalFrage[] = filterDeinwalFragen(fragen, this.ergebnisse);
  private readonly fraktionen: DeinwalFraktionenMap = fraktionen;

  private readonly kategorien: string[] = Array.from(
    new Set(this.fragen.map(frage => frage.kategorie)),
  ).sort();

  public getFragen(kategorie: string): DeinwalFrage[] {
    return this.fragen.filter(frage => frage.kategorie === kategorie);
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

  public naechsteKategorie(kategorie: string): string | null {
    const index = this.kategorien.indexOf(kategorie);
    if (index + 1 >= this.kategorien.length) {
      return null;
    }
    return this.kategorien[(index + 1) % this.kategorien.length];
  }

  public vorherigeKategorie(kategorie: string): string | null {
    const index = this.kategorien.indexOf(kategorie);
    if (index < 1) {
      return null;
    }
    return this.kategorien[(index - 1) % this.kategorien.length];
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

  public getErgebnisse(abstimmungs_id: string): DeinwalFragenErgebnis {
    return this.ergebnisse[abstimmungs_id];
  }
}
