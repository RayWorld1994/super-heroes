import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SortComicComponent } from './sort-comic.component';

describe('SortComicComponent', () => {
  let component: SortComicComponent;
  let fixture: ComponentFixture<SortComicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SortComicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SortComicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
