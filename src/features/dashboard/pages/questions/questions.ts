import { Component, OnInit, OnDestroy, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { BreadcrumbComponent } from '../../../../shared/components/breadcrumb/breadcrumb';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header';
import { MainBtn } from '../../../../shared/components/main-btn/main-btn';

interface Question {
  id: number;
  text: string;
  options: string[];
  correctIndex: number;
  selectedIndex: number | null;
}

@Component({
  selector: 'app-questions',
  standalone: true,
  imports: [CommonModule, RouterModule, BreadcrumbComponent, PageHeaderComponent, MainBtn],
  templateUrl: './questions.html',
  styleUrl: './questions.scss'
})
export class QuestionsPage implements OnInit, OnDestroy {
  breadcrumbs = [
    { label: 'Home', path: '/dashboard' },
    { label: 'Exams', path: '/dashboard/diplomas/1/exams' },
    { label: 'CSS Quiz', path: '/dashboard/diplomas/1/exams/1' },
    { label: 'Questions' }
  ];

  headerIcon = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
    <circle cx="12" cy="12" r="10"/>
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/>
  </svg>`;

  questions: Question[] = Array.from({ length: 25 }, (_, i) => ({
    id: i + 1,
    text: 'What does CSS stand for?',
    options: ['Computer Style Sheets', 'Creative Style Sheets', 'Cascading Style Sheets', 'Colorful Style Sheets'],
    correctIndex: 2,
    selectedIndex: null
  }));

  currentIndex = signal(0);
  timeLeft = signal(61); // seconds per question
  showResults = signal(false);
  private timer: any;

  currentQuestion = computed(() => this.questions[this.currentIndex()]);
  progress = computed(() => ((this.currentIndex() + 1) / this.questions.length) * 100);
  timerDeg = computed(() => (this.timeLeft() / 61) * 360);
  timerColor = computed(() => this.timeLeft() > 20 ? 'var(--primary)' : 'var(--danger)');

  get correctCount() { return this.questions.filter(q => q.selectedIndex === q.correctIndex).length; }
  get incorrectCount() { return this.questions.filter(q => q.selectedIndex !== null && q.selectedIndex !== q.correctIndex).length; }

  constructor(private router: Router) {}

  ngOnInit() { this.startTimer(); }
  ngOnDestroy() { clearInterval(this.timer); }

  startTimer() {
    clearInterval(this.timer);
    this.timeLeft.set(61);
    this.timer = setInterval(() => {
      this.timeLeft.update(t => {
        if (t <= 1) { this.nextQuestion(); return 61; }
        return t - 1;
      });
    }, 1000);
  }

  selectOption(index: number) {
    this.questions[this.currentIndex()].selectedIndex = index;
  }

  nextQuestion() {
    if (this.currentIndex() < this.questions.length - 1) {
      this.currentIndex.update(i => i + 1);
      this.startTimer();
    } else {
      this.showResults.set(true);
      clearInterval(this.timer);
    }
  }

  prevQuestion() {
    if (this.currentIndex() > 0) {
      this.currentIndex.update(i => i - 1);
      this.startTimer();
    }
  }

  restart() {
    this.questions.forEach(q => q.selectedIndex = null);
    this.currentIndex.set(0);
    this.showResults.set(false);
    this.startTimer();
  }

  get timerDisplay() {
    const m = Math.floor(this.timeLeft() / 60);
    const s = this.timeLeft() % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  }
}

