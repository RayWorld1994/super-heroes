import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListComicBookmarkComponent } from './list-comic-bookmark.component';

describe('ListComicBookmarkComponent', () => {
  let component: ListComicBookmarkComponent;
  let fixture: ComponentFixture<ListComicBookmarkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListComicBookmarkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComicBookmarkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
