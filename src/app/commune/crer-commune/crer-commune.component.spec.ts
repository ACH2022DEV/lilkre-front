import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrerCommuneComponent } from './crer-commune.component';

describe('CrerCommuneComponent', () => {
  let component: CrerCommuneComponent;
  let fixture: ComponentFixture<CrerCommuneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrerCommuneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrerCommuneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
