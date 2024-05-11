import { ComponentFixture, TestBed } from '@angular/core/testing';

import { callbackPageComponent } from './callback-page.component';

describe('ListeArticleComponent', () => {
  let component: callbackPageComponent;
  let fixture: ComponentFixture<callbackPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ callbackPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(callbackPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
