import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchPersonneComponent } from './search-personne.component';

describe('SearchPersonneComponent', () => {
  let component: SearchPersonneComponent;
  let fixture: ComponentFixture<SearchPersonneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchPersonneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchPersonneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
