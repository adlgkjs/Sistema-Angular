//Una clase o modelo se usa para construir objetos, es como una plantilla que no contiene la estructura
export class Empleado{
    
    //El constructor se encarga de crear los objetos
    constructor(nombre:string, apellido:string, cargo:string, salario:number){ //El constructor se encarga de crear los objetos
        this.nombre = nombre; //la variable nombre sera igual a lo que le pasemos por parametro en nombre en el archivo app.components.ts en los argumentos de la llamada, aqui establezco los campos y en el otro archivo declaro los valores
        this.apellido = apellido; //apellido hace referencia al parametro del contructor apellido, los valores de estos parametros se le pasaran en el archivo app.components.ts
        this.cargo = cargo;
        this.salario = salario;
    } 
    
    //Estas son las propiedades del objeto, de declara el nombre, de que tipo y su valor
    nombre:string="";
    apellido:string="";
    cargo:string="";
    salario:number=0;
};