import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginFailed: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
     username: ['', Validators.required],
     password: ['', Validators.required]
    })
  }

  onSubmit() {
    this.loginFailed = false;

    if (this.loginForm.invalid) {
      return;
    }

    this.authenticationService.login(this.loginForm.get('username').value, this.loginForm.get('password').value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['/']);
        },
        error => {
          alert('Logowanie nie powiodło się.');
          this.loginFailed = true;
        }
      );
  }
}
