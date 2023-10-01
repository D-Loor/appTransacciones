import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiposCategoriasComponent } from './tipos-categorias.component';

describe('TiposCategoriasComponent', () => {
  let component: TiposCategoriasComponent;
  let fixture: ComponentFixture<TiposCategoriasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TiposCategoriasComponent]
    });
    fixture = TestBed.createComponent(TiposCategoriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
