import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualiserPersonneComponent } from './visualiser-personne.component';

describe('VisualiserPersonneComponent', () => {
  let component: VisualiserPersonneComponent;
  let fixture: ComponentFixture<VisualiserPersonneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisualiserPersonneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualiserPersonneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
