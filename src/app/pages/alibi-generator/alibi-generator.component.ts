import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-alibi-generator',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alibi-generator.component.html',
  styleUrls: ['./alibi-generator.component.css'],
})
export class AlibiGeneratorComponent {
  excuses: string[] = [
    "The coffee machine told me it wasn't a good day to start.",
    'I was alphabetizing the office supplies.',
    'My mouse ran away from the cursor.',
    'The water cooler and I were brainstorming.',
    'I was attending a webinar on ‘How to Be More Productive.’',
    'I was researching the psychology of email signatures.',
    'I was busy trying to convert everything to PDF.',
    'I was waiting for inspiration to strike. It missed.',
    'I was waiting for my 4:30 PM energy drink to kick in.',
    'I got lost trying to navigate Google Drive.',
    'I had to train the new guy—Siri.',
    'My notes were all written in invisible ink.',
    'I was busy trying to tame the office scanner.',
    'I got stuck in a YouTube tutorial loop.',
    "I was busy looking up synonyms for 'teamwork.'",
    "I was updating my LinkedIn profile to 'aspiring magician'.",
    "My swivel chair wouldn't stop spinning.",
    'The erasers needed cleaning.',
    'My computer insisted on a staring contest.',
    'I was solving the office Rubik’s Cube.',
    'I was working on my origami skills for stress management.',
    'I was on a coffee break... all day.',
    'My Git forgot how to push. Relatable.',
    'The lunchroom microwave and I were in negotiations.',
    'I was looking for Waldo in the office wallpaper.',
    'I was engrossed in a deep conversation with Siri about the meaning of deadlines.',
    'I wrote a semicolon in the standup notes and the whole sprint collapsed.',
    'My laptop blue-screened after reading my code.',
    'I deployed to production instead of Slack.',
    "The code said 'Do not disturb' so I respected its boundaries.",
    "Turns out you can't npm install common sense.",
    'My rubber duck debugger quit halfway through.',
    'The Jira ticket was too emotionally taxing.',
    'The database ghosted me.',
    "The compiler said 'lol no' and left.",
    "Someone said 'YOLO deploy' and I blacked out.",
    'VS Code refused to open out of protest.',
    'The bug asked for a raise, so I promoted it to feature.',
    'My VPN tunneled into the wrong dimension.',
    "PostgreSQL said 'Not today, human' and shut down.",
    "I thought YOLO meant 'You Only Launch Once'.",
    'My smart fridge joined the standup instead of me.',
    'I mistook the production server for a mood board.',
    "Turns out caffeine doesn't compile into productivity.",
    'My AI assistant started giving therapy instead of answers.',
    'I got trapped in a merge conflict.',
    'I thought today was Sunday.',
    'I was debugging an existential crisis.',
    'The Wi-Fi was allergic to my code.',
    "I accidentally replaced 'main' with 'meme'.",
    'Git refused to commit emotionally.',
    'The meeting invite got lost in the blockchain.',
    'I was waiting for AI to do it.',
    'I deleted system32. Again.',
    'My cat deleted the production database.',
    'The code ran away from me.',
    'I was debugging my childhood trauma.',
    'A bug bribed me to ignore it.',
    'My coffee machine crashed my Wi-Fi.',
    'The meeting invite got sent to /dev/null.',
    'I was on a call with Elon. NDA stuff.',
    'I accidentally deployed the memes.',
    "My IDE joined a union. It's on strike.",
    'I was trapped in an infinite loop of procrastination.',
  ];

  copyExcuse() {
    if (this.excuse) {
      navigator.clipboard.writeText(this.excuse);
      alert('Copied excuse to clipboard!');
    }
  }

  excuse = '';

  generateExcuse() {
    const index = Math.floor(Math.random() * this.excuses.length);
    this.excuse = this.excuses[index];
  }
}
