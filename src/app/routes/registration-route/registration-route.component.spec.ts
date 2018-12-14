import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationRouteComponent } from './registration-route.component';

describe('RegistrationRouteComponent', () => {
  let component: RegistrationRouteComponent;
  let fixture: ComponentFixture<RegistrationRouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrationRouteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
