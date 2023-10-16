import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Empleado } from '../empleado.model';
import { EmpleadosService } from '../empleados.service';

@Component({
  selector: 'app-proyectos-component',
  templateUrl: './proyectos-component.component.html',
  styleUrls: ['./proyectos-component.component.css']
})
export class ProyectosComponentComponent {
  
  constructor(private router:Router, //Declaro el router para poderlo usar abajo
              private dataService:EmpleadosService){

    this.empleados=this.dataService.empleados
  };

  empleados:Empleado[]=[];

  agregarRegistro(){ //Un metodo es una funcion  
    //Creo una variable nueva y dentro creo un nuevo objeto de tipo Empleado
    let miEmpleado = new Empleado(this.inputNombre, this.inputApellido, this.inputPuesto, this.inputSueldo); //Aqui hago lo mismo que al declarar un nuevo Empleado arriba, solo que en lugar de poner los datos, le digo que tome lo que se ingrese en los inputs

    this.dataService.metodoAlerta(miEmpleado);

//miServicio es el nombre que le di al servicio en el constructor de arriba, muestraMensaje es el metodo o funcin que declare dentro del archivo del servicio en el servicio-empleados.service.ts
    //this.miServicio.muestraMensaje("Nombre: " + miEmpleado.nombre + " Apellido: " + miEmpleado.apellido ); //Ya no necesito esta llamada al servicio ya que lo anide en otro

    this.empleados.push(miEmpleado); //Aqui digo que a la variable empleado le voy a agregar al final lo que halla en la variable miEmpleado
    this.router.navigate([""]); //Copio y pego el codigo del boton irHome para que el boton del formulario tambien me lleve al home
  };

  inputNombre:string= ""; //inputNombre viene del banana in box del archivo app.component.html
  inputApellido:string= ""; //Es estas variables capot lo que se ingrese en cada uno de sus input, lo hago gracias al nombre que le doy a al banana in box de cada input
  inputPuesto:string= "";
  inputSueldo:number= 0;

  irHome(){
    this.router.navigate([""]); //El metodo navigate de la clase router me permite ir a una ruta
  };

}
