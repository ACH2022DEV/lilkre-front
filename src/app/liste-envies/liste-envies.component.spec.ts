import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeEnviesComponent } from './liste-envies.component';

describe('ListeEnviesComponent', () => {
  let component: ListeEnviesComponent;
  let fixture: ComponentFixture<ListeEnviesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeEnviesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeEnviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
