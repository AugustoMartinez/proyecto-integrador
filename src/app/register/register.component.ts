import { Component, computed, inject, signal } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup,FormBuilder, FormsModule, ReactiveFormsModule, Validators, Form } from '@angular/forms';
import { passwordMatchValidator } from '../../shared/password-match.validator';
@Component({
  standalone: true,
  selector: 'app-register',
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  private _authService = inject(AuthService);
  form!: FormGroup;
  toastMessage: string | null = null
/*
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl('', [Validators.required])
  },
{
  validators: passwordMatchValidator
});*/

  constructor(private router: Router, private fb: FormBuilder) {}

    ngOnInit() {
      this.form = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required]
      },
      {
        validators: passwordMatchValidator('password', 'confirmPassword')
      }
    );
    }

    get emailControl() {
      return this.form.get('email')!;
    }

    get passwordControl() {
      return this.form.get('password')!;
    }

    get confirmPasswordControl() {
      return this.form.get('confirmPassword')!;
    }


  goTo(path: string) {
    this.router.navigate([path]);
  }

  async submit() {
    if(this.form.invalid){
      this.form.markAllAsTouched() 
      return
    }

    try {
      const authResponse = await this._authService.signUp({
        email: this.emailControl.value ?? '',
        password: this.passwordControl.value ?? ''
      })
      
      if(authResponse.error){
        throw authResponse.error;
      } 
      console.log('Datos' + authResponse.data.session);
      this.goTo('/login')
      } catch (error: any) {
        if (error.message.includes('User already registered')) {

      this.showToast('El usuario ya está registrado.');
    }
        console.log('Error' + error);

      }
          
  }

  showToast(message: string) {
  this.toastMessage = message;

  // Oculta el toast después de 3 segundos
  setTimeout(() => {
    this.toastMessage = null;
  }, 3000);
}
}
