import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MainBtn } from '../../shared/main-btn/main-btn';
import { MainTitle } from '../../shared/main-title/main-title';
import { ArticleDesc } from '../../shared/article-desc/article-desc';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-auth',
  imports: [RouterOutlet, MainBtn, MainTitle, ArticleDesc],
  templateUrl: './auth.html',
  styleUrl: './auth.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Auth {

}
