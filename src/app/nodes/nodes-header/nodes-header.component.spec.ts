import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NodesHeaderComponent } from './nodes-header.component';

describe('NodesHeaderComponent', () => {
  let component: NodesHeaderComponent;
  let fixture: ComponentFixture<NodesHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NodesHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NodesHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
