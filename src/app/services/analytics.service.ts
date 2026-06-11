import { Injectable } from '@angular/core';
import posthog from 'posthog-js';
import { environment } from '../../environments/environment.generated';

@Injectable({
  providedIn: 'root',
})
export class AnalyticsService {
  private initialized = false;

  init(): void {
    if (typeof window === 'undefined') {
      return;
    }

    if (!environment.posthogKey) {
      console.warn('PostHog key is missing. Analytics is disabled.');
      return;
    }

    if (this.initialized) {
      return;
    }

    posthog.init(environment.posthogKey, {
      api_host: environment.posthogHost,
      person_profiles: 'identified_only',
      capture_pageview: true,
      autocapture: true,
      session_recording: {
        maskAllInputs: true,
      },
    });

    this.initialized = true;

    this.capture('analytics_initialized', {
      app: 'DevSurvivalKit',
      mode: environment.appStatus,
    });
  }

  capture(eventName: string, properties: Record<string, unknown> = {}): void {
    if (!this.initialized) {
      return;
    }

    posthog.capture(eventName, {
      app: 'DevSurvivalKit',
      ...properties,
    });
  }

  onFeatureFlags(callback: () => void): void {
    if (!this.initialized) {
      return;
    }

    posthog.onFeatureFlags(callback);
  }

  isFeatureEnabled(flagKey: string): boolean {
    if (!this.initialized) {
      return false;
    }

    return posthog.isFeatureEnabled(flagKey) === true;
  }
}
