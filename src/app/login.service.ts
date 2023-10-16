import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import firebase from 'firebase/compat/app';
import'firebase/compat/auth'; //esto es para usar la autenticacion de firebase
import { CookieService } from "ngx-cookie-service";

@Injectable() //Pongo esto por que este servicio va a ser inyectable en multiples componentes
export class LoginService{

    constructor(private router:Router, private cookies:CookieService){};

    token:string; //Esto es necesario para navegar en la aplicacion sin problema

    login(email:string, password:string,){ //Este metodo es el que tendra que autenticarse en la base de datos
        //signInWithEmailAndPassword es un metodo de firebase que recibe por parametro los datos que capto en esta funcion
        firebase.auth().signInWithEmailAndPassword(email, password).then(

            response=>{
                firebase.auth().currentUser?.getIdToken().then(
                    token=>{
                        this.token=token; //Con esto guardo el token generado en mi variable de tokern
                        //el metodo set es para escribir una cookie, admite dos parametros: el nombre de la cookie y el valor
                        this.cookies.set("token", this.token);
                        this.router.navigate(['/']); //Con esto retorno a la pagina de inicio
                    }
                )
            }
        );        
    };

    getIdToken(){
        //get es para recuperar el valor de la cookie
        return this.cookies.get("token");
    };

    estaLogueado(){ //Esta funcion devuelve el token cuando el usuario esta logueado
        return this.cookies.get("token");
    };

    logout(){ //Esta funcion cambia el token cuando se hace logout
        firebase.auth().signOut().then(()=>{
            this.token = "";
            this.cookies.set("token", this.token);
            this.router.navigate(['/']);
            window.location.reload
        });
    };

};
