import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../../interfaces/user';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { routes } from '../../app.routes';

@Component({
  selector: 'app-iniciar-sesion',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './iniciar-sesion.component.html',
  styleUrl: './iniciar-sesion.component.css'
})
export class IniciarSesionComponent {

  rutas = inject(Router);
  usuario: User= {
    nombreUsuario:"",
    contrasena:""
  }

  IniciarSesion()
  {

  }

  irLoguearse()
  {
    this.rutas.navigate(['/registro']);
  }
}
