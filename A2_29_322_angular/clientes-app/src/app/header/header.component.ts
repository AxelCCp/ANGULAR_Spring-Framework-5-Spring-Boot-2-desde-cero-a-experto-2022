//SE LE PONE EL EXPORT PARA QUE SE PUEDA REGISTRAR EN LA CONFIGURACIÓN DEL MÓDULO. EN APP MODULE. EL CONTENEDOR DE ANGULAR.
//CUANDO ES UNA CLASE COMPONENTE SE PONE POR CONVESIÓN LA PALABRA COMPONENT CON CAMELCASE

import { Component } from '@angular/core';

@Component({selector: 'app-header',templateUrl: './header.component.html'})
export class HeaderComponent{
  title : string  = 'AppAngular'
}
