import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { ComponenteHijoComponent } from './componente-hijo/componente-hijo.component';
import { CaracteristicasEmpleadoComponent } from './caracteristicas-empleado/caracteristicas-empleado.component'; //Aqui esta importado el componente que cree
import { ServicioEmpleadosService } from './servicio-empleados.service';
import { EmpleadosService } from './empleados.service';
import { HomeComponentComponent } from './home-component/home-component.component';
import { ProyectosComponentComponent } from './proyectos-component/proyectos-component.component';
import { QuienesSomosComponentComponent } from './quienes-somos-component/quienes-somos-component.component';
import { ContactoComponentComponent } from './contacto-component/contacto-component.component';
import { RouterModule, Routes } from '@angular/router';
import { ActualizaComponentComponent } from './actualiza-component/actualiza-component.component';
import { ErrorPersonalizadoComponent } from './error-personalizado/error-personalizado.component'; //importor la funcion Routes de angular para poderla usar abajo
import {HttpClientModule} from '@angular/common/http'; //Este modulo nos permite enviar informacion de nuestra pagina a la base de datos
import { DataServices } from './data.services';
import { LoginComponent } from './login/login.component';
import { LoginService } from './login.service';
import { CookieService } from 'ngx-cookie-service';
import { LoginGuardian } from './login/login_guardian';


//Al parecer el archivo component.html tiene comunicacion con el archivos component.ts, que a su vez se comunica con el archivo module.ts, parece que este ultimo importa todos los componentes por los que este formada nuestra aplicaicon.

//En esta variabe almacenare todas las rutas, es una array de objetos
const rutas:Routes=[
//Entre comillas pones la url que usara esta ruta
  {path:'', component:HomeComponentComponent},
  {path:'proyectos', component:ProyectosComponentComponent},
  {path:'quienes', component:QuienesSomosComponentComponent},
  {path:'contacto', component:ContactoComponentComponent, canActivate:[LoginGuardian]},  
  {path: 'actualizar/:id', component:ActualizaComponentComponent},//agregando /id la ruta esta preparada para recibir el id del elemento a actualizar
  {path: 'login', component:LoginComponent},
  {path: '**', component:ErrorPersonalizadoComponent} //Los dos asteriscos indican que cualquier ruta distinta a las anteriores a la que se intente acceder sera enviado a esta ruta
];

@NgModule({
  declarations: [ //Aqui se registran los componentes
    AppComponent, //Componente principal, por defecto
    ComponenteHijoComponent, //Al crear este componente se agrego automaticamente
    CaracteristicasEmpleadoComponent, 
    HomeComponentComponent, 
    ProyectosComponentComponent, 
    QuienesSomosComponentComponent, 
    ContactoComponentComponent, 
    ActualizaComponentComponent, 
    ErrorPersonalizadoComponent, LoginComponent //Componente hijo, yo lo cree
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(rutas), //Aui pongo el Router Module
    HttpClientModule
  ],
  providers: [ //Aqui se registran los servicios
    ServicioEmpleadosService,        
    EmpleadosService, //Aqui registro los servicios que he creado, un servicio son funciones repetitivas que luego los componentes pueden utilizar
    DataServices, LoginService, CookieService, LoginGuardian], //registro el nombre de la clase que cree en data.services.ts, 
    
  bootstrap: [AppComponent]
})
export class AppModule { }
