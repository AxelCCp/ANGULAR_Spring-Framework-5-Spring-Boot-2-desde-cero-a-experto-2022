import { Injectable } from '@angular/core';
import { CLIENTES } from './clientes.json';  //
import { Cliente } from './cliente';  //
import { Observable } from 'rxjs'; //3
import { of } from 'rxjs'; //5
import { HttpClient } from '@angular/common/http'; //6
import { HttpHeaders } from '@angular/common/http';  //7.1
import { catchError } from 'rxjs/operators'; //11
import { throwError } from 'rxjs'; //14
import { Router } from '@angular/router';
import { map,tap } from 'rxjs/operators';
import { formatDate} from '@angular/common';//22

//1.-INDICA QUE TIPO DE CLASE Y ROL TIENE EN ANGULAR. INJECTABLE ES PARA CLASES DE SERVICIO Y SE PUEDEN INYECTAR A OTROS COMPONENTES.
//2.-ESTE MÉTODO DEVUELVE EL LISTADO DE CLIENTES QUE ESTÁ EN LA CONSTANTE

//CLASE 308 ...
//SE MODIFICA EL getClientes YA QUE HAY QUE USAR PROGRAMACIÓN REACTIVA PARA QUE EL MÉTODO SEA ASINCRONO. ESTO, PARA QUE NO SE BLOQUEE EL LADO DEL CLIENTE MIENTRAS SE HACE LA PETICIÓN AL BACKEND
//3.-SE IMPORTA OBSERVABLE
//4.-MODIFICACION DEL MÉTODO
//5.-SE IMPORTA MÉTODO OF DEL API REACTIVE EXTENTION.
//5.1.-EL OF SE USA PARA CONVERTIR EL LISTADO DE CLIENTES EN UN OBSERVABLE. UN FLUJO DE DATOS. ESTA WEA SE HACE PARA QUE ESTEN COMUNICADOS TODO EL TIEMPO EL FRONT Y EL BACK. DE ESTA FORMA, SI EN EL BACK HAY ALGÚN CAMBIO, ESTE SE REFLEJARÁ INSTANTANEAMENTE EN EL FRONT.

//CLASE322
//SE MODIFICA PARA QUE LA CLASE NO OBTENGA LA LISTA DE CLIENTES DE MANERA ESTÁTICA, SINO QUE QUE OBTENGA DE FORMA REMOTA DESDE EL SERVIDOR.
//6.- SE IMPORTA EL OBJ HTTP.
//6.1.-SE INYECTA EL OBJ HTTP VIA CONSTRUCTOR. AL INYECTAR EN EL CONSTRUCTOR, HTTP QUEDA DEFINIDA COMO UNA VARIABLE DE LA CLASE.
//6.2.-SE COMENTA. Y SE PONE LA URL UrlEndpoint. EN ESTA LÍNEA HAY QUE HACER UN CAST A  <Cliente[]>.  YA QUE "this.http.get(this.UrlEndpoint)" DEVUELVE UN TIPO GENERICO "ANY".


//CLASE330
//7.-MÉTODO CREATE ... RECIBE UN OBJETO cliente DEL TIPO Cliente. Y QUE RETORNA UN TIPO OBSERVABLE DE Cliente. QUE ES EL OBJ QUE SE CREÓ EN EL API REST. YA QUE EL API REST RETORNA EL OBJ CREADO.
//7.1.-SE USA EL COMPONENTE HTTP, SE USA EL VERBO POST, YA QUE ES PARA CREAR UN NUEVO REGISTRO.
    //EN EL POST() : (SE PASA LA URL, EL OBJ CLIENTE QUE SE PASA AL SERVIDOR, Y LAS CABECERAS HTTP QUE SE PASAN DENTRO DE UN OBJ CON EL ATRIBUTO HEADERS)
    //<Cliente[]> :SE LE PONE ESTA WEA PQ EL POST VA A RETORNAR EL NUEVO CLIENTE QUE SE CREO EN EL SERVIDOR.

