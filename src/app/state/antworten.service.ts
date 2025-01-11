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
import { createStore } from '@ngneat/elf';
import { Observable } from 'rxjs';
import { localStorageStrategy, persistState } from '@ngneat/elf-persist-state';

@Injectable({
  providedIn: 'root',
})
export class AntwortenService {
  private readonly STORE_NAME = 'antworten';
  private readonly antwortenStore = createStore({ name: this.STORE_NAME }, withEntities<Antwort>());

  public constructor() {
    persistState(this.antwortenStore, {
      key: this.STORE_NAME,
      storage: localStorageStrategy,
    });
  }

  public clearStore(): void {
    this.antwortenStore.destroy();
  }

  public updateAntwort(id: string, antwort: number | null): void {
    if (antwort === null) {
      this.antwortenStore.update(deleteEntities(id));
    } else {
      this.antwortenStore.update(upsertEntities({ id, antwort }));
    }
  }

  public selectAntwort(id: string): Observable<Antwort | undefined> {
    return this.antwortenStore.pipe(selectEntity(id));
  }

  public selectAntworten(): Observable<Antwort[]> {
    return this.antwortenStore.pipe(selectAllEntities());
  }
}
