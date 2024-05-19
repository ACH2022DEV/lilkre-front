import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrerGouvernoratComponent } from './crer-gouvernorat.component';

describe('CrerGouvernoratComponent', () => {
  let component: CrerGouvernoratComponent;
  let fixture: ComponentFixture<CrerGouvernoratComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrerGouvernoratComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrerGouvernoratComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
