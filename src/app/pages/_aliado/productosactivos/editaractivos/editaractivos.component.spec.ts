import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditaractivosComponent } from './editaractivos.component';

describe('EditaractivosComponent ', () => {
  let component: EditaractivosComponent ;
  let fixture: ComponentFixture<EditaractivosComponent >;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditaractivosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditaractivosComponent );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});