import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonList,
  IonRadioGroup,
  IonItem,
  IonLabel,
  IonRadio,
  IonButton
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonRadioGroup,
    IonItem,
    IonLabel,
    IonRadio,
    IonButton
  ],
})
export class HomePage implements OnInit {
  selectedGame: string = '';

  constructor(
    private storage: Storage,
    private router: Router
  ) {}

  async ngOnInit() {
    await this.storage.create();
    const savedGame = await this.storage.get('lastGame');
    if (savedGame) {
      this.selectedGame = savedGame;
    }
  }

  async startGame() {
    if (!this.selectedGame) {
      alert('Please select a game');
      return;
    }

    await this.storage.set('lastGame', this.selectedGame);

    if (this.selectedGame === 'quiz') {
      this.router.navigate(['/quiz']);
    } else if (this.selectedGame === 'memory') {
      this.router.navigate(['/memory']);
    } else if (this.selectedGame === 'guess') {
      this.router.navigate(['/guess']);
    }
  }

  openScores() {
    this.router.navigate(['/scores']);
  }

  openSettings() {
    this.router.navigate(['/settings']);
  }
}