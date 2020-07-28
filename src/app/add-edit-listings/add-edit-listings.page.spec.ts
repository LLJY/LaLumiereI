import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddEditListingsPage } from './add-edit-listings.page';

describe('AddEditListingsPage', () => {
  let component: AddEditListingsPage;
  let fixture: ComponentFixture<AddEditListingsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditListingsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddEditListingsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
