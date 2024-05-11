import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditerProduitsComponent } from './editer-produits.component';

describe('EditerProduitsComponent', () => {
  let component: EditerProduitsComponent;
  let fixture: ComponentFixture<EditerProduitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditerProduitsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditerProduitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
