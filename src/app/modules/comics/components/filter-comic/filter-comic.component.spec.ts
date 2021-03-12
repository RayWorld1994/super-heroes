import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterComicComponent } from './filter-comic.component';

describe('FilterComicComponent', () => {
  let component: FilterComicComponent;
  let fixture: ComponentFixture<FilterComicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterComicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterComicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
