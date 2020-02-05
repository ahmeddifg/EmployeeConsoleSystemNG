import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyfilesPageComponent } from './myfiles-page.component';

describe('MyfilesPageComponent', () => {
  let component: MyfilesPageComponent;
  let fixture: ComponentFixture<MyfilesPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyfilesPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyfilesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
