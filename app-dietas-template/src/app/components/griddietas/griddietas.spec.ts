import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridDietasComponent } from './griddietas';

describe('Griddietas', () => {
  let component: GridDietasComponent;
  let fixture: ComponentFixture<GridDietasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Griddietas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Griddietas);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
