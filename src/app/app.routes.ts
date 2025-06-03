import { Routes } from '@angular/router';
import { privateGuard, publicGuard } from './guards/auth.guard.ts.guard';
import { AhorcadoComponent } from './juegos/ahorcado/ahorcado.component';

export const routes: Routes = [
    {
        path:'',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        loadComponent: () => import('./home/home.component').then(m => m.HomeComponent)
    },
    {
        path: 'about',
        loadComponent: () => import('./about/about.component').then(m => m.AboutComponent)
    },
    {
        path: 'login',
        canActivate:[publicGuard],
        loadComponent: () => import('./login/login.component').then(m => m.LoginComponent)
    },
    {
        path: 'register',
        canActivate:[publicGuard],
        loadComponent: () => import('./register/register.component').then(m => m.RegisterComponent)
    },
    {
        path: 'ahorcado',
        canActivate:[privateGuard],
        loadComponent: () => import('./juegos/ahorcado/ahorcado.component').then(m => m.AhorcadoComponent)
    },
    {
        path: 'mayor-menor',
        canActivate:[privateGuard],
        loadComponent: () => import('./juegos/mayor-menor/mayor-menor.component').then(m => m.MayorMenorComponent)
    },
    {
        path: 'preguntados',
        canActivate: [privateGuard],
        loadComponent: () => import('./juegos/preguntados/preguntados.component').then(m => m.PreguntadosComponent)
    },
    {
        path: 'estadisticas',
        canActivate: [privateGuard],
        loadComponent: () => import('./estadisticas/estadisticas.component').then(m => m.EstadisticasComponent)
    },
    {
        path: 'encuesta',
        canActivate: [privateGuard],
        loadComponent: () => import('./encuesta/encuesta.component').then(m=>m.EncuestaComponent)
    },
    {
        path: 'tesoro',
        canActivate: [privateGuard],
        loadComponent: () => import('./juegos/encuentra-tesoro/encuentra-tesoro.component').then(m => m.EncuentraTesoroComponent)
    }
];
    