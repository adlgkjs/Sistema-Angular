import { Component, Input } from '@angular/core';
import { Empleado } from '../empleado.model';


@Component({
  selector: 'app-componente-hijo',
  templateUrl: './componente-hijo.component.html',
  styleUrls: ['./componente-hijo.component.css']
})
export class ComponenteHijoComponent {

  //De esta forma comparto informacion del componente padre al hijo, empleadoIterado es el nombre identificativo que se dio a la variable empleado en el html del componente padre
  @Input() empleadoIterado:Empleado; //Empleado es la clase se cree en el archivo empleado.model.ts
  @Input() indice:number;

  caracteristicas = ['']; //esto es un array vacio

  agregarCaracteristica(nuevaCaracteristica:string){ //Hago una funcion y le paso por parametro une nueva caracteristica
    this.caracteristicas.push(nuevaCaracteristica); //Agregara al array caracteristicas esa nueva caracteristica
  };

}






















