import { Injectable } from "@angular/core";
import { Empleado } from "./empleado.model"; //importo la clase empleado que cree en el empleado.model.ts 
import { ServicioEmpleadosService } from "./servicio-empleados.service"; //Importo este servicio para poder usar su funcionalidad en este archivo
import { DataServices } from "./data.services";

//@Injectable se usa para inyectar un servicio en otro servicio
@Injectable() //Con esto puedo inyectar el servicio de las ventanas emergentes en este servicio

export class EmpleadosService{ //creo una clase, le pongo nombre y la exporto para poderla usar en otros archivos
//aqui llamo al ServicioEmpleadosService
constructor(private servicioAlerta:ServicioEmpleadosService, private dataService:DataServices){
};

    setEmpleados(misEmpleados:Empleado[]){
        this.empleados = misEmpleados
    };


    //Esta funcion devuelve un observable, nos permite hacer operaciones asincranas y actualizar en segundo plano la BD sin tener que hacer consultas repetitivas
    //Observable es un objeto que se queda vigilante de cualquier modificacion de la BD y de manera asincrona actualiza la inforamcion en nuestra aplicacion.
    //Poder utilizar el observable es necesario suscribirnos a el.
    obtenerEmpleados(){
        return this.dataService.cargarEmpleados();
    };

    empleados:Empleado[]=[];

    // //Aqui va la consulta a la base de datos pero por temas didacticos se pondran directamente los datos
    // empleados:Empleado[]=[ //Utilizo la clase Empleado que cree en el archivo empleado.model.ts, uso braquets por que es un array
    //     new Empleado("Julio", "Salazar", "Programador", 12000), //Asi creo un nuevo elemento del array, en el archivo empleado.model.ts ya declare los campos y los valores, aqui solo declaro los valores
    //     new Empleado("Francisco", "Lopez", "Produccion", 10000),
    //     new Empleado("Veronica", "Castro", "Almacen", 14000), 
    // ]; 

    metodoAlerta(empleado:Empleado){ //le paso estos parametros para poderlos usar dentro de la funcion
        this.servicioAlerta.muestraMensaje("Nombre: "+ empleado.nombre + ' ' + empleado.apellido + '\n' + // \n hace un salto de linea
                                            "Puesto: " + empleado.cargo + '\n' +
                                            "Sueldo: " + empleado.salario);
    };

    //le paso por parametro indice tipo numero para que este preparado para recibir el indice cuando se llame a esta funcion desde actualiza-componentnt.component.ts
    encontrarEmpleado(indice:number){

        //este empleado:Empleado es distinto a al de actualiza-component.component.ts
        let empleado:Empleado = this.empleados[indice]; //le digo que es igual al array empleados que coincida con el indice que se paso por parametro a la funcion o metodo
    
        return empleado; //retorno lo que se guardo en la variable empleado
    };

    //Agregamos estos dos parametros a la funcion para recibir la informacion que viene de la llamada de actualiza-component.component.ts
    actualizarEmpleado(indice:number, empleado:Empleado){
        let empleadoActualizado = this.empleados[indice]; //Almaceno en la variable empleadoActualizado lo que halla en el array empleados de acuerdo al indice que le pase por parametro
        empleadoActualizado.nombre = empleado.nombre;
        empleadoActualizado.apellido = empleado.apellido;
        empleadoActualizado.cargo = empleado.cargo;
        empleadoActualizado.salario = empleado.salario;

        //Este actualizarEmpleado se refiere a la funcion de data.services.ts
        this.dataService.actualizarEmpleado(indice,empleado);
    };

    funEliminarEmpleado(indice:number){
        //La documentacion nos dice que pongamos primero el nombre del array despues el .splice y entre parentesis el indice donde se empezara a borrar y despues cuantos elementos queremos borrar        
        this.empleados.splice(indice,1);
        //Esto es para eliminar el empleado de la BD.
        this.dataService.eliminarEmpleado(indice);

        if(this.empleados != null){ //Lo pongo dentro de un if para que al haber un solo registro y eliminarlo no valla a arrojar error
            //Esto es para reconstruir la base de datos y actualice los indices
            this.dataService.guardarRegistros(this.empleados);

        }
    };
};