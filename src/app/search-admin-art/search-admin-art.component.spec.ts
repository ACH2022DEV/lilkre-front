import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchAdminArtComponent } from './search-admin-art.component';

describe('SearchAdminArtComponent', () => {
  let component: SearchAdminArtComponent;
  let fixture: ComponentFixture<SearchAdminArtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchAdminArtComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchAdminArtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
