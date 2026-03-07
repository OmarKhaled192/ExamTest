import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MainBtn } from '../../../shared/main-btn/main-btn';
import { QuestionLink } from '../../../shared/question-link/question-link';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, MainBtn, QuestionLink],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class Register {
  firstName = ''; lastName = ''; username = ''; email = '';
  phone = ''; password = ''; confirmPassword = '';
  showPassword = false; showConfirm = false;
  onRegister() { console.log('Register submitted'); }
}
