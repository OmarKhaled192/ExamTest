import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleDesc } from './article-desc';

describe('ArticleDesc', () => {
  let component: ArticleDesc;
  let fixture: ComponentFixture<ArticleDesc>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArticleDesc]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArticleDesc);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
