import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { User } from '../_models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @Output() cancelRegister = new EventEmitter();
  user: User;
  registerForm: FormGroup;
  bsConfig: Partial<BsDatepickerConfig>;

  // tslint:disable-next-line:max-line-length
  constructor(private authService: AuthService, private alertifyService: AlertifyService, private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.bsConfig = {
      containerClass: 'theme-dark-blue'
    };

    this.createRegisterForm();

    // without Form Builder
    // this.registerForm = new FormGroup({
    //   username: new FormControl('', Validators.required),
    //   email: new FormControl('', [Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$'), Validators.required]),
    //   password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]),
    //   confirmPassword: new FormControl('', Validators.required)
    // }, this.passwordMatchValidator );
  }

  createRegisterForm() {
    this.registerForm = this.fb.group({
      gender: ['male'],
      email: ['', [Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$'), Validators.required]],
      username: ['', Validators.required],
      knownAs: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]],
      confirmPassword: ['', Validators.required]
    }, {validator: this.passwordMatchValidator});
  }

  passwordMatchValidator(validator: FormGroup) {
    return validator.get('password').value === validator.get('confirmPassword').value ? null : {'mismatch': true};
  }

  register() {
    if ( this.registerForm.valid) {
      this.user = Object.assign({}, this.registerForm.value);
    }
    this.authService.register(this.user).subscribe(() => {
      this.alertifyService.success('Registration Successfull!');
    }, error => {
      this.alertifyService.error(error);
    }, () => {
      this.authService.login(this.user).subscribe(() => {
        this.router.navigate(['/members']);
      });
    });
  }

  cancel() {
    this.cancelRegister.emit(false);
  }

}
