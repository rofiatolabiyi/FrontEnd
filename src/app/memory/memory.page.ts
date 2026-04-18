import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {IonContent, IonHeader, IonTitle,IonToolbar, IonButtons, IonBackButton} from '@ionic/angular/standalone';

@Component({
  selector: 'app-memory',
  templateUrl: './memory.page.html',
  styleUrls: ['./memory.page.scss'],
  standalone: true,
  imports: [IonContent,IonButtons,IonBackButton, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class MemoryPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
