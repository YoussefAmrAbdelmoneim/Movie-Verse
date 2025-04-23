import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AiringTodayComponent } from './airing-today.component';

describe('AiringTodayComponent', () => {
  let component: AiringTodayComponent;
  let fixture: ComponentFixture<AiringTodayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AiringTodayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AiringTodayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
