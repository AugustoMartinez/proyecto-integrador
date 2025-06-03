import { Component,inject,OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { initFlowbite } from 'flowbite'; // Import the function from the Flowbite library
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'tp-integrador';
  valor = 1
  valor_2 = 2
  protected _authService = inject(AuthService);
  
  constructor(private router : Router){

  }
  ngOnInit() : void {
    initFlowbite();
  }

  goTo(path: string) {
    this.router.navigate([path])
  }

  close(){
    this._authService.singOut()
    this.goTo('/login')
  }
}
