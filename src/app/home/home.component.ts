import { Component, inject } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { initFlowbite } from 'flowbite'; // Import the function from the Flowbite library
@Component({
  standalone: true,
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  protected _authService = inject(AuthService);
  
  constructor(private router : Router){

  }
  ngOnInit(){
  }

  goTo(path: string) {
    this.router.navigate([path])
  }

  close(){
    this._authService.singOut()
    this.goTo('/login')
  }

}
