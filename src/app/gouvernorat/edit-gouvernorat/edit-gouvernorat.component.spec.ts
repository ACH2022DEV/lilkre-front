import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditGouvernoratComponent } from './edit-gouvernorat.component';

describe('EditGouvernoratComponent', () => {
  let component: EditGouvernoratComponent;
  let fixture: ComponentFixture<EditGouvernoratComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditGouvernoratComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditGouvernoratComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
