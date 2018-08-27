import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YeralyreportsComponent } from './yeralyreports.component';

describe('YeralyreportsComponent', () => {
  let component: YeralyreportsComponent;
  let fixture: ComponentFixture<YeralyreportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YeralyreportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YeralyreportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
