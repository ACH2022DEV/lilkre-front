import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchAvisComponent } from './search-avis.component';

describe('SearchAvisComponent', () => {
  let component: SearchAvisComponent;
  let fixture: ComponentFixture<SearchAvisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchAvisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchAvisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
