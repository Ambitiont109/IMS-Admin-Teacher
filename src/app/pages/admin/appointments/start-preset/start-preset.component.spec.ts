import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StartPresetComponent } from './start-preset.component';

describe('StartPresetComponent', () => {
  let component: StartPresetComponent;
  let fixture: ComponentFixture<StartPresetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StartPresetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartPresetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
