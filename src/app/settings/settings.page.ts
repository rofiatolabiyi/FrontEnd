import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent,IonHeader,IonTitle,IonToolbar,IonButtons,IonBackButton,IonCard,IonCardHeader,IonCardTitle,IonCardContent,IonItem,IonLabel,IonSelect,IonSelectOption,IonButton} from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: true,
  imports: [CommonModule,FormsModule,IonContent,IonHeader,IonTitle,IonToolbar,IonButtons,IonBackButton,IonCard,IonCardHeader,IonCardTitle,IonCardContent,IonItem,IonLabel,IonSelect,IonSelectOption,IonButton]
})
export class SettingsPage implements OnInit {
  guessDifficulty: string = 'easy';

  constructor(private storage: Storage) {}

  async ngOnInit() {
    await this.storage.create();
    const savedDifficulty = await this.storage.get('guessDifficulty');

    if (savedDifficulty) {
      this.guessDifficulty = savedDifficulty;
    }
  }

  async saveSettings() {
    await this.storage.set('guessDifficulty', this.guessDifficulty);
    alert('Settings saved');
  }
}
