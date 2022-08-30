import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';

//1.-SE HACE INYECCIÓN DE DEPENDENCIA A TRAVÉS DEL CONSTRUCTOR
//2.-SE SUSCRIBE EL OBSERVABLE getClientes PARA QUE SEA OBSERVADO. DENTRO DEL MÉTODO SUBSCRIBE, SE ASIGNA EN EL ATRIBUTO CLIENTES EL VALOR QUE SE ESTÁ RECIBIENDO DESDE EL CLIENTE SERVICE.
//3.-subscribe(); : DENTRO DEL MÉTODO SUBSCRIBE, HAY UNA FUNCTION ANONIMA QUE RECIBE LOS CLIENTES QUE VIENEN COMO RESULTADO DEL STREAM, Y SE ASIGNA A clientes EL VALOR QUE SE ESTÁ RECIBIENDO DESDE EL CLIENTE SERVICE. O SEA EL LISTADO DE CLIENTES CON LOS CAMBIOS.
  //  function(clientes) {this.clientes = clientes  }); = clientes : ESTE ES EL OBSERVADOR.


@Component({selector: 'app-clientes',templateUrl: './clientes.component.html'})
export class ClientesComponent implements OnInit {



  //1
  constructor(clienteService: ClienteService) {
    this.clienteService = clienteService;
  }


  ngOnInit(){
    //2                                    //3
    this.clienteService.getClientes().subscribe(

      //ABREVIACIÓN
      clientes => this.clientes = clientes
    );
      /*
      function(clientes) {
        this.clientes = clientes
      });*/
  }


  clientes: Cliente[];
  private clienteService: ClienteService;

}
