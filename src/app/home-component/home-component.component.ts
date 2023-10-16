import { Component } from '@angular/core';
import { Empleado } from '../empleado.model'; //Importo la clase Empelado que declare en el archivo empleado.model.ts ara poderla usar mas abajo
import { EmpleadosService } from '../empleados.service';
import { DataServices } from '../data.services';

@Component({
  selector: 'app-home-component',
  templateUrl: './home-component.component.html',
  styleUrls: ['./home-component.component.css']
})
export class HomeComponentComponent {
  titulo = 'EmpleadosApp';

  //Encapsulamos el servicio con private
  constructor(private dataServices:DataServices, //ServicioEm... hace referencia al servicio que cree, de esta manera se inyecta el servicio en un componente
              private dataService:EmpleadosService){ //De esta manera inyecto en este componente el servicio donde se encuentran los datos o la conexion a la base de datos
  };

  ngOnInit(): void{
    //this.empleados=this.dataService.empleados //Con esto guardo en el array empleados declarado abajo, lo que hay guardado en el dataService(empleados.service.ts) en su variable empleados. 
    //con susbscrie me quedo vigilante a cualquier actualizacion del observable, misEmpleados es una variable donde almaceno lo que devuelve el observable 
    this.dataService.obtenerEmpleados().subscribe(misEmpleados=>{ //Esto es una funcio anonima
      
      //Muestro en consola lo que halla en la base de datos
      console.log(misEmpleados);

      //Utilizo Object.values para meter el objeto misEmpleados dentro del array empleados, de lo contrario marca error
      this.empleados = Object.values(misEmpleados); //Con esto ya me aparece la informacion de la BD en mi aplicacion

      this.dataService.setEmpleados(this.empleados); //Esto envia el nuevo registro a la funcion setEmpleados en empleados.service.ts
    });
  };

  //Utilizo la clase Empleado que cree en el archivo empleado.model.ts, uso braquets por que es un array
  empleados:Empleado[]=[];  //Dejo el array vacio ya que obtendre los datos del Servicio de Datos

  //Creo la funcion que se ejecutara cuando se de click sobre el boton
  agregarRegistro(){ //Un metodo es una funcion       

    //Creo una variable nueva y dentro creo un nuevo objeto de tipo Empleado
    let miEmpleado = new Empleado(this.inputNombre, this.inputApellido, this.inputPuesto, this.inputSueldo); //Aqui hago lo mismo que al declarar un nuevo Empleado arriba, solo que en lugar de poner los datos, le digo que tome lo que se ingrese en los inputs

    this.dataService.metodoAlerta(miEmpleado);

    //miServicio es el nombre que le di al servicio en el constructor de arriba, muestraMensaje es el metodo o funcin que declare dentro del archivo del servicio en el servicio-empleados.service.ts
    //this.miServicio.muestraMensaje("Nombre: " + miEmpleado.nombre + " Apellido: " + miEmpleado.apellido ); //Ya no necesito esta llamada al servicio ya que lo anide en otro

    this.empleados.push(miEmpleado); //Aqui digo que a la variable empleado le voy a agregar al final lo que halla en la variable miEmpleado
    
    //Esto es para que guarde el ultimo registro en la base de datos
    this.dataServices.guardarRegistros(this.empleados); //guardarResgistros es la funcion que declare en data.services.ts, que es el archivo que hace al conexion a la base de datos.
    
  };

  inputNombre:string= ""; //inputNombre viene del banana in box del archivo app.component.html
  inputApellido:string= ""; //Es estas variables capot lo que se ingrese en cada uno de sus input, lo hago gracias al nombre que le doy a al banana in box de cada input
  inputPuesto:string= "";
  inputSueldo:number= 0;
};