import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerRouteComponent } from './player-route.component';

describe('PlayerRouteComponent', () => {
  let component: PlayerRouteComponent;
  let fixture: ComponentFixture<PlayerRouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerRouteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
