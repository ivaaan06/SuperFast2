import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Invalid401Component } from './invalid401.component';

describe('Invalid401Component', () => {
  let component: Invalid401Component;
  let fixture: ComponentFixture<Invalid401Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Invalid401Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Invalid401Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
