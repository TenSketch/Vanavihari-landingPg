import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendCredentialsComponent } from './customer-info.component';

describe('SendCredentialsComponent', () => {
  let component: SendCredentialsComponent;
  let fixture: ComponentFixture<SendCredentialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendCredentialsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SendCredentialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
