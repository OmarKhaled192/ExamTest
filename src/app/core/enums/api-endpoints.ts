export class ApiEndPoints {
  static readonly BASE_URL = 'https://exam-app.elevate-bootcamp.cloud';
  
  private static readonly API = '/api';

  static build(path: string): string {
    return `${this.BASE_URL}${this.API}/${path}`;
  }

  static readonly DIPLOMAS = this.build('diplomas');
  static readonly EXAMS = this.build('exams');
  static readonly QUESTIONS = this.build('questions');
  static readonly SUBMISSIONS = this.build('submissions');
}
