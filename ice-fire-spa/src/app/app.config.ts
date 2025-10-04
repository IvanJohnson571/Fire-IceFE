import { ApplicationConfig, importProvidersFrom, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { SharedModule } from './modules/shared/shared.module';
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch } from '@angular/common/http';
import { LoaderInterceptor } from './components/loader/loader.interceptor';

const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    provideStore(),
    provideEffects(),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    importProvidersFrom(SharedModule),
    provideHttpClient(withFetch()),
  ]
};
