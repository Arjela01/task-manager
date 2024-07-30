import {
  importProvidersFrom,
  LOCALE_ID,
  provideZoneChangeDetection,
} from '@angular/core';
import {
  PreloadAllModules,
  provideRouter,
  withInMemoryScrolling,
  withPreloading,
} from '@angular/router';
import { appRoutes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { AUTH_FEATURE_KEY, authFeature } from '@task-manager/auth';
import { provideStore } from '@ngrx/store';
import {
  HttpClient,
  HttpClientModule,
  provideHttpClient,
} from '@angular/common/http';
import {
  TranslateLoader,
  TranslateModule,
  TranslateService,
} from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/moment';
import { registerLocaleData } from '@angular/common';
import localeEn from '@angular/common/locales/en';
import localeDe from '@angular/common/locales/de';
import localeSq from '@angular/common/locales/sq';

registerLocaleData(localeEn);
registerLocaleData(localeDe);
registerLocaleData(localeSq);

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

export const appConfig = {
  providers: [
    { provide: LOCALE_ID, useValue: 'en-US' },
    provideHttpClient(),
    provideStore({
      [AUTH_FEATURE_KEY]: authFeature.reducer,
    }),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      appRoutes,
      withInMemoryScrolling({
        scrollPositionRestoration: 'enabled',
        anchorScrolling: 'enabled',
      }),
      withPreloading(PreloadAllModules)
    ),
    provideAnimationsAsync(),
    provideNativeDateAdapter(),
    TranslateService,
    importProvidersFrom(
      BrowserAnimationsModule,
      MatDatepickerModule,
      CalendarModule.forRoot({
        provide: DateAdapter,
        useFactory: adapterFactory,
      }),
      HttpClientModule,
      TranslateModule.forRoot({
        defaultLanguage: 'en',
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient],
        },
      })
    ),
  ],
};
