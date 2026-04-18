import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {IonContent,IonHeader,IonTitle,IonToolbar,IonButtons,IonBackButton,IonCard,IonCardHeader,IonCardTitle,IonCardContent,IonButton,IonInput,IonItem,IonLabel,IonSelect,IonSelectOption} from '@ionic/angular/standalone';
import { Storage } from '@ionic/storage-angular';


@Component({
  selector: 'app-guess',
  templateUrl: './guess.page.html',
  styleUrls: ['./guess.page.scss'],
  standalone: true,
  imports: [IonItem,IonLabel,IonSelect,IonSelectOption, IonCard,IonCardHeader,IonCardTitle,IonCardContent,IonButton,IonInput, IonContent,IonButtons,IonBackButton, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class GuessPage implements OnInit {
difficulty: string = 'easy';
  maxNumber: number = 10;
  secretNumber: number = 0;
  userGuess: number | null = null;
  message: string = '';
  attempts: number = 0;
  gameOver: boolean = false;

  bestEasy: number = 0;
  bestMedium: number = 0;
  bestHard: number = 0;

  constructor(private storage: Storage) {}

   async ngOnInit() {
    await this.storage.create();
    await this.loadBestScores();
    this.startNewGame();
  }

  async loadBestScores() {
    this.bestEasy = (await this.storage.get('bestEasy')) ?? 0;
    this.bestMedium = (await this.storage.get('bestMedium')) ?? 0;
    this.bestHard = (await this.storage.get('bestHard')) ?? 0;
  }

  setDifficulty() {
    if (this.difficulty === 'easy') {
      this.maxNumber = 10;
    } else if (this.difficulty === 'medium') {
      this.maxNumber = 50;
    } else {
      this.maxNumber = 100;
    }

    this.startNewGame();
  }

  startNewGame() {
    this.secretNumber = Math.floor(Math.random() * this.maxNumber) + 1;
    this.userGuess = null;
    this.attempts = 0;
    this.gameOver = false;
    this.message = `I am thinking of a number between 1 and ${this.maxNumber}`;
  }

  async checkGuess() {
  if (this.userGuess === null) {
    this.message = 'Please enter a number';
    return;
  }

  if (this.userGuess < 1 || this.userGuess > this.maxNumber) {
    this.message = `Enter a number between 1 and ${this.maxNumber}`;
    return;
  }

  this.attempts++;

  if (this.userGuess < this.secretNumber) {
    this.message = 'Too low!';
  } else if (this.userGuess > this.secretNumber) {
    this.message = 'Too high!';
  } else {
    this.message = `Correct! You guessed it in ${this.attempts} attempts.`;
    this.gameOver = true;
    await this.saveBestScore();
  }
}

  async saveBestScore() {
    if (this.difficulty === 'easy') {
      if (this.bestEasy === 0 || this.attempts < this.bestEasy) {
        this.bestEasy = this.attempts;
        await this.storage.set('bestEasy', this.bestEasy);
      }
    } else if (this.difficulty === 'medium') {
      if (this.bestMedium === 0 || this.attempts < this.bestMedium) {
        this.bestMedium = this.attempts;
        await this.storage.set('bestMedium', this.bestMedium);
      }
    } else {
      if (this.bestHard === 0 || this.attempts < this.bestHard) {
        this.bestHard = this.attempts;
        await this.storage.set('bestHard', this.bestHard);
      }
    }
  }

  restartGame() {
    this.startNewGame();
  }

  async clearGuessScores() {
    await this.storage.remove('bestEasy');
    await this.storage.remove('bestMedium');
    await this.storage.remove('bestHard');

    this.bestEasy = 0;
    this.bestMedium = 0;
    this.bestHard = 0;
  }
}
