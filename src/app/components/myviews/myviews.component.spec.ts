import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyviewsComponent } from './myviews.component';

describe('MyviewsComponent', () => {
  let component: MyviewsComponent;
  let fixture: ComponentFixture<MyviewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyviewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
