import { Component, OnInit } from '@angular/core';
import { User } from '../shared/models/user.model';
import { AppState } from '../store/app.states';
import { Store } from '@ngrx/store';
import { SignUp } from '../store/actions/auth.actions';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  // user to login
  user: User = new User();

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
  }

  onSubmit(): void {
    const payload = {
      email: this.user.email,
      password: this.user.password
    };
    this.store.dispatch(new SignUp(payload));
  }

}
