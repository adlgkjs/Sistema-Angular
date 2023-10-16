import { Component, EventEmitter, Output } from '@angular/core';
import { ServicioEmpleadosService } from '../servicio-empleados.service';
import { EmpleadosService } from '../empleados.service';

@Component({
  selector: 'app-caracteristicas-empleado',
  templateUrl: './caracteristicas-empleado.component.html',
  styleUrls: ['./caracteristicas-empleado.component.css']
})
export class CaracteristicasEmpleadoComponent {

constructor(private miServicio:ServicioEmpleadosService, //Creo el constructor para poder inyectar o llamar al servicio
            private dataService:EmpleadosService){};

  //EventEmitter se tienen que importar en los imports de la primera linea de este archivo
  @Output() caracteristicasEmpleados = new EventEmitter<string>(); //La documentacion da esta linea de codigo para la comunicacion de un componente hijo a uno padre 

  //Esta funcion se encargara de lanzar la informacion hacia fuera del componente, funcion dada por la documentacion
  agregarCaracteristica(value:string){ //Esta funcion se ejecuta condo pulso el boton de "Añadir caracteristica"

//miServicio es el nombre que uso en el constructor de arriba, muestraMensaje es el nombre del metodo (funcion) que le di en el archivo servicio-empleados.ts y el value es el valor que capta la funcion agregarCaracteritica
   this.miServicio.muestraMensaje(value); //Aqui uso el servicio de la ventana emergente

    
    //uso el nombre que le puse a mi output
    this.caracteristicasEmpleados.emit(value);
  };

};





















