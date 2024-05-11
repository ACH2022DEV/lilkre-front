import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VotreCompteComponent } from './votre-compte.component';

describe('VotreCompteComponent', () => {
  let component: VotreCompteComponent;
  let fixture: ComponentFixture<VotreCompteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VotreCompteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VotreCompteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
