import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayRecordComponent } from './play-record.component';

describe('PlayRecordComponent', () => {
  let component: PlayRecordComponent;
  let fixture: ComponentFixture<PlayRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayRecordComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlayRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
