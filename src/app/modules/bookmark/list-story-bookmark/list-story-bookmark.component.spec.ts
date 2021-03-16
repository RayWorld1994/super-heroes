import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListStoryBookmarkComponent } from './list-story-bookmark.component';

describe('ListStoryBookmarkComponent', () => {
  let component: ListStoryBookmarkComponent;
  let fixture: ComponentFixture<ListStoryBookmarkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListStoryBookmarkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListStoryBookmarkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
