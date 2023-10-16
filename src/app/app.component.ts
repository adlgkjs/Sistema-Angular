import { Component } from '@angular/core';
import firebase from 'firebase/compat/app';
import { LoginService } from './login.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  titulo = 'EmpleadosApp';

      
  constructor(private loginService:LoginService){ 

  };

  ngOnInit(){
    //Esto es para inicializar la aplicacion de firebase
    firebase.initializeApp({
      apiKey: "AIzaSyBiVrP3W6Wx9jA29XLt98wEG1Tfv2rJVOQ",
      authDomain: "proyecto-angular-fc099.firebaseapp.com"
    });
  };

  estaLogueado(){
    return this.loginService.estaLogueado();
  };

  logout(){
    this.loginService.logout();
  };
};
















