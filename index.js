////////////////////////////////////////////////////////
//elementos
var nivelElement = document.getElementById("nivel");
var start = document.getElementById("start");
var rojo = document.getElementById("rojo");
var verde = document.getElementById("verde");
var amarillo = document.getElementById("amarillo");
var azul = document.getElementById("azul");
var texto = document.getElementById("texto");

//variables
var nivel = 0;
var colores = ["rojo", "amarillo", "verde", "azul"];
var patron = new Array();
var contador = 0;
var posicion = new Number();
let i = new Number();
var primero = false;

//listeners
start.addEventListener("click", juegaMaquina);
rojo.addEventListener("click", juegaUsuario);
azul.addEventListener("click", juegaUsuario);
verde.addEventListener("click", juegaUsuario);
amarillo.addEventListener("click", juegaUsuario);
/////////////////////////////////////////////////////////

//SE HAN REAJUSTADO LOS TIEMPOS DEL JUEGO PARA PODER MOSTRAR CORRECTAMENTE LOS MENSAJES INFORMATIVOS.

//************************************MÁQUINA**************************************

function juegaMaquina() {
  //escribe texto, 1 para mensajes normales, en color negro y 0 para mensajes de error, en color rojo.
  escribirTexto("Turno de la máquina", 1);

  //los jugadores no podrán hacer click mientras la máquina muestre el patrón
  deshabilitarClickJugador();

  deshabilitarBotonStart();

  nivelElement.innerHTML = nivel;

  generarNumeroAleatorio();

  patron.push(colores[posicion]);

  //nos permite ver el patrón en la consola para facilitar el desarrollo.
  console.log("patron " + patron);

  //recorremos el patrón formado
  for (i = 0; i < patron.length; i++) {
    //para que el setTimeout se ejecute como se espera dentro de un bucle, es necesario crear un IIFE (o función autoejecutable),
    //esto son funciones que se ejecutan en cuanto se definen, sin esta función el setTimeOut no puede acceder a cada iteración de i.
    //info --> https://codehandbook.org/understanding-settimeout-inside-for-loop-in-javascript/
    (function(i) {
      //la primera vez, no aplicamos el tiempo entre colores, porque sólo hay uno.
      if (!primero) {
        colorear(patron[i], 700);
        primero = true;
      } else {
        //aplica tiempo entre colores y colorea.
        setTimeout(function() {
          colorear(patron[i], 700);
        }, 1500 * (i + 1));
      }
    })(i);
  }

  setTimeout(function() {
    escribirTexto("Tu turno", 1);
    habilitarClickJugador();
  }, 2350 * patron.length - (2350 * patron.length * 20) / 100);
  //ESTE TIEMPO SE UTILIZA PARA MOSTRAR EL MENSAJE "TU TURNO" Y HABILITAR EL CLICK DE LOS COLORES PARA EL JUGADOR.
  //Tiempo que tarda el setTimeout por cada color (2350 ms) * número de colores (patron.length).
  //A este tiempo, le restamos un 20%, ya que, a cada nivel, el tiempo aumenta, pero al tener varios threads en ejecución
  //(tenemos dos niveles de anidación de threads dentro de un for), algunos tiempos se solapan, es decir, se pierden, de manera que hay que ir
  //restando un porcentaje al tiempo de espera para que se muestre el mensaje y se habilite el click justo cuando
  //todos los hilos de ejecución hayan terminado.
}

//*************************************JUGADOR**************************************

//ENTRA CADA VEZ QUE SE HACE CLICK, SI NO SE HACE CLICK, QUEDA EN ESPERA Y NO HACE NADA.
function juegaUsuario() {
  borrarTexto();

  //si nuestro click es igual al color
  if (this.id == patron[contador]) {

    //coloreamos
    colorear(this.id, 150);

    //pasamos a la siguiente posicion del array
    contador++;

    // cuando hayamos recorrido el array correctamente, pasa a jugar la máquina.
    if (contador == patron.length) {
      
      subirNivel();

      escribirTexto("Patrón correcto. Subimos al nivel " + nivel, 1);

      //reiniciamos el contador del array, para empezar de 0 la próxima vez.
      contador = 0;

      //hacemos una espera para que se pueda leer primero el texto anterior, y luego pase a jugar la máquina.
      setTimeout(function() {
        juegaMaquina();
      }, 2000);
    }
    //si nos equivocamos de color
  } else {
    escribirTexto(
      "Color erróneo. Has perdido. Has llegado hasta el nivel " + nivel + ".",
      0
    );
    finJuego();
  }
}
function finJuego() {
  //hacemos una espera, para que se pueda leer el último mensaje.
  setTimeout(function() {
    borrarTexto();
    habilitarbBotonStart();
    patron = [];
    nivel = 0;
    contador = 0;
  }, 2000);
}
function deshabilitarClickJugador() {
  rojo.style.pointerEvents = "none";
  azul.style.pointerEvents = "none";
  amarillo.style.pointerEvents = "none";
  verde.style.pointerEvents = "none";
}
function habilitarClickJugador() {
  rojo.style.pointerEvents = "auto";
  azul.style.pointerEvents = "auto";
  amarillo.style.pointerEvents = "auto";
  verde.style.pointerEvents = "auto";
}
function deshabilitarBotonStart() {
  start.style.display = "none";
}
function habilitarbBotonStart() {
  start.style.display = "inline-block";
}
function subirNivel() {
  nivel++;
}
function generarNumeroAleatorio() {
  posicion = Math.floor(Math.random() * 4);
}
function borrarTexto() {
  texto.innerHTML = "";
}
function escribirTexto(mensaje, codigo) {
  //es un mensaje normal
  if (codigo == 1) {
    texto.style.color = "#000000";
    texto.innerHTML = mensaje;
    //es un mensaje de error
  } else {
    texto.style.color = "#FF0000";
    texto.innerHTML = mensaje;
  }
}
function colorear(elemento, tiempo) {
  var colorClaro = new String();
  var colorOscuro = new String();

  switch (elemento) {
    case "rojo":
      colorClaro = "#FF0000";
      colorOscuro = "#820404";
      elemento = rojo;
      break;
    case "azul":
      colorClaro = "#00AAFF";
      colorOscuro = "#044575";
      elemento = azul;
      break;
    case "verde":
      colorClaro = "#32FF00";
      colorOscuro = "#3B6F04";
      elemento = verde;
      break;
    case "amarillo":
      colorClaro = "#FFEC00";
      colorOscuro = "#998D06";
      elemento = amarillo;
      break;
  }
  //aclaramos el color
  elemento.style.backgroundColor = colorClaro;
  //agrandamos
  elemento.style.transform = "scale(1.1)";
  //añadimos sombra
  elemento.style.boxShadow = "10px 5px 5px grey";
  //hacemos la espera y reseteamos los estilos.
  setTimeout(function() {
    elemento.style.backgroundColor = colorOscuro;
    elemento.style.transform = "scale(1)";
    elemento.style.boxShadow = "none";
  }, tiempo);
}
