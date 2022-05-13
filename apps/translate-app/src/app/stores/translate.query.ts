import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { TranslateState, TranslateStore } from 'apps/translate-app/src/app/stores/translate.store';

@Injectable({ providedIn: "root" })
export class TranslateQuery extends Query<TranslateState> {  
  constructor(protected store: TranslateStore) {
    super(store);
  }
}