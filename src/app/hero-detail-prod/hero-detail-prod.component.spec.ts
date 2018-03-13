import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroDetailProdComponent } from './hero-detail-prod.component';

describe('HeroDetailProdComponent', () => {
  let component: HeroDetailProdComponent;
  let fixture: ComponentFixture<HeroDetailProdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeroDetailProdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroDetailProdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
