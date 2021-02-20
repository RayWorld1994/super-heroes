import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookmarkLayoutComponent } from './bookmark-layout.component';

describe('BookmarkLayoutComponent', () => {
  let component: BookmarkLayoutComponent;
  let fixture: ComponentFixture<BookmarkLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookmarkLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookmarkLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