//CLASE333
//8.-SE CREA EL EDITAR...
    //8.1.-SE CREA EL MÉTODO GETCLIENTE(). ES MUY PARECIDO AL MÉTODO GETCLIENTES()... ES UNA PETICIÓN DEL TIPO GET. SE PASA A URL DEL CONTROLLER CON EL ID.
    //DESPUES SE VA A FORM COMPONENT...

//CLASE334
//..viene de form.component.ts..
//9.-SE CREA EL MÉTODO UPDATE PARA ACTUALIZAR LOS DATOS DEL CLIENTE QUE SE CARGARON EN EL FORMULARIO PARA ACTUALIZARLOS.
  //UPDATE() : RECIBE EL OBJETO CLIENTE QUE VIENE CON LOS DATOS PARA ACTUALIZAR.DEL TIPO OBSERVABLE DE CLIENTE. ES DE ESTE TIPO PQ AL USAR UN PUT CON LA BBDD, VA A RETORNAR UN OBJ CLIENTE.
  //put() : SE PASA LA URL CON EL CLIENTE.ID, PARA Q LO BUSQUE EN LA BBDD; TAMBN SE LE PASA EL OBJ CLIENTE CON LOS DATOS QUE SE ACTUALIZARON EN EL FORMUARIO; Y TAMBN SE PASAN LAS CABECERAS,
  //<Cliente> : SE HACE UN CAST AL TIPO CLIENTE.
//...ahora se va a form.component.ts ...
//CLASE335
//...viene desde el form.component.HTML
//10.-METODO DELETE() : RECIBE UN NUM ID DE TIPO NUMBER Y RETORNA UN OBSERVABLE DE CLIENTE.
  //SE USA EL HTTP DELETE, PARA ENVIAR UNA PETICIÓN AL SERVIDOR, PASANDO EL ID Y Q EN EL BACKEND ELIMINE EL CLIENTE.
//...SE VA A CLIENTE.COMPONENT.TS, PARA IMPLEMENTAR EL DELETE...
//CLASE343(MANEJO DE ERRORES EN FRONT)
//11.-SE IMPORTA EL OPERADOR CATCH ERROR
  //EL catchError LEE EL OBSERVABLE EN BUSCA DE ERRORES Y SI FALLA , SE ONTIENE EL OBJ DE ERROR DE ESTE OPERADOR EN UNA LAMBDA.
//12.-SE USA PIPE() :DENTRO DE ESTE MÉTODO SE PUEDEN TENER TODOS LOS OPERADORES DEL FLUJO.
//13.-SE OBTIENE EL OBJ ERROR POR ARGUMENTO EN LA EXPRESIÓN ANONIMA LAMBDA. EL ERROR SE OBTIENE POR EL RESPONSE ENTITY DEL REST.
//14.-SE IMPORTA PARA CONVERTIR EL ERROR EN UN TIPO OBSERVABLE.
//15.-SE RETORNA EL ERROR EN UN TIPO OBSERVABLE.
//16.-SE IMPORTA ROUTER. SE USARÁ PARA REDIRIGIR AL USUARIO A LA LISTA DE CLIENTES, CUANDO NO ENCUENTRE EN LA BBDD AL CLIENTE Q SE QUIERE EDITAR.
//17.-SE INYECTA EL OBJ ROUTER EN LA CLASE SERVICE POR EL CONSTRUCTOR PARA USARLO.
//18.-CON EL OBJ Router SE CAPTURA EL ERROR Y SE REDIRIGE A CLIENTE.
//CLASE344(MANEJO DE ERRORES)
//viene de  ...form.component.ts...
//CLASE345   ...form.component.ts...
//19.- SE CAMBIA EL TIPO DE <CLIENTE> A <any> PARA Q RECIBA CUALQUIER TIPO DE DATO.
// se va a ...form.component.ts...
//CLASE351
//(SE MANEJAN LOS ERRORES SEGÚN LA RESPUESTA DEL REST)
//20.-SE PREGUNTA SI EL ERROR Q VIENE DEL REST ES UN 400
//SE VA A ...form.component.ts...
//CLASE 355
//21.-SE PASA A MAYUSCULAS LOS DATOS INGRESADOS POR EL USUARIO. SE AÑADE EL METODO PIPE() y TODA LO Q VIENE DESPUES.
//CLASE356 (FORMATEANDO FECHA)
//22.-SE IMPORTA formatDate
//23.-SE FORMATEA LA FECHA.
//CLASE359
//METODO TAP() : CON ESTE METODO SE PUEDE HACER OTRA WEA APARTE CUANDO SE RECIBEN LOS DATOS. SE PARECE AL MAP(); SE USA DENTRO DEL PIPE().
//24.-SE RECORREN LOS DATOS PARA MOSTRARLOS EN EL LOG. SE INDICA Q EL RESPONSE ES DEL TIPO CLIENTE[].

