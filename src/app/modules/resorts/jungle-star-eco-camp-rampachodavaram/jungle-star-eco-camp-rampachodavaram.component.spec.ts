import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JungleStarEcoCampRampachodavaramComponent } from './jungle-star-eco-camp-rampachodavaram.component';

describe('JungleStarEcoCampRampachodavaramComponent', () => {
  let component: JungleStarEcoCampRampachodavaramComponent;
  let fixture: ComponentFixture<JungleStarEcoCampRampachodavaramComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JungleStarEcoCampRampachodavaramComponent]
    });
    fixture = TestBed.createComponent(JungleStarEcoCampRampachodavaramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
