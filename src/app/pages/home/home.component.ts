import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { AnalyticsService } from '../../services/analytics.service';
import { CommonModule } from '@angular/common';
import * as Sentry from '@sentry/angular';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  showDevTip = false;

  constructor(private router: Router, private analytics: AnalyticsService) {}
  ngOnInit(): void {
    this.analytics.capture('home_opened', {
      page: 'Home',
    });

    this.analytics.onFeatureFlags(() => {
      this.showDevTip = this.analytics.isFeatureEnabled('show-dev-tip');
    });
  }

  navigate(path: string) {
    this.router.navigate(['/' + path]);
  }

  breakTheWorld(): void {
    Sentry.addBreadcrumb({
      category: 'user',
      message: 'Break the world button clicked',
      level: 'info',
      data: {
        page: 'Home',
        action: 'manual_test_error',
        tool: 'DevSurvivalKit',
      },
    });

    Sentry.setTag('test_type', 'manual_lab6_error');
    Sentry.setContext('lab6_test_context', {
      feature: 'Sentry integration',
      component: 'HomeComponent',
      expected_result: 'Error should appear in Sentry Issues',
    });

    throw new Error('Sentry Test Error: Break the world button was clicked!');
  }
}