//1
@Injectable()
export class ClienteService {
  //6.1                                 //17
  constructor(private http: HttpClient, private router: Router) { }
  //2 //4
  getClientes(): Observable <Cliente[]>{
    //5.1
    //return of(CLIENTES);     //6.2                  //21..
    return this.http.get<Cliente[]>(this.UrlEndpoint).pipe(
      //24..
      tap(response => {
          let clientes = response as Cliente[];
          clientes.forEach(cliente => {
            console.log(cliente.nombre);
          })
      }),//..24
      map(response => {
        let clientes = response as Cliente[];
        return clientes.map(cliente => {
          cliente.nombre = cliente.nombre.toUpperCase();
          //23
          cliente.createAt = formatDate(cliente.createAt, 'EEEE dd-MM-yyyy','en-US');  //'en-US' :ESTO ES UN LOCALE ESTANDAR.
          return cliente;
        });
      })
    );//..21
  }

  //7                                     //19
  create(cliente: Cliente) : Observable <any> {
    //7.1
    return this.http.post<any>(this.UrlEndpoint, cliente, {headers: this.httpHeaders}).pipe(
      catchError(e =>{

        //20
        if(e.status==400){
          return throwError(e);
        }

        console.error(e.error.mensaje);
        alert('ERROR al crear, '+ e.error.mensaje + ' *** ' + e.error.error);
        return throwError(e);
      })
    );
  }

  //8.1
  getCliente(id):Observable<Cliente> {                           //12
      return this.http.get<Cliente>(`${this.UrlEndpoint}/${id}`).pipe(
                    //13
        catchError(e =>{
          this.router.navigate(['/clientes']);
          console.error(e.error.mensaje);
          alert('ERROR al obtener, ' + e.error.mensaje + ' *** ' + e.error.error);
          return throwError(e);
        })
      );
  }

  update(cliente:Cliente):Observable<Cliente>{
    return this.http.put<Cliente>(`${this.UrlEndpoint}/${cliente.id}`, cliente, {headers:this.httpHeaders}).pipe(
      catchError(e =>{

        //20
        if(e.status==400){
          return throwError(e);
        }
        console.error(e.error.mensaje);
        alert('ERROR al editar,'+e.error.mensaje + ' *** ' + e.error.error);
        return throwError(e);
      })
    );
  }
  //10
  delete(id:number):Observable<Cliente>{
    return this.http.delete<Cliente>(`${this.UrlEndpoint}/${id}`,{headers:this.httpHeaders}).pipe(
      catchError(e =>{
        console.error(e.error.mensaje);
        alert('ERROR al eliminar, ' + e.error.mensaje + ' *** ' + e.error.error);
        return throwError(e);
      })
    );
  }

  private UrlEndpoint: string = 'http://localhost:8080/api/clientes'
  //7.1  POR CONSTRUCTOR SE PASA EL CONTENT-TYPE
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
}
