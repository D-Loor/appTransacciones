import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificarComponent } from './notificar.component';

describe('NotificarComponent', () => {
  let component: NotificarComponent;
  let fixture: ComponentFixture<NotificarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotificarComponent]
    });
    fixture = TestBed.createComponent(NotificarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
