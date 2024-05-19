import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrerCategorieComponent } from './crer-categorie.component';

describe('CrerCategorieComponent', () => {
  let component: CrerCategorieComponent;
  let fixture: ComponentFixture<CrerCategorieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrerCategorieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrerCategorieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
