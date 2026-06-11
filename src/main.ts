import { APP_INITIALIZER, ErrorHandler } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, Router } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import * as Sentry from '@sentry/angular';

import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { environment } from './environments/environment.generated';

if (environment.sentryDsn) {
  Sentry.init({
    dsn: environment.sentryDsn,
    environment: environment.sentryEnvironment,
    integrations: [
      Sentry.browserTracingIntegration(),
      Sentry.replayIntegration(),
    ],
    tracesSampleRate: 1.0,
    replaysSessionSampleRate: 1.0,
    replaysOnErrorSampleRate: 1.0,
  });

  Sentry.setTag('app', 'DevSurvivalKit');
  Sentry.setTag('framework', 'Angular');
}

function initializeSentryTracing(_traceService: Sentry.TraceService) {
  return () => {};
}

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(withFetch()),

    {
      provide: ErrorHandler,
      useValue: Sentry.createErrorHandler({
        showDialog: false,
      }),
    },
    {
      provide: Sentry.TraceService,
      deps: [Router],
    },
    {
      provide: APP_INITIALIZER,
      useFactory: initializeSentryTracing,
      deps: [Sentry.TraceService],
      multi: true,
    },
  ],
}).catch((err) => {
  Sentry.captureException(err);
  console.error(err);
});
