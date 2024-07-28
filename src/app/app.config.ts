import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import {
  PreloadAllModules,
  provideRouter,
  withInMemoryScrolling,
  withPreloading,
} from '@angular/router';
import { appRoutes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {
  AUTH_FEATURE_KEY, authReducer,
} from '@task-manager/login';
import { provideStore } from '@ngrx/store';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    provideStore({
      [AUTH_FEATURE_KEY]: authReducer,
    }),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
        appRoutes,
        withPreloading(PreloadAllModules),
        withInMemoryScrolling({
          scrollPositionRestoration: 'enabled',
          anchorScrolling: 'enabled',
        })
    ),
    provideAnimationsAsync(),
  ],
};
