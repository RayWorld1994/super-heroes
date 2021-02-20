import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCharacterBookmarkComponent } from './list-character-bookmark.component';

describe('ListCharacterBookmarkComponent', () => {
  let component: ListCharacterBookmarkComponent;
  let fixture: ComponentFixture<ListCharacterBookmarkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListCharacterBookmarkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCharacterBookmarkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
