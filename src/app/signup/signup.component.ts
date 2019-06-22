import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  public loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    // create our form group with all the inputs we will be using in the template
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      rememberMe: ['']
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    console.log(this.loginForm)

    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
    }
  }

}
