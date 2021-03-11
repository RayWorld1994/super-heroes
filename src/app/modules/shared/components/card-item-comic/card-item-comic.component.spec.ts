import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardItemComicComponent } from './card-item-comic.component';

describe('CardItemComicComponent', () => {
  let component: CardItemComicComponent;
  let fixture: ComponentFixture<CardItemComicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardItemComicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardItemComicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
