import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton
} from '@ionic/angular/standalone';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-scores',
  templateUrl: './scores.page.html',
  styleUrls: ['./scores.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonButton
  ]
})
export class ScoresPage implements OnInit {
  latestScore: number = 0;
  highScore: number = 0;

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

    this.latestScore = latest ?? 0;
    this.highScore = high ?? 0;
  }

  async clearScores() {
    await this.storage.remove('latestScore');
    await this.storage.remove('highScore');
    this.latestScore = 0;
    this.highScore = 0;
  }
}