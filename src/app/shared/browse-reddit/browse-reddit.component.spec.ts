import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowseRedditComponent } from './browse-reddit.component';

describe('BrowseRedditComponent', () => {
  let component: BrowseRedditComponent;
  let fixture: ComponentFixture<BrowseRedditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrowseRedditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrowseRedditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
