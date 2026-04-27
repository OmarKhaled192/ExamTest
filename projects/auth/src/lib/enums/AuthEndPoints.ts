export class AuthEndPoints {
  private static readonly AUTH = '/api/auth';

  static readonly SEND_EMAIL_VERIFICATION = `${this.AUTH}/send-email-verification`;
  static readonly CONFIRM_EMAIL_VERIFICATION = `${this.AUTH}/confirm-email-verification`;
  static readonly REGISTER = `${this.AUTH}/register`;
  static readonly LOGIN = `${this.AUTH}/login`;
  static readonly FORGOT_PASSWORD = `${this.AUTH}/forgot-password`;
  static readonly RESET_PASSWORD = `${this.AUTH}/reset-password`;
}
