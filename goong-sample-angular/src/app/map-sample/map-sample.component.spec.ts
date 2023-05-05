import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapSampleComponent } from './map-sample.component';

describe('MapSampleComponent', () => {
  let component: MapSampleComponent;
  let fixture: ComponentFixture<MapSampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapSampleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapSampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
