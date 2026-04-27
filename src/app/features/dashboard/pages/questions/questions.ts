import { Component, inject, OnInit, OnDestroy, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { BreadcrumbComponent } from '../../../../shared/breadcrumb/breadcrumb';
import { PageHeaderComponent } from '../../../../shared/page-header/page-header';
import { QuestionsService } from '../../../../core/services/questions.service';
import { SubmissionsService } from '../../../../core/services/submissions.service';

export interface UIQuestion {
  id: string;
  text: string;
  options: string[];
  answerIds: string[];
  correctIndex: number | null;
  selectedIndex: number | null;
}

@Component({
  selector: 'app-questions',
  standalone: true,
  imports: [CommonModule, RouterModule, BreadcrumbComponent, PageHeaderComponent],
  templateUrl: './questions.html',
})
export class QuestionsPage implements OnInit, OnDestroy {
  private readonly questionsService = inject(QuestionsService);
  private readonly submissionsService = inject(SubmissionsService);
  private readonly route = inject(ActivatedRoute);

  diplomaId = '';
  examId = '';
  startedAt = new Date().toISOString();

  breadcrumbs = [
    { label: 'Home', path: '/dashboard' },
    { label: 'Exams', path: '/dashboard/diplomas/1/exams' },
    { label: 'Exam' },
    { label: 'Questions' }
  ];

  headerIcon = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
    <circle cx="12" cy="12" r="10"/>
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
    <line x1="12" y1="17" x2="12.01" y2="17"/>
  </svg>`;

  questions = signal<UIQuestion[]>([]);

  currentIndex = signal(0);
  timeLeftSec = signal(61);
  showResults = signal(false);
  private timerRef: any;

  currentQuestion = computed(() => this.questions()[this.currentIndex()] || { options: [] });
  progressPct = computed(() => this.questions().length ? ((this.currentIndex() + 1) / this.questions().length) * 100 : 0);
  timerDeg = computed(() => (this.timeLeftSec() / 61) * 360);

  get timerDisplay(): string {
    const m = Math.floor(this.timeLeftSec() / 60);
    const s = this.timeLeftSec() % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  }

  get timerStroke(): string {
    return this.timeLeftSec() > 15 ? '#2563eb' : '#ef4444';
  }

  get correctCount(): number { return this.questions().filter(q => q.correctIndex !== null && q.selectedIndex === q.correctIndex).length; }
  get incorrectCount(): number { return this.questions().filter(q => q.selectedIndex !== null && q.correctIndex !== null && q.selectedIndex !== q.correctIndex).length; }
  get correctDash(): string { return `${this.questions().length ? (this.correctCount / this.questions().length) * 138.23 : 0} 138.23`; }
  get incorrectOffset(): number { return this.questions().length ? -((this.correctCount / this.questions().length) * 138.23) : 0; }
  get incorrectDash(): string { return `${this.questions().length ? (this.incorrectCount / this.questions().length) * 138.23 : 0} 138.23`; }

  ngOnInit() {
    this.diplomaId = this.route.snapshot.params['diplomaId'];
    this.examId = this.route.snapshot.params['examId'];
    this.breadcrumbs[1].path = `/dashboard/diplomas/${this.diplomaId}/exams`;

    this.questionsService.getExamQuestions(this.examId).subscribe({
      next: (res) => {
        this.questions.set(res.map(q => {
          return {
            id: q.id,
            text: q.text,
            options: q.answers.map(a => a.text),
            answerIds: q.answers.map(a => a.id),
            correctIndex: null,
            selectedIndex: null
          };
        }));
        this.startedAt = new Date().toISOString();
        if (this.questions().length > 0) {
          this.startTimer();
        }
      },
      error: (err) => console.error('Failed to load questions', err)
    });
  }

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
    if (this.currentIndex() < this.questions().length - 1) {
      this.currentIndex.update(i => i + 1);
      this.startTimer();
    } else {
      this.submitExam();
    }
  }

  submitExam() {
    clearInterval(this.timerRef);

    const answers = this.questions()
      .filter(q => q.selectedIndex !== null)
      .map(q => ({
        questionId: q.id,
        answerId: q.answerIds[q.selectedIndex!]
      }));

    this.submissionsService.submitExam({
      examId: this.examId,
      startedAt: this.startedAt,
      answers
    }).subscribe({
      next: (res) => {
        if (res.analytics) {
          this.questions.update(qs => {
            res.analytics.forEach(analytic => {
              const q = qs.find(q => q.id === analytic.questionId);
              if (q && analytic.correctAnswer && analytic.correctAnswer.id) {
                q.correctIndex = q.answerIds.indexOf(analytic.correctAnswer.id);
              }
            });
            return [...qs];
          });
        }
        this.showResults.set(true);
      },
      error: (err) => console.error('Submission failed', err)
    });
  }

  select(i: number) {
    this.questions.update(qs => {
      qs[this.currentIndex()].selectedIndex = i;
      return [...qs];
    });
  }

  next() { this.advance(); }
  prev() {
    if (this.currentIndex() > 0) { this.currentIndex.update(i => i - 1); this.startTimer(); }
  }

  restart() {
    this.questions.update(qs => {
      qs.forEach(q => q.selectedIndex = null);
      return [...qs];
    });
    this.currentIndex.set(0);
    this.showResults.set(false);
    this.startedAt = new Date().toISOString();
    if (this.questions().length > 0) {
      this.startTimer();
    }
  }
}

