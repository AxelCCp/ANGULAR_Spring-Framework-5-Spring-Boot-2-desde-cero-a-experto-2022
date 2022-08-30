import { Component } from '@angular/core';


//CLASE 295 :

//1.- @Component : SE PARECE AL DE SPRING.
//2.- selector : ES UNA ETIQUETA HTML.
//3.- templateUrl : ES LA VISTA. EL CONTENIDO HTML ASOCIADO A ESTA CLASE COMPONENT.
//4.- styleUrls : NUESTRAS HOJAS DE ESTILO.


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'BIENVENIDO A ANGULAR';
  curso: string = 'CURSO SPRING 5 CON ANGULAR 7';
  profesor: string = 'ANDRES GUZMAN';
}
