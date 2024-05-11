import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrerProduitsComponent } from './crer-produits.component';

describe('CrerProduitsComponent', () => {
  let component: CrerProduitsComponent;
  let fixture: ComponentFixture<CrerProduitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrerProduitsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrerProduitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
