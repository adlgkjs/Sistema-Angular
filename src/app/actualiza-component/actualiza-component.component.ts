import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Empleado } from '../empleado.model';
import { EmpleadosService } from '../empleados.service';

@Component({
  selector: 'app-actualiza-component',
  templateUrl: './actualiza-component.component.html',
  styleUrls: ['./actualiza-component.component.css']
})
export class ActualizaComponentComponent {

  constructor(private router:Router, //Declaro el router para poderlo usar abajo
              private dataService:EmpleadosService,
              private ruta:ActivatedRoute){ //Activo este servicio de Angular para poder enviar informacion a traves de las rutas
  };

  empleados:Empleado[] = [];
  accion:String; //Creo una variable de tipo string que es donde voy a almacenar el parametro que envie por url: actualizar o eliminar

  ngOnInit(): void{
    //snapshot me permite captar informacion que envio por la url, queryParams me permite captar el dato que envie por quiery params en actualiza-component.component.html
    this.accion = this.ruta.snapshot.queryParams['accionQueryParams']

    this.empleados = this.dataService.empleados; //dataService es donde esta la base de datos de los empleados
    
    //ruta es nombre que le di al servicio de ActivatedRoure en el constructor de arriba, snapshot y params nos sierven para poder captar el id del elemento, id es el nombre que le di a la ruta en app.module.ts
    this.indice = this.ruta.snapshot.params['id'];
    
    //Empleado es la clase que declare en empleado.model.ts y que puedo usar gracias a que lo importe arriba
    // encontrarEmpleado es una fincion o metodo que me ayudara a encontrar a los empleados por su indice que esta declarada en empleados.service.ts
    let empleado:Empleado = this.dataService.encontrarEmpleado(this.indice); //this.indice es la variable que actualice arriba
  
    //Una vez que ya tengo el empleado obtenido mediente su id ahora agrego cada dato a su campo
    this.inputNombre = empleado.nombre; //Con esto cargo en el cuadro del formulario el nombre del empleado
    this.inputApellido = empleado.apellido; //Empleado hace referencia a la variable de arriba
    this.inputPuesto = empleado.cargo;
    this.inputSueldo = empleado.salario;
  };

  actualizarEmpleado(){ //Un metodo es una funcion  
    //Creo una variable nueva y dentro creo un nuevo objeto de tipo Empleado
    let miEmpleado = new Empleado(this.inputNombre, this.inputApellido, this.inputPuesto, this.inputSueldo); //Aqui hago lo mismo que al declarar un nuevo Empleado arriba, solo que en lugar de poner los datos, le digo que tome lo que se ingrese en los inputs

    this.dataService.metodoAlerta(miEmpleado);

    //ataService es el nombre identificativo que le di al servicio donde esta la funcion de actualizar empleado (empleados.service.ts), le paso por parametro el indice junto con los datos del empleado almacenados en la variable
    this.dataService.actualizarEmpleado(this.indice, miEmpleado); //Esto sobreescribira los datos que halla en el mismo indice
    this.router.navigate(['']); //Copio y pego el codigo del boton irHome para que el boton del formulario tambien me lleve al home
  };

  eliminarEmpleado(){ //El boton llama a esta funcion
    this.dataService.funEliminarEmpleado(this.indice); //A su vez llamo a una funcion que esta en el archivo donde esta el listado de empleado (empleados.service.ts) y le paso el indice 
    this.router.navigate(['']); //Esta linea redirige al index, al home
  };

  funToggle(){
    if(this.accion=='actualizar'){
      //Codigo que actualiza
      let miEmpleado = new Empleado(this.inputNombre, this.inputApellido, this.inputPuesto, this.inputSueldo);
      this.dataService.metodoAlerta(miEmpleado);
      this.dataService.actualizarEmpleado(this.indice, miEmpleado);    
      this.router.navigate(['']);
    }else{
      //Codigo que elimina
      this.dataService.funEliminarEmpleado(this.indice);
      this.router.navigate(['']);    
    }
  };

  inputNombre:string= ""; //inputNombre viene del banana in box del archivo app.component.html
  inputApellido:string= ""; //Es estas variables capot lo que se ingrese en cada uno de sus input, lo hago gracias al nombre que le doy a al banana in box de cada input
  inputPuesto:string= "";
  inputSueldo:number= 0;
  indice:number; //Declaro esta variable para guardar los indices de los empleados

  irHome(){
    this.router.navigate([""]); //El metodo navigate de la clase router me permite ir a una ruta
  };


}
