import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditerPersonneComponent } from './editer-personne.component';

describe('EditerPersonneComponent', () => {
  let component: EditerPersonneComponent;
  let fixture: ComponentFixture<EditerPersonneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditerPersonneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditerPersonneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
