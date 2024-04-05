import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionItemComponent } from './option-item.component';

describe('OptionItemComponent', () => {
  let component: OptionItemComponent;
  let fixture: ComponentFixture<OptionItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OptionItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OptionItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
