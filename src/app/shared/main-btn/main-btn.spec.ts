import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainBtn } from './main-btn';

describe('MainBtn', () => {
  let component: MainBtn;
  let fixture: ComponentFixture<MainBtn>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainBtn]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainBtn);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
