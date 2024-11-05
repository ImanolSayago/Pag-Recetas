import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { RegistrarseComponent } from './usuarios/registrarse/registrarse.component';
import { IniciarSesionComponent } from './usuarios/iniciar-sesion/iniciar-sesion.component';


export const routes: Routes = [
    {path:'inicio',component:HomePageComponent},
    {path:'registrarse', component:RegistrarseComponent},
    {path:'iniciarSesion',component:IniciarSesionComponent},
    {path:'**',redirectTo:''}
   
];
