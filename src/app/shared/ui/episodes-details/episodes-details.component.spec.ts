import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EpisodesDetailsComponent } from './episodes-details.component';

describe('EpisodesDetailsComponent', () => {
  let component: EpisodesDetailsComponent;
  let fixture: ComponentFixture<EpisodesDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EpisodesDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EpisodesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
