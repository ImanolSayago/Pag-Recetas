import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../interfaces/user';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { routes } from '../../app.routes';
import { UsuariosService } from '../../service/usuarios.service';

@Component({
  selector: 'app-iniciar-sesion',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './iniciar-sesion.component.html',
  styleUrl: './iniciar-sesion.component.css'
})
export class IniciarSesionComponent {

  fb = inject(FormBuilder)

  servicioUsuario= inject(UsuariosService);
  rutas = inject(Router);

  formulario=this.fb.nonNullable.group({
    nombreUsuario:['',[Validators.required]],
    contrasena:['',[Validators.required]]
  })

  ingresar(){
    if(this.formulario.invalid){
      alert("El formulario esta mal realizado");
      return;
    }

    const user:User = this.formulario.getRawValue();

    var listausuarios:Array<User>=[];

      this.servicioUsuario.getUsuarios().subscribe({
      next:(lista)=>
      {
        listausuarios=lista
        const nombreencontrado = listausuarios.some(us=>us.nombreUsuario=== user.nombreUsuario);
        const contrasenaEncontrada= listausuarios.some(us=>us.contrasena===user.contrasena);

        if(!nombreencontrado){
          alert("El nombre de usuario es incorrecto");
          return;
        }
        if(!contrasenaEncontrada)
        {
          alert("La contraseña es incorrecta");
          return;
        }


        this.servicioUsuario.login(user.nombreUsuario,user.contrasena).subscribe(
          {
            next:(logueado)=>{
              if(logueado){
                this.rutas.navigate(['inicio']); //tendria que ser el home page putitos
              }
            },
            error:(err:Error)=>{
              console.log(err.message);
            }
          }
        )

      }
    })
   
    
    }
}
