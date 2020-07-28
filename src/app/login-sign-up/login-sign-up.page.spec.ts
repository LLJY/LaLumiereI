import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LoginSignUpPage } from './login-sign-up.page';

describe('LoginSignUpPage', () => {
  let component: LoginSignUpPage;
  let fixture: ComponentFixture<LoginSignUpPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginSignUpPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginSignUpPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
