import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { imports } from '../../app.imports';

import { ToolbarComponent } from './toolbar.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('ToolbarComponent', () => {
  let component: ToolbarComponent;
  let fixture: ComponentFixture<ToolbarComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: imports,
      declarations: [ ToolbarComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
