import { AfterViewInit, ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { catchError, Subject, Subscription, switchMap, takeUntil, throwError } from 'rxjs';
import { default as сountriesIconUrls } from '!!file-loader!../../../assets/countries.svg';
import { YandexTranslateService } from 'apps/translate-app/src/app/services/yandex-translate.service';
import { TranslateQuery } from 'apps/translate-app/src/app/stores/translate.query';

@Component({
  selector: 'translate',
  templateUrl: './translate.component.html',
  styleUrls: ['./translate.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TranslateComponent implements OnInit, OnDestroy {

  detectedLanguageCode$ = this.translateQuery.select('detectedLanguageCode');

  readonly form = new FormGroup({
    from: new FormControl(null, Validators.required),
    to: new FormControl(null),
    languageIsoCode: new FormControl(null, Validators.required)
  });

  readonly languageIsoCodes = ['be', 'en', 'fr', 'it', 'ja']

  private readonly cancelationToken$ = new Subject<void>();
  private readonly translateBtnClicked$: Subject<void> = new Subject();

  constructor(private readonly yandexTranslateService: YandexTranslateService,
    private readonly translateQuery: TranslateQuery) {
  }

  ngOnInit() {
    this.translateBtnClicked$.pipe(
      switchMap(() => this.yandexTranslateService.translate(this.form.get('from')?.value, this.form.get('languageIsoCode')?.value)),
      catchError(error => {
        console.log('error', error);
        return throwError(() => error)
      }),
      takeUntil(this.cancelationToken$)
    ).subscribe(resp => console.log('resp', resp));

    this.translateQuery.select('translatedText').pipe(
      takeUntil(this.cancelationToken$)
    ).subscribe(translatedText => this.form.get('to')?.patchValue(translatedText));
  } 

  getFlagPath(countryIsoCode: string) {
    return `${сountriesIconUrls}#${countryIsoCode}`;
  }

  onSubmit() { 
    if (this.form.invalid) {
      this.form.markAllAsTouched()
      return;
    }
    this.translateBtnClicked$.next();
  }

  async onPasteClicked(_e: Event) {
    let text = await navigator.clipboard.readText();
    this.form.get('from')?.setValue(text)
  }

  async onCopyClicked(_e: Event) {
    await navigator.clipboard.writeText(this.form.get('to')?.value);
  }

  ngOnDestroy() {
    this.cancelationToken$.next();
    this.cancelationToken$.complete();
  }
}
