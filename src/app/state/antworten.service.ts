import { Injectable } from '@angular/core';
import {
  deleteEntities,
  selectAllEntities,
  selectEntities,
  selectEntity,
  upsertEntities,
  withEntities,
} from '@ngneat/elf-entities';
import { Antwort } from '../interfaces/antworten.interface';
import { createStore, select, setProp, withProps } from '@ngneat/elf';
import { Observable } from 'rxjs';
import { localStorageStrategy, persistState } from '@ngneat/elf-persist-state';
import { StateProps } from '../interfaces/state-properties.interface';

@Injectable({
  providedIn: 'root',
})
export class AntwortenService {
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

  public setBalkenDiagramm(balkenDiagramm: boolean) {
    this.antwortenStore.update(setProp('balkenDiagramm', balkenDiagramm));
  }

  public clearStore(): void {
    this.antwortenStore.destroy();
  }

  public updateAntwort(abstimmungs_id: string, antwort: number | null): void {
    console.log('updateAntwort ', abstimmungs_id, antwort);
    if (antwort === null) {
      this.antwortenStore.update(deleteEntities(abstimmungs_id));
    } else {
      this.antwortenStore.update(upsertEntities({ abstimmungs_id, antwort }));
    }
  }

  public selectAntwort(id: string): Observable<Antwort | undefined> {
    return this.antwortenStore.pipe(selectEntity(id));
  }

  public selectAntworten(): Observable<Antwort[]> {
    return this.antwortenStore.pipe(selectAllEntities());
  }
}
