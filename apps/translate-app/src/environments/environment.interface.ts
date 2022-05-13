export interface YandexTranslateApiSettings {
  url: string;
  folderId: string;
  iamToken: string;
};

export interface Environment {
  production: boolean;
  yandexTranslateApiSettings: YandexTranslateApiSettings;
}
