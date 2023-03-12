import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: 'signup.component.html',
  styleUrls:['signup.component.scss']
})

export class SignUpComponent implements OnInit {
  
  signupForm: FormGroup;

  constructor(private _fb:FormBuilder) {
    this.signupForm = this._fb.group({
      email: ['' , [Validators.email, Validators.required]],
      password: ['' , [ Validators.required]],
      password2: ['' , [ Validators.required]]
    })
  }


  ngOnInit() { }

  submit() {
    if (this.signupForm.valid) {
     // this.submitEM.emit(this.form.value);
    }
  }
}