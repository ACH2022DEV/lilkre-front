import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualiserProduitsComponent } from './visualiser-produits.component';

describe('VisualiserProduitsComponent', () => {
  let component: VisualiserProduitsComponent;
  let fixture: ComponentFixture<VisualiserProduitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisualiserProduitsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualiserProduitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
