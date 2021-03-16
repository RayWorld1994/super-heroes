import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardItemStoryComponent } from './card-item-story.component';

describe('CardItemStoryComponent', () => {
  let component: CardItemStoryComponent;
  let fixture: ComponentFixture<CardItemStoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardItemStoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardItemStoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
