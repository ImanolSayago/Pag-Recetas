import { Component, inject } from '@angular/core';
import { User } from '../../interfaces/user';
import { UsuariosService } from '../../service/usuarios.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-registrarse',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './registrarse.component.html',
  styleUrl: './registrarse.component.css'
})
export class RegistrarseComponent {

  idlog:number=0;
  usuarioLog: User={
    nombreUsuario:"",
    email:"",
    contrasena:""
  }

  listaUsuarios : Array<User> =[];

  userService= inject(UsuariosService);
  rutas= inject(Router)

  logUser() {

    this.usuarioLog.id = this.idlog++;
  
    if (!this.usuarioLog.nombreUsuario || !this.usuarioLog.contrasena) {
      alert("Complete todos los campos");
      return; 
    }
  
    
    this.userService.GetUsuarios().subscribe({
      next: (usuarios) => {
        this.listaUsuarios = usuarios; 

        const nombreencontrado= this.listaUsuarios.some(u => u.nombreUsuario === this.usuarioLog.nombreUsuario);
        const emailencontrado= this.listaUsuarios.some(u => u.email === this.usuarioLog.email);



        if (nombreencontrado) {

          alert("El nombre de usuario ya existe. Elige otro.");
          return; 
        }
        else if (emailencontrado) {
          alert("El email ya esta en uso. Elige otro.");
          return; 
        } 
        else {
          
          this.userService.LoguearUsuario(this.usuarioLog).subscribe({
            next: () => {
              this.rutas.navigate(['/inicio']);
            },
            error: (err: Error) => {
              console.log(err.message);
            }
          });
        }
      },
      error: (err: Error) => {
        console.log(err.message); 
      }
    });
  }

}
