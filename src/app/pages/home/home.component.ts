import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { AnalyticsService } from '../../services/analytics.service';
import { CommonModule } from '@angular/common';

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
}
