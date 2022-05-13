import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { delay, finalize, mergeMap, Observable, of, retryWhen, switchMap, tap, throwError } from 'rxjs';
import { YANDEX_TRANSLATE_TOKEN } from 'apps/translate-app/src/app/app.module';
import { YandexTranslateApiSettings } from 'apps/translate-app/src/environments/environment.interface';
import { TranslateStore } from 'apps/translate-app/src/app/stores/translate.store';
import { withTransaction } from '@datorama/akita';

interface TranslateResponseDto {
  translations: [{
    text: string,
    detectedLanguageCode: string
  }];
}

@Injectable({
  providedIn: 'root'
})
export class YandexTranslateService {
  private readonly delay = 3000;

  constructor(private readonly http: HttpClient,
    @Inject(YANDEX_TRANSLATE_TOKEN) private readonly env: YandexTranslateApiSettings,
    private translateStore: TranslateStore) {
  }

  translate(text: string, targetLanguageCode: string): Observable<TranslateResponseDto> {
    let header = new HttpHeaders({
      'Authorization': `Bearer ${this.env.iamToken}`,
      'Content-Type': 'application/json'
    });
    const options = ({
      headers: header,
    });
    this.translateStore.setLoading(true);
    let retries = 3;

    return this.http.post<TranslateResponseDto>('/yandex-translate-api/translate/v2/translate',
      { folderId: this.env.folderId, texts: [text], targetLanguageCode: targetLanguageCode }, options).pipe(
        withTransaction(resp => {
          this.translateStore.update({
            detectedLanguageCode: resp.translations[0].detectedLanguageCode,
            translatedText: resp.translations[0].text
          });
          this.translateStore.setError(null);
        }),
        retryWhen(errors => errors.pipe(
          delay(this.delay),
          mergeMap(error => retries-- > 0
            ? of(error)
            : throwError(() => {
              this.translateStore.setError(error);
              return error;
            }))
        )),
        finalize(() => {
          this.translateStore.setLoading(false);
        })
      );
  }
}