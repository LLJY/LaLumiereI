import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MoreItemsPage } from './more-items.page';

describe('MoreItemsPage', () => {
  let component: MoreItemsPage;
  let fixture: ComponentFixture<MoreItemsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoreItemsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MoreItemsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
