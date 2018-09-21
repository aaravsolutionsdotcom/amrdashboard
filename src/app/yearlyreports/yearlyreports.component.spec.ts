import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YearlyreportsComponent } from './yearlyreports.component';

describe('YearlyreportsComponent', () => {
  let component: YearlyreportsComponent;
  let fixture: ComponentFixture<YearlyreportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YearlyreportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YearlyreportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
