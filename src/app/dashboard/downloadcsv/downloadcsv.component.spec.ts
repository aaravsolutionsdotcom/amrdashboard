import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadcsvComponent } from './downloadcsv.component';

describe('DownloadcsvComponent', () => {
  let component: DownloadcsvComponent;
  let fixture: ComponentFixture<DownloadcsvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DownloadcsvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadcsvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
