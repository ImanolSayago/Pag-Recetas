import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor() { }

  urlUsuarios= 'http://localhost:3000/Usuarios';
  http= inject(HttpClient);


  LoguearUsuario(userlog: User):Observable<User>
  {
    return this.http.post<User>(this.urlUsuarios,userlog);
  }

  GetUsuarios():Observable<User[]>
  {
    return this.http.get<User[]>(this.urlUsuarios);
  }
}
