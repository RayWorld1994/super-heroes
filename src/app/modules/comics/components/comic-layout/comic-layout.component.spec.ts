import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComicLayoutComponent } from './comic-layout.component';

describe('ComicLayoutComponent', () => {
  let component: ComicLayoutComponent;
  let fixture: ComponentFixture<ComicLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComicLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComicLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
