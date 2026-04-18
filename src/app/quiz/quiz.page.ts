import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {IonContent,IonHeader,IonTitle,IonToolbar,IonButtons,IonBackButton,IonButton,IonCard,IonCardHeader,IonCardTitle,IonCardContent} from '@ionic/angular/standalone';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.page.html',
  styleUrls: ['./quiz.page.scss'],
  standalone: true,
  imports: [CommonModule,IonContent,IonHeader,IonTitle,IonToolbar,IonButtons,IonBackButton,IonButton,IonCard,IonCardHeader,IonCardTitle,IonCardContent]
})

export class QuizPage implements OnInit {
  questions: any[] = [];
  currentQuestionIndex = 0;
  score = 0;
  selectedAnswer = '';
  answerSubmitted = false;
  quizFinished = false;
  resultMessage = '';

  constructor(
    private http: HttpClient,
    private storage: Storage
  ) {}

  async ngOnInit() {
    await this.storage.create();
    this.loadQuestions();
  }

  get currentQuestion() {
    return this.questions[this.currentQuestionIndex];
  }

  loadQuestions() {
    this.http
      .get<any>('https://opentdb.com/api.php?amount=10&type=multiple')
      .subscribe((data) => {
        this.questions = data.results.map((q: any) => {
          const answers = [...q.incorrect_answers, q.correct_answer];
          return {
            question: q.question,
            answers: this.shuffleArray(answers),
            correctAnswer: q.correct_answer
          };
        });
      });
  }

  shuffleArray(array: any[]) {
    return array.sort(() => Math.random() - 0.5);
  }

  selectAnswer(answer: string) {
    if (!this.answerSubmitted) {
      this.selectedAnswer = answer;
    }
  }

  submitAnswer() {
    if (!this.selectedAnswer) {
      alert('Please select an answer');
      return;
    }

    this.answerSubmitted = true;

    if (this.selectedAnswer === this.currentQuestion.correctAnswer) {
      this.score++;
      this.resultMessage = 'Correct!';
    } else {
      this.resultMessage =
        'Wrong! Correct answer: ' + this.currentQuestion.correctAnswer;
    }
  }

  async nextQuestion() {
    this.selectedAnswer = '';
    this.answerSubmitted = false;
    this.resultMessage = '';

    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
    } else {
      this.quizFinished = true;
      await this.saveScore();
    }
  }

  async saveScore() {
    await this.storage.set('latestScore', this.score);

    const highScore = await this.storage.get('highScore');

    if (highScore === null || this.score > highScore) {
      await this.storage.set('highScore', this.score);
    }
  }

  restartQuiz() {
    this.currentQuestionIndex = 0;
    this.score = 0;
    this.selectedAnswer = '';
    this.answerSubmitted = false;
    this.quizFinished = false;
    this.resultMessage = '';
    this.loadQuestions();
  }

  getButtonColor(answer: string) {
    if (!this.answerSubmitted) return 'primary';

    if (answer === this.currentQuestion.correctAnswer) {
      return 'success';
    }

    if (answer === this.selectedAnswer) {
      return 'danger';
    }

    return 'medium';
  }

  getButtonFill(answer: string) {
    if (!this.answerSubmitted) {
      return this.selectedAnswer === answer ? 'solid' : 'outline';
    }

    return 'solid';
  }
}