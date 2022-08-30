import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DirectivaComponent } from './directiva/directiva.component';
import { ClientesComponent } from './clientes/clientes.component';
import { ClienteService } from './clientes/cliente.service';  //
import { RouterModule, Routes } from '@angular/router';  //3
import { HttpClientModule } from '@angular/common/http'; //6
import { FormComponent } from './clientes/form.component';
import { FormsModule } from '@angular/forms'; //7

//CLASE307
//SE IMPORTA LA CLASE CLIENTE.SERVICE.TS Y SE AGREGA EN PROVIDERS.
//CLASE309
//SE IMPORTA ROUTER MODULES PARA USAR RUTAS
//3 Y 4 : SE DEFINE UNA CONSTANTE CON UN ARREGLO CON LAS RUTAS. SE PONE EL NOMBRE DE LA RUTA  Y DESPUÉS EL COMPONENTE AL QUE ESTA RELACIONADA.
//5.- SE REGISTRAN LAS RUTAS EN IMPORTS.

//CLASE322
//6.-CONFIGURACION CORS .. CONEXIÓN CON SPRING

//CLASE328
//FORM COMPONENT SE IMPORTA SOLO AL CREAR EL COMPONENTE FORM
//7.- SE IMPORTA FORM MODULES PARA PODER TRABAJAR CON FORMULARIOS.

//CLASE329
//8.-SE CONFIGURA RUTA PARA CREAR UNA NUEVA ENTRADA. RUTA DE CLIENTES/FORM.

//CLASE333
//...viene de form component....
//9.-SE CREA LA RUTA PARA EDITAR CON EL PARÁMENTRO ID
//...se va ahora al CLIENTES COMPONENT al listar...

//4
const routes: Routes =[
  {path: '', redirectTo: '/clientes', pathMatch: 'full'},
  {path: 'directivas', component: DirectivaComponent},
  {path: 'clientes', component: ClientesComponent},
  {path: 'clientes/form', component: FormComponent}, //8
  {path: 'clientes/form/:id', component: FormComponent} //9
];


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DirectivaComponent,
    ClientesComponent,
    FormComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [ClienteService],  //
  bootstrap: [AppComponent]
})
export class AppModule { }
