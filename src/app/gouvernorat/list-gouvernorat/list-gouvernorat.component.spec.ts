import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListGouvernoratComponent } from './list-gouvernorat.component';

describe('ListGouvernoratComponent', () => {
  let component: ListGouvernoratComponent;
  let fixture: ComponentFixture<ListGouvernoratComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListGouvernoratComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListGouvernoratComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
