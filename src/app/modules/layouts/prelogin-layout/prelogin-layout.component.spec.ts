import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreloginLayoutComponent } from './prelogin-layout.component';

describe('PreloginLayoutComponent', () => {
  let component: PreloginLayoutComponent;
  let fixture: ComponentFixture<PreloginLayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PreloginLayoutComponent]
    });
    fixture = TestBed.createComponent(PreloginLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
