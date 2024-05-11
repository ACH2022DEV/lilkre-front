import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrerPersonneComponent } from './crer-personne.component';

describe('CrerPersonneComponent', () => {
  let component: CrerPersonneComponent;
  let fixture: ComponentFixture<CrerPersonneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrerPersonneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrerPersonneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
