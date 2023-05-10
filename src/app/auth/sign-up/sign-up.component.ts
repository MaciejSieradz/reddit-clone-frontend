import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, throwError } from 'rxjs';
import { SignUp } from 'src/app/models/sign-up';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent {
  signup: SignUp;

  constructor(
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService
  ) {
    this.signup = new SignUp('', '', '');
  }

  signUp() {
    this.authService.signup(this.signup).subscribe({
      next: () => this.proceedSignUp(),
      error: (error) => this.registrationError(error),
    });
  }

  proceedSignUp() {
    this.router.navigate(['/login'], {
      queryParams: { registered: 'true' },
    });
  }

  registrationError(error: any) {
    console.log(error);
    this.toastr.error('Registration failed! Please try again');
  }
}
