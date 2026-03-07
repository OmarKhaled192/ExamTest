import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MainBtn } from '../../../shared/main-btn/main-btn';
import { QuestionLink } from '../../../shared/question-link/question-link';

@Component({
  selector: 'app-create-password',
  standalone: true,
  imports: [CommonModule, FormsModule, MainBtn, QuestionLink],
  templateUrl: './create-password.html',
  styleUrl: './create-password.scss'
})
export class CreatePassword {
  password = ''; confirmPassword = '';
  showPassword = false; showConfirm = false;
  onReset() { console.log('Reset password submitted'); }
}
