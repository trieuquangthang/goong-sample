import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkerSampleComponent } from './marker-sample.component';

describe('MarkerSampleComponent', () => {
  let component: MarkerSampleComponent;
  let fixture: ComponentFixture<MarkerSampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarkerSampleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarkerSampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
