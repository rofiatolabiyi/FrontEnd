import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GuessPage } from './guess.page';

describe('GuessPage', () => {
  let component: GuessPage;
  let fixture: ComponentFixture<GuessPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(GuessPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
