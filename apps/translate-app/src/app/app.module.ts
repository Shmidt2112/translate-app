import { HttpClientModule } from '@angular/common/http';
import { InjectionToken, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TuiAlertModule, TuiRootModule } from '@taiga-ui/core'; 
import { AppComponent } from 'apps/translate-app/src/app/app.component'; 
import { TranslateModule } from 'apps/translate-app/src/app/components/translate/translate.module';
import { environment } from 'apps/translate-app/src/environments/environment';
import { Environment, YandexTranslateApiSettings } from 'apps/translate-app/src/environments/environment.interface';

export const YANDEX_TRANSLATE_TOKEN = new InjectionToken<YandexTranslateApiSettings>(
  'YANDEX_TRANSLATE_TOKEN'
);

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    TuiRootModule,
    TuiAlertModule,
    TranslateModule
  ],
  providers: [{
    provide: YANDEX_TRANSLATE_TOKEN,
    useFactory: () => environment.yandexTranslateApiSettings
  }],

  bootstrap: [AppComponent],
})
export class AppModule { }
