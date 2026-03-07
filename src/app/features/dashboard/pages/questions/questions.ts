import { Component, OnInit, OnDestroy, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { BreadcrumbComponent } from '../../../../shared/breadcrumb/breadcrumb';
import { PageHeaderComponent } from '../../../../shared/page-header/page-header';
import { MainBtn } from '../../../../shared/main-btn/main-btn';

export interface Question {
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
})
export class QuestionsPage implements OnInit, OnDestroy {
  breadcrumbs = [
    { label: 'Home', path: '/dashboard' },
    { label: 'Exams', path: '/dashboard/diplomas/1/exams' },
    { label: 'CSS Quiz' },
    { label: 'Questions' }
  ];

  headerIcon = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
    <circle cx="12" cy="12" r="10"/>
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
    <line x1="12" y1="17" x2="12.01" y2="17"/>
  </svg>`;

  questions: Question[] = Array.from({ length: 25 }, (_, i) => ({
    id: i + 1,
    text: 'What does CSS stand for?',
    options: ['Computer Style Sheets', 'Creative Style Sheets', 'Cascading Style Sheets', 'Colorful Style Sheets'],
    correctIndex: 2,
    selectedIndex: null,
  }));

  currentIndex = signal(0);
  timeLeftSec = signal(61);
  showResults = signal(false);
  private timerRef: any;

  currentQuestion = computed(() => this.questions[this.currentIndex()]);
  progressPct = computed(() => ((this.currentIndex() + 1) / this.questions.length) * 100);
  timerDeg = computed(() => (this.timeLeftSec() / 61) * 360);

  get timerDisplay(): string {
    const m = Math.floor(this.timeLeftSec() / 60);
    const s = this.timeLeftSec() % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  }

  get timerStroke(): string {
    return this.timeLeftSec() > 15 ? '#2563eb' : '#ef4444';
  }

  // SVG donut values (r=22, circumference=138.23)
  get correctCount(): number { return this.questions.filter(q => q.selectedIndex === q.correctIndex).length; }
  get incorrectCount(): number { return this.questions.filter(q => q.selectedIndex !== null && q.selectedIndex !== q.correctIndex).length; }
  get correctDash(): string { return `${(this.correctCount / this.questions.length) * 138.23} 138.23`; }
  get incorrectOffset(): number { return -((this.correctCount / this.questions.length) * 138.23); }
  get incorrectDash(): string { return `${(this.incorrectCount / this.questions.length) * 138.23} 138.23`; }

  ngOnInit() { this.startTimer(); }
  ngOnDestroy() { clearInterval(this.timerRef); }

  startTimer() {
    clearInterval(this.timerRef);
    this.timeLeftSec.set(61);
    this.timerRef = setInterval(() => {
      this.timeLeftSec.update(t => {
        if (t <= 1) { this.advance(); return 61; }
        return t - 1;
      });
    }, 1000);
  }

  advance() {
    if (this.currentIndex() < this.questions.length - 1) {
      this.currentIndex.update(i => i + 1);
      this.startTimer();
    } else {
      this.showResults.set(true);
      clearInterval(this.timerRef);
    }
  }

  select(i: number) { this.questions[this.currentIndex()].selectedIndex = i; }
  next() { this.advance(); }
  prev() {
    if (this.currentIndex() > 0) { this.currentIndex.update(i => i - 1); this.startTimer(); }
  }

  restart() {
    this.questions.forEach(q => q.selectedIndex = null);
    this.currentIndex.set(0);
    this.showResults.set(false);
    this.startTimer();
  }
}

