import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ServicioEmpleadosService {

  constructor() { }

  muestraMensaje(mensaje:string){ //Esto es un metodo, tambien llamado funcion
    alert(mensaje);
  };
};
