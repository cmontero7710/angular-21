import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Altadieta } from './altadieta';

describe('Altadieta', () => {
  let component: Altadieta;
  let fixture: ComponentFixture<Altadieta>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Altadieta]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Altadieta);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
