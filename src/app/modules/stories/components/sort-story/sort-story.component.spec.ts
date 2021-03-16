import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SortStoryComponent } from './sort-story.component';

describe('SortStoryComponent', () => {
  let component: SortStoryComponent;
  let fixture: ComponentFixture<SortStoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SortStoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SortStoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
