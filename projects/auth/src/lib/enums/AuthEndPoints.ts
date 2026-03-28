export class AuthEndPoints {
  static readonly BASE_URL = 'https://exam-app.elevate-bootcamp.cloud';
  private static readonly AUTH = '/api/auth';

  static build(path: string): string {
    return `${this.BASE_URL}${this.AUTH}/${path}`;
  }

  static readonly SEND_EMAIL_VERIFICATION = this.build('send-email-verification');
  static readonly CONFIRM_EMAIL_VERIFICATION = this.build('confirm-email-verification');
  static readonly REGISTER = this.build('register');
  static readonly LOGIN = this.build('login');
  static readonly FORGOT_PASSWORD = this.build('forgot-password');
  static readonly RESET_PASSWORD = this.build('reset-password');
}
