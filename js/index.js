const buttonFooter =document.getElementById('button-footer');
let salir=document.getElementById('salir');
let boolean=false;

salir.style.display="none";

/**
 * Verifica si existe un nombre de usuario cargado, para mostrar el cartel "Salir" por mas que se refresque la página
 */
function EstaLogueado() {
   
    let usuario=localStorage.getItem('NombreUsuario');
   
     if(usuario!="" && usuario!=null) {
          boolean=true;
         }
       else {
        boolean =false;
     }
     if(boolean){
         cambiar(boolean);
     }
 }


/**
 * asociado al boton de modal de ingreso.
 * permite guardar el nombre del ursuario en el local storage y llama a la funcion 
 * validad login
 * */

buttonFooter.addEventListener('click',function(e) {
    let nombreUsuario = document.getElementById('NombreUsuario').value;
    localStorage.setItem('NombreUsuario', nombreUsuario);
    let InputNombreComentario = document.getElementById('txtNombrecomen');
    InputNombreComentario.value = nombreUsuario;
    
    validarLogin(nombreUsuario);
})


/**
 * funcion que ingresa el nombre de usuario 
 * */

function validarLogin(nombreUsuario) {
   
    let usuario=localStorage.getItem('NombreUsuario');
    
     if(nombreUsuario == usuario && nombreUsuario!="") {
         alert('You are loged in.');
          boolean=true;
         }
       else {
         alert('ERROR.');
        boolean =false;
     }
     if(boolean){
         cambiar(boolean);
     }
     return boolean;
 }
/**
 * funcion que permite ocultar el ingreso, para que pueda salir 
 * */

 function cambiar(boolean){
    let login = document.getElementById('login');
    if(boolean){
        login.style.display='none';
        salir.style.display='block';
    }
 }
/**
 * esta asociado al boton de salir con el evento onclick
 * permite modificar el estado para que salga y luego pueda volver a ingresar con el nombre de usuario
 *  MODIFICACION 24/06 = Setear que NombreUsuario quede vacio cuando se apreta salir 
 * */

 function salirLogin(boolean){
    let login = document.getElementById('login');
    boolean =false;
    if(boolean==false){
    salir.style.display='none';
    login.style.display='block';
   
    localStorage.setItem('NombreUsuario', '');
}
 }


/*-------------------------------------------------------*/

const BotonSuscripcion = document.getElementById('boton-suscribirse');

/**
 * Al hacer click en el boton suscribirse pone en blanco el input y muestra un mensaje
 */
BotonSuscripcion.addEventListener('click', function(){
    debugger
    let Inputemail = document.getElementById('txtemailsusc');

    Inputemail.value = '';

    let outputRegistro = document.getElementById('gracias-registro');

    outputRegistro.value = 'Gracias por su suscripción';
})

/*-----------------Clase----------------------*/
class NuevoComentario
{
  Fecha;
  Nombre;
  Comentario;
  
  Posicion;

  constructor(_fecha,_nombre, _comentario)
  {
    this.Nombre = _nombre;
    this.Comentario = _comentario;
    this.Fecha = _fecha;
  }

  GetDatos = () => {return this.Fecha, this.Nombre, this.Comentario;}
}

var ListadeComentarios = new Array();

const botonPublicar = document.getElementById('btn-publicar');
const LugardeComentarios = document.getElementById('cajaDeComentarios');



/**
 * Al hacer click en el boton llama a la funcion validar para colocar el cometario o no
 */
botonPublicar.addEventListener('click', validarqueestaregistrado);


/**
 * 
 * @returns fecha actual
 */
function TraerFecha(){
    let hoy = new Date().toLocaleDateString();

    return `${hoy}`;
}


/**
 * Valida si existe un usuario registrado y si es así publica el comentario, sino no lo publica.
 */
function validarqueestaregistrado()
{
    let usuario=localStorage.getItem('NombreUsuario');
     if(usuario != '') 
     {
        CreaObjetoComentario();
        GuardarEnPC();
        CargarCajadeComentario();
        ContarComentarios();
    }

    else 
    {
         alert('Debe ingresar con su nombre de usuario');
    }
}

/**
 * Crea el objeto tomando como valor los datos colocados en el input 
 *  
 */
function CreaObjetoComentario()
{
   
    let NombreYComentario = new NuevoComentario(
        TraerFecha(),
        document.getElementById('txtNombrecomen').value,
        document.getElementById('txtComentario').value
    )
        if(ListadeComentarios != null)
        {
            NombreYComentario.Posicion =  ListadeComentarios.length;
        }
        else
        {
            NombreYComentario.Posicion = 0;
        }
        

        ListadeComentarios.push(NombreYComentario);
}

/**
 * Crea los elementos p y h y carga en ellos la fecha, el nombre y el comentario capturados
 */
function CargarCajadeComentario(){
    LugardeComentarios.innerHTML = '';

    if(ListadeComentarios != null)
    {
        ListadeComentarios.forEach(function(datos)
        {
            let FechadePublicacion = document.createElement('p');
            let Cajanombre = document.createElement('h5');
            let Cajacomentario = document.createElement('p');
            let Separador = document.createElement('hr');

            FechadePublicacion.innerHTML =  `${datos.Fecha}`;
            Cajanombre.innerHTML = `${datos.Nombre}`;
            Cajacomentario.innerHTML = `${datos.Comentario}`;
    /*---------------------------------------------------------------*/
            let btnBorrar = document.createElement('button');
            btnBorrar.innerHTML = 'Borrar comentario';
            btnBorrar.setAttribute('data-indice', datos.Posicion);
            btnBorrar.addEventListener('click', BorrarRegistro);
        

            LugardeComentarios.append(FechadePublicacion);
            LugardeComentarios.append(Cajanombre);
            LugardeComentarios.append(Cajacomentario);
            LugardeComentarios.append(btnBorrar);
            LugardeComentarios.append(Separador);

        })
    }
    
 
}

function BorrarRegistro(e){
    e.preventDefault();
    let index = e.currentTarget.getAttribute('data-indice');
    ListadeComentarios.splice(parseInt(index), 1);

    ListadeComentarios.forEach(function(Ctd, ind, arr){
        Ctd.Posicion = ind;
    });

    GuardarEnPC();
    CargarCajadeComentario();
    ContarComentarios()
}


/**
 * Almacena el array ListadeComentarios en la pc
 */
function GuardarEnPC(lista)
{

    if(!window.localStorage.key('wListadeComentarios'))
    {
        window.localStorage.setItem('wListadeComentarios', JSON.stringify(ListadeComentarios));
        
    }
    else
    {
        window.localStorage.setItem('wListadeComentarios', JSON.stringify(ListadeComentarios));
    }
}

function MostrarenPC()
{
    if(window.localStorage.getItem('wListadeComentarios') == null){
        window.localStorage.setItem('wListadeComentarios', JSON.stringify(ListadeComentarios));
    }
    if(window.localStorage.key('wListadeComentarios'))
    {
        ListadeComentarios = JSON.parse(window.localStorage.getItem('wListadeComentarios'));
    }

}


let contadordecomentarios=0;
let outputcantidad = document.getElementById('cantidadComentarios');
/**
 * Cuenta los comentarios y muestra la cantidad
 */
function ContarComentarios()
{
  
    contadordecomentarios=0
    if(ListadeComentarios != null)
    {
        ListadeComentarios.forEach(function(coment){
            contadordecomentarios++;
        })
    }
    

    outputcantidad.innerHTML=contadordecomentarios;
}


outputcantidad.innerHTML = ContarComentarios();

MostrarenPC();
CargarCajadeComentario();
ContarComentarios();
EstaLogueado();
