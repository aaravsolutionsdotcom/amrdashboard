import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyreportsComponent } from './monthlyreports.component';

describe('MonthlyreportsComponent', () => {
  let component: MonthlyreportsComponent;
  let fixture: ComponentFixture<MonthlyreportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonthlyreportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthlyreportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
