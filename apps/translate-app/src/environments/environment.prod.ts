import { Environment } from "apps/translate-app/src/environments/environment.interface";

export const environment: Environment = {
  production: true,
  yandexTranslateApiSettings: {
    url: '',
    folderId: '',
    iamToken: ''
  }
};
