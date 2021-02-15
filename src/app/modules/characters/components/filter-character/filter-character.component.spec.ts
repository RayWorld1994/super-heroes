import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterCharacterComponent } from './filter-character.component';

describe('FilterCharacterComponent', () => {
  let component: FilterCharacterComponent;
  let fixture: ComponentFixture<FilterCharacterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterCharacterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterCharacterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
