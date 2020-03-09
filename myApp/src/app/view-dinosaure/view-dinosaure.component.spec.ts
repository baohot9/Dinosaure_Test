import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDinosaureComponent } from './view-dinosaure.component';

describe('ViewDinosaureComponent', () => {
  let component: ViewDinosaureComponent;
  let fixture: ComponentFixture<ViewDinosaureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewDinosaureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewDinosaureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
