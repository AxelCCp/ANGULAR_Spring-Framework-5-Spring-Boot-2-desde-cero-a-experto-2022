import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';

//1.-SE HACE INYECCIÓN DE DEPENDENCIA A TRAVÉS DEL CONSTRUCTOR
//2.-SE SUSCRIBE EL OBSERVABLE getClientes PARA QUE SEA OBSERVADO. DENTRO DEL MÉTODO SUBSCRIBE, SE ASIGNA EN EL ATRIBUTO CLIENTES EL VALOR QUE SE ESTÁ RECIBIENDO DESDE EL CLIENTE SERVICE.
//3.-subscribe(); : DENTRO DEL MÉTODO SUBSCRIBE, HAY UNA FUNCTION ANONIMA QUE RECIBE LOS CLIENTES QUE VIENEN COMO RESULTADO DEL STREAM, Y SE ASIGNA A clientes EL VALOR QUE SE ESTÁ RECIBIENDO DESDE EL CLIENTE SERVICE. O SEA EL LISTADO DE CLIENTES CON LOS CAMBIOS.
  //  function(clientes) {this.clientes = clientes  }); = clientes : ESTE ES EL OBSERVADOR.
//CLASE335
//...VIENE DESDE CLIENTE.SERVICE.TS...
//4.-SE IMPLEMENTA EL MÉTODO DELETE().
  //filter() : PERMITE FILTRAR SOLO LOS ELEMENTOS QUE DESEAMOS SEGÚN CIERTOS CRITERIOS Y DEVOLVERLOS EN UN NUEVO ARRAY.
  //this.clientes = this.clientes.filter(cli => cli != cliente) : "clientes" SON TODOS LOS CLIENTES Y SE PASAN POR PARAMETRO A LA FUNCIÓN CALLBACK Y VA A DEVOLVER SOLO LOS CLIENTES QUE SEAN DIFERENTES AL CLIENTE QUE SE ELIMINÓ.
//...se va a clientes.component.html...

@Component({selector: 'app-clientes',templateUrl: './clientes.component.html'})
export class ClientesComponent implements OnInit {



  //1
  constructor(clienteService: ClienteService) {
    this.clienteService = clienteService;
  }

  //ESTE EVENTO SE PRODUCE CUANDO SE INICIA EL COMPONENTE
  ngOnInit(){
    //2                                    //3
    this.clienteService.getClientes().subscribe(

      //ABREVIACIÓN //SE ASIGNA EN EL ATRIBUTO clientes,  LA INFORMACIÓN QUE SE RECIBE DESDE ClienteService
      clientes => this.clientes = clientes
    );
      /*
      function(clientes) {
        this.clientes = clientes
      });*/
  }

  //4
  delete(cliente:Cliente):void{
    this.clienteService.delete(cliente.id).subscribe(
      response => {
        this.clientes = this.clientes.filter(cli => cli != cliente);
      }
    );
  }

  clientes: Cliente[];
  private clienteService: ClienteService;

}
