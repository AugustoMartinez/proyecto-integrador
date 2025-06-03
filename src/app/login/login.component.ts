import { Component, inject } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  private _authService = inject(AuthService);


  constructor(private router: Router) { 
    }

  ngOnInit() {

  }

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  goTo(path: string) {
    this.router.navigate([path]);
  }

  async submit() {
    if(this.form.invalid) return

    console.log(this.form.value.password)
    try {
      const authResponse = await this._authService.login({
        email: this.form.value.email ?? '',
        password: this.form.value.password ?? ''
      })
      
      if(authResponse.error){
        throw authResponse.error;
      } 
      console.log(authResponse.data.session);
      this.goTo('/home')
      } catch (error) {
        console.log(error);

      }
          
  }
}
