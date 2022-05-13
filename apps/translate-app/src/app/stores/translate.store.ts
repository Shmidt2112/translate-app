import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

export interface TranslateState {
    detectedLanguageCode: string;
    translatedText: string;
}

export function createInitialState(): TranslateState {
    return {
        detectedLanguageCode: '',
        translatedText: ''
    };
}

@StoreConfig({ name: 'translate' })
@Injectable({ providedIn: "root" })
export class TranslateStore extends Store<TranslateState> {
    constructor() {
        super(createInitialState());
    }
}
