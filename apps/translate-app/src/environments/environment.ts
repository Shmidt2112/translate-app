// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { Environment } from "apps/translate-app/src/environments/environment.interface";

export const environment: Environment = {
  production: false,
  yandexTranslateApiSettings: {
    url: 'https://translate.api.cloud.yandex.net/',
    folderId: 'b1gtrbk3qplg58p7or4j',
    iamToken: 't1.9euelZqVnZfJksbNnZ2Kyc3PysvNju3rnpWazJWemM_PmJSYyM-NzpfMjI_l9Pc-FQhs-e9JJgrQ3fT3fkMFbPnvSSYK0A.Dn17AWyEicZwsS1Kvx7AU5om2kF99pvd7-yenLBfpnYF2bpKNLww78zG2VzgXhHb7gUThKTYK3z_3lkCSk3dBQ'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
