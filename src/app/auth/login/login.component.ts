import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { throwError } from 'rxjs';
import { LoginCredentials } from 'src/app/models/login-credentials';
import { AuthService } from '../auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public loginCredentials: LoginCredentials;
  isError: boolean = false;
  justRegistered = false;

  constructor(
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
  ) {
    this.loginCredentials = new LoginCredentials('', '');


    this.activatedRoute.queryParams.subscribe(params => {
    })
  }

  public login() {
    this.authService.login(this.loginCredentials).subscribe({
      next: () => this.proceedLogin(),
      error: (error) =>  this.proceedError(error),
    });
  }

  proceedLogin() {
    this.isError = false;
    this.router.navigateByUrl('');
    this.toastr.success("Login successfull!");
  }

  proceedError(error : any) {
    this.isError = true;
    this.toastr.error('Login failed! Try again');
    throwError(() => new Error(error));
  }

  ngOnInit(): void { 
    this.activatedRoute.queryParams.subscribe(params => {
      if (params['registered'] !== undefined && params['registered'] === 'true') {
        this.toastr.success('Signup Successfull!');
        this.justRegistered = true;
      }
    })
  }
}
