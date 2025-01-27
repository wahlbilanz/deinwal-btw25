import { inject, Injectable } from '@angular/core';
import {
  deleteEntities,
  selectAllEntities,
  selectEntitiesCount,
  selectEntity,
  upsertEntities,
  withEntities,
} from '@ngneat/elf-entities';
import { Antwort, AntwortenMap } from '../interfaces/antworten.interface';
import { createStore, select, setProp, withProps } from '@ngneat/elf';
import { map, Observable } from 'rxjs';
import { localStorageStrategy, persistState } from '@ngneat/elf-persist-state';
import { StateProps } from '../interfaces/state-properties.interface';
import { DeinwalFragenErgebnis } from '../interfaces/data.interface';
import { berechneUebereinstimmungen } from '../functions/party-matcher.function';
import { DataService } from '../data/data.sevice';
import { generateMap } from '../functions/data-massage.function';

@Injectable({
  providedIn: 'root',
})
export class AntwortenService {
  private dataService = inject(DataService);

  private readonly STORE_NAME = 'antworten';
  private readonly antwortenStore = createStore(
    { name: this.STORE_NAME },
    withProps<StateProps>({ balkenDiagramm: true }),
    withEntities<Antwort, 'abstimmungs_id'>({ idKey: 'abstimmungs_id' }),
  );

  public balkenDiagramm$ = this.antwortenStore.pipe(select(s => s.balkenDiagramm));

  public constructor() {
    persistState(this.antwortenStore, {
      key: this.STORE_NAME,
      storage: localStorageStrategy,
    });
  }

  public setBalkenDiagramm(balkenDiagramm: boolean): void {
    this.antwortenStore.update(setProp('balkenDiagramm', balkenDiagramm));
  }

  public clearStore(): void {
    this.antwortenStore.destroy();
  }

  public hasAntworten(): Observable<boolean> {
    return this.antwortenStore.pipe(
      selectEntitiesCount(),
      map(count => count > 0),
    );
  }

  public updateAntwort(abstimmungs_id: string, antwort: number | null): void {
    if (antwort === null) {
      this.antwortenStore.update(deleteEntities(abstimmungs_id));
    } else {
      const fraktionsergebnisste: DeinwalFragenErgebnis =
        this.dataService.getErgebnisse(abstimmungs_id);
      const a: Antwort = {
        abstimmungs_id,
        antwort,
        uebereinstimmungen: berechneUebereinstimmungen(antwort, fraktionsergebnisste),
      };
      this.antwortenStore.update(upsertEntities(a));
    }
  }

  public selectAntwort(id: string): Observable<Antwort | undefined> {
    return this.antwortenStore.pipe(selectEntity(id));
  }

  public selectAntworten(): Observable<AntwortenMap> {
    return this.antwortenStore.pipe(
      selectAllEntities(),
      map(antworten => generateMap(antworten.map(a => [a.abstimmungs_id, a]))),
    );
  }
}
