import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualiserArticleComponent } from './visualiser-article.component';

describe('VisualiserArticleComponent', () => {
  let component: VisualiserArticleComponent;
  let fixture: ComponentFixture<VisualiserArticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisualiserArticleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualiserArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
