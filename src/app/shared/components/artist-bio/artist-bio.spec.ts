import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistBio } from './artist-bio';

describe('ArtistBio', () => {
  let component: ArtistBio;
  let fixture: ComponentFixture<ArtistBio>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArtistBio],
    }).compileComponents();

    fixture = TestBed.createComponent(ArtistBio);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
