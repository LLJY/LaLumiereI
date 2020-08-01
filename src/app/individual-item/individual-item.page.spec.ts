import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { IndividualItemPage } from './individual-item.page';

describe('IndividualItemPage', () => {
  let component: IndividualItemPage;
  let fixture: ComponentFixture<IndividualItemPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndividualItemPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(IndividualItemPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
