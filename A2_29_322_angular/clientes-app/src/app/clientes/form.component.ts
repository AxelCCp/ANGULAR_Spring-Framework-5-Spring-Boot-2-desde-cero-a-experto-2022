import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service'; //6
import { Router,ActivatedRoute } from '@angular/router';//8    //11.2

//CLASE328
//1.-SE ELIMINÓ EL COMPONENTE DE HOJA DE ESTILO DEL @COMPONENT.
//2.-SE CREA EL ATRIBUTO CLIENTE EN ESTA CLASE Y SE IMPORTA CLIENTE.
//3.-SE CREA AL MÉTODO CREATE QUE ES LLAMADO DESDE EL FORMULARIO EN FORM.COMPONENET.HTML. CUANDO SE CREA O EDITA A UN CLIENTE.
//4.-EL PINCHE TITULO DEL FORMULARIO.
//5.-EL CONSTRUCTOR YA ESTABA. AQUÍ LO QUE SE HACE ES IMPLEMENTAR EL CREATE. PARA ESTO SE INYECTA LA CLASE SERVICE POR EL CONSTRUCTOR.
//6.-SE IMPORTA ClienteService.
//7.-SE INVOCA AL MÉTODO CREATE() DEL SERVICE.
  //subscribe() : AQUÍ VA LA RESPUESTA Y UNA ACCIÓN. UNA VEZ QUE SE HAYA CREADO EL OBJ VA A RETORNAR LA RESPUESTA CON EL NUEVO OBJETO CREADO.
                //AQUÍ LA IDEA ES REGIRIGIR AL LISTADO PARA MOSTRAR LOS CAMBIOS.
//8.-PARA REDIRIGIR, SE IMPORTA LA CLASE ROUTER.
//9.-SE INYECTA COMO SEGUNDO PARAMETRO EN EL CONSTRUCTOR UN OBJ DE TIPO ROUTER.
//10.-LA RESPUESTA SE MANDA A LA URL INDICADA.

//CLASE333
//11.-...VIENE DEL CLIENTE SERVICE.
  //11.1.-HAY QUE OBTENER EL ID. SE PREGUNTA SI EXISTE EL ID Y SI EXISTE, HAY Q CARGAR EL OBJ CLIENTE. // SE CREA EL MÉTODO "CARGAR CLIENTE()".
  //11.2.-PARA OBTENER EL ID DEL CLIENTE, HAY QUE ACTIVAR EN EL ANGULAR ROUTER, LA CLASE ACTIVATE ROUTE. Y SE INYECTA EN EL CONSTRUCTOR.
  //11.3.-LUEGO EN CARGARCLIENTE(), SE OBTIENE activatedRoute ,  PARAMS Y SE SUSCRIBE UN OBSERVEDOR Q ESTÉ OBSERVANDO CUANDO SE OBTENGA EL ID.
  //11.4.-RECIBE LOS PARAMETROS COMO ARGUMENTO. SE OBTIENE EL ID EN LA FUNCIÓN ANONIMA A TRAVES DEL ARREGLO. CON EL NOMBRE DEL PARAMETRO.
  //11.5.-SI EL ID EXISTE, SE OBTIENEN LOS DATOS. CON SUBSCRIBE() SE ASIGNAN LOS DATOS OBTENIDOS DE LA CONSULTA AL REST AL ATRIBUTO CLIENTE. LA CLASE QL CLIENTE.TS.
//...después se va al app module ...
  //CLASE333
  //12.-SE LLAMA DESDE EL NG ON INIT AL MÉTODO CARGARCLIENTE() PARA QUE APAREZCAN LOS DATOS DEL CLIENTE QUE SE  QUIERE MOLDIFICAR, EN EL FORMULARIO.
  //CLASE334
  //...SE VA A CLIENTE.SERVICE.TS...
  //...vuelde de CLIENTE.SERVICE.TS...
  //13.-CREA EL MÉTODO UPDATE():
    //this.clienteService.update(this.cliente).subscribe() : SE USA EL MÉTODO DEL SERVICIO, SE LE PASA EL CLIENTE Y SE SUSBRIBE UN OBSERVADOR. EL OBSERVADOR QUEDA ATENTO A LA RESPUESTA, QUE ES EL CLIENTE, Y CON ESTO DESPUÉS SE REDIRIGE A CLIENTES.
//...después se va al form.component.html ... PARA AGREGAR EL BOTÓN DE ACTUALIZAR.
@Component({selector: 'app-form',templateUrl: './form.component.html'})
export class FormComponent implements OnInit {
                               //5                              //9                         //11.3
  constructor(private clienteService: ClienteService, private router: Router, private activatedRoute: ActivatedRoute) { }
  ngOnInit(): void {
      //12
      this.cargarCliente();
  }

  //3
  public create(): void {
    //console.log("Clicked!");
    //console.log(this.cliente);
    //7
    this.clienteService.create(this.cliente).subscribe(
      //10
      response => this.router.navigate(['/clientes'])
    );
  }

  //11.1
  cargarCliente(): void{                 //11.4
    this.activatedRoute.params.subscribe(params => {
      let id = params['id'];
      if(id){                             //11.5
        this.clienteService.getCliente(id).subscribe(cliente => this.cliente = cliente);
      }
    });
  }

  //13
  update():void{
    this.clienteService.update(this.cliente).subscribe(cliente => {
      this.router.navigate(['/clientes']);
    });
  }

  //2
  cliente: Cliente = new Cliente();
  //4
  titulo: string = "Crear cliente";


}
