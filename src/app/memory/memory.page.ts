import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Storage } from '@ionic/storage-angular';
import {IonContent,IonHeader,IonTitle,IonToolbar,IonButtons,IonBackButton,IonCard,IonCardHeader,IonCardTitle,IonCardContent, IonGrid,IonRow,IonCol,IonButton} from '@ionic/angular/standalone';

interface MemoryCard {
  id: number;
  image: string;
  flipped: boolean;
  matched: boolean;
}

@Component({
  selector: 'app-memory',
  templateUrl: './memory.page.html',
  styleUrls: ['./memory.page.scss'],
  standalone: true,
  imports: [CommonModule, IonContent,IonHeader,IonTitle,IonToolbar,IonButtons,IonBackButton,IonCard,IonCardHeader,IonCardTitle,IonCardContent, IonGrid,IonRow,IonCol,IonButton
  ]
})
export class MemoryPage implements OnInit {
  cards: MemoryCard[] = [];
  selectedCards: MemoryCard[] = [];
  moves: number = 0;
  gameWon: boolean = false;
  lockBoard: boolean = false;

  constructor(private storage: Storage) {}

  async ngOnInit() {
    await this.storage.create();
    this.startGame();
  }

  startGame() {
    const images = [
      'assets/images/apple.png',
      'assets/images/banana.png',
      'assets/images/butterfly.png',
      'assets/images/grape.png',
      'assets/images/heart.png',
      'assets/images/star.png'
    ];

    const pairs = [...images, ...images];

    this.cards = this.shuffleArray(
      pairs.map((img, index) => ({
        id: index,
        image: img,
        flipped: false,
        matched: false
      }))
    );

    this.selectedCards = [];
    this.moves = 0;
    this.gameWon = false;
    this.lockBoard = false;
  }

  shuffleArray(array: MemoryCard[]) {
    return array.sort(() => Math.random() - 0.5);
  }

  flipCard(card: MemoryCard) {
    if (
      this.lockBoard ||
      card.flipped ||
      card.matched ||
      this.selectedCards.length === 2
    ) {
      return;
    }

    card.flipped = true;
    this.selectedCards.push(card);

    if (this.selectedCards.length === 2) {
      this.moves++;
      this.checkForMatch();
    }
  }

  checkForMatch() {
    const [firstCard, secondCard] = this.selectedCards;

    if (firstCard.image === secondCard.image) {
      firstCard.matched = true;
      secondCard.matched = true;
      this.selectedCards = [];
      this.checkWin();
    } else {
      this.lockBoard = true;

      setTimeout(() => {
        firstCard.flipped = false;
        secondCard.flipped = false;
        this.selectedCards = [];
        this.lockBoard = false;
      }, 1000);
    }
  }

  async checkWin() {
    this.gameWon = this.cards.every(card => card.matched);

    if (this.gameWon) {
      const best = await this.storage.get('bestMemory');

      if (!best || this.moves < best) {
        await this.storage.set('bestMemory', this.moves);
      }
    }
  }
}