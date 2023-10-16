import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Empleado } from "./empleado.model";
import { LoginService } from "./login.service";

@Injectable() //Al paracer esto es para poder inyectar un modulo ademas de registrarlo en el constructor

//DataServices es el nombre de la clase
export class DataServices{

    constructor(private clienteHttp:HttpClient, private loginService:LoginService){}; //Este constructor es para inyectar el HttpModule, que nos permitira enviar informacion de nuestra pagina a la base de datos

    //Esta funcion es para hacer una consulta get a la base de datos.
    cargarEmpleados(){
        const token = this.loginService.getIdToken();

        return this.clienteHttp.get('https://proyecto-angular-fc099-default-rtdb.firebaseio.com/datos.json?auth=' + token);
    

    };


    //Le paso por parametro un parametro para que este preparada para recibir un array de tipo empleado, empleados es el nombre identificador
    guardarRegistros(empleados:Empleado[]){
        //uso clienteHttp que me permite enciar datos a la base de datos y mediante el metodo post envio a la base de datos ubicada en el link, importante ponder datos.json al final del link
        this.clienteHttp.put('https://proyecto-angular-fc099-default-rtdb.firebaseio.com/datos.json', empleados).subscribe(//por ultimo le digo que quiero almacenar, que es el array con el nombre identificador empleados. Subscribe es un observable, es necesario para que los datos se almacenen  
    //El metodo post ingresa todos los datos aunque esten repetidos, el metodo put reemplaza los existentes.

            response => console.log("Se guardaron los registros en la base de datos" + response),

            error => console.log("Error" + error)
        );
    };

    actualizarEmpleado(indice:number, empleado:Empleado){
        let url = 'https://proyecto-angular-fc099-default-rtdb.firebaseio.com/datos/' + indice + '.json';

        this.clienteHttp.put(url, empleado).subscribe(//por ultimo le digo que quiero almacenar, que es el array con el nombre identificador empleados. Subscribe es un observable, es necesario para que los datos se almacenen  
        //El metodo post ingresa todos los datos aunque esten repetidos, el metodo put reemplaza los existentes.
    
                response => console.log("Se actualizaron los registros en la base de datos" + response),
    
                error => console.log("Error" + error)
        );
    };

    eliminarEmpleado(indice:number){
        let url = 'https://proyecto-angular-fc099-default-rtdb.firebaseio.com/datos/' + indice + '.json';

        this.clienteHttp.delete(url).subscribe(//por ultimo le digo que quiero almacenar, que es el array con el nombre identificador empleados. Subscribe es un observable, es necesario para que los datos se almacenen  
        //El metodo post ingresa todos los datos aunque esten repetidos, el metodo put reemplaza los existentes.
    
                response => console.log("Se ha eliminado el registros de la base de datos" + response),
    
                error => console.log("Error" + error)
        );
    };
};