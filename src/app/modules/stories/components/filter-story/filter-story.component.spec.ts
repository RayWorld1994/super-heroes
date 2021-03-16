import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterStoryComponent } from './filter-story.component';

describe('FilterStoryComponent', () => {
  let component: FilterStoryComponent;
  let fixture: ComponentFixture<FilterStoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterStoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterStoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
