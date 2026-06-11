import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnalyticsService } from '../../services/analytics.service';

@Component({
  selector: 'app-magic8ball',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './magic8ball.component.html',
  styleUrls: ['./magic8ball.component.css'],
})
export class Magic8ballComponent {
  answers: string[] = [
    'Have you tried turning it off and on again?',
    'StackOverflow holds your destiny.',
    'Rubber duck debugging will save you.',
    'The code compiles... for now.',
    'Check the semicolon.',
    'You will find the bug in 3 hours.',
    'Clear the cache and believe.',
    'Blame it on the intern.',
    'Your IDE is lying to you.',
    'Try caffeine and pray.',
    "You're just one semicolon away from greatness.",
    'Blame the framework.',
    "It's not a bug, it's an undocumented prophecy.",
    'Your next commit message will be a cry for help.',
    'Trust no semicolon.',
    'Ask again after a snack break.',
    'The sprint is an illusion. Time is a loop.',
    'Reboot reality. Then retry.',
    'Deploy on Friday. YOLO.',
    'The answer is hidden in a Slack thread... somewhere.',
    "Code like no one's watching. Because no one is.",
    'May your bugs be features in disguise.',
    'Version control your emotions.',
    '404: Motivation not found.',
    "The rubber duck says you're doing great.",
    'Your code works. That’s suspicious.',
    'A wild null pointer appears.',
    "The build succeeded. Don't trust it.",
    "Today's productivity is sponsored by caffeine and chaos.",
    'You will Google the same error five more times.',
    'It’s not you. It’s JavaScript.',
    'Cosmic rays flipped your bit. Try again.',
    'The code spirits are... conflicted.',
    'Update Chrome and pretend it never happened.',
    'Push now. Regret later.',
    'Your fate depends on the linter’s mood.',
    'Run `npm install` and pray.',
    'You just entered legacy code. Turn back.',
    'The tech debt collector is coming.',
    'The CI pipeline demands a sacrifice.',
    'Yes, but only if Mercury is in retrograde.',
    'You’ll fix it, then forget how you did.',
    'Documentation shall abandon you.',
    'It’s working... because of a cosmic accident.',
    'Ask again after rubber duck meditation.',
    'Beware: Jira ticket breeding season has begun.',
  ];

  currentAnswer = '';
  constructor(private analytics: AnalyticsService) {}

  shakeBall() {
    const index = Math.floor(Math.random() * this.answers.length);
    this.currentAnswer = this.answers[index];
    this.analytics.capture('advice_revealed', {
      tool: 'Magic 8-Ball',
      answer: this.currentAnswer,
    });
  }

  copyAnswer() {
    if (this.currentAnswer) {
      navigator.clipboard.writeText(this.currentAnswer);
      alert('Copied advice to clipboard!');
    }
  }
}
