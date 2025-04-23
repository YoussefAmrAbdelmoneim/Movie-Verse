import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopularTvShowsComponent } from './popular-tv-shows.component';

describe('PopularTvShowsComponent', () => {
  let component: PopularTvShowsComponent;
  let fixture: ComponentFixture<PopularTvShowsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopularTvShowsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopularTvShowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
