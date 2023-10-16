import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private loginService:LoginService){};

  //conn NgForm recibimos los campos del formulario
  login(form:NgForm){
    const usuario = form.value.email ; //email es el name del input
    const contraseña = form.value.password; //password es el name del input
  
    this.loginService.login(usuario, contraseña);
  };
}
