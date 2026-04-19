import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {IonContent,IonHeader,IonTitle,IonToolbar,IonButtons,IonBackButton,IonCard,IonCardHeader,IonCardTitle,IonCardContent, IonButton} from '@ionic/angular/standalone';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-scores',
  templateUrl: './scores.page.html',
  styleUrls: ['./scores.page.scss'],
  standalone: true,
  imports: [ CommonModule, IonContent,IonHeader,IonTitle,IonToolbar,IonButtons,IonBackButton,IonCard,IonCardHeader,IonCardTitle,IonCardContent, IonButton]
})
export class ScoresPage implements OnInit {
  latestScore: number = 0;
  highScore: number = 0;
  bestMemory: number = 0;

  bestEasy: number = 0;
  bestMedium: number = 0;
  bestHard: number = 0;

  constructor(private storage: Storage) {}

  async ngOnInit() {
    await this.storage.create();
    await this.loadScores();
  }

  async ionViewWillEnter() {
    await this.loadScores();
  }

  async loadScores() {
    const latest = await this.storage.get('latestScore');
    const high = await this.storage.get('highScore');
    const memory = await this.storage.get('bestMemory');

    const easy = await this.storage.get('bestEasy');
    const medium = await this.storage.get('bestMedium');
    const hard = await this.storage.get('bestHard');

    this.latestScore = latest ?? 0;
    this.highScore = high ?? 0;
    this.bestMemory = memory ?? 0;

    this.bestEasy = easy ?? 0;
    this.bestMedium = medium ?? 0;
    this.bestHard = hard ?? 0;
  }

  async clearScores() {
    await this.storage.remove('latestScore');
    await this.storage.remove('highScore');
    await this.storage.remove('bestMemory');
    await this.storage.remove('bestEasy');
    await this.storage.remove('bestMedium');
    await this.storage.remove('bestHard');

    this.latestScore = 0;
    this.highScore = 0;
    this.bestMemory = 0;
    this.bestEasy = 0;
    this.bestMedium = 0;
    this.bestHard = 0;
  }
}