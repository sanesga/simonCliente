////////////////////////////////////////////////////////
//elementos
var nivelElement = document.getElementById("nivel"); //span del nivel
var boton = document.getElementById("boton");
var rojo = document.getElementById("rojo");
var verde = document.getElementById("verde");
var amarillo = document.getElementById("amarillo");
var azul = document.getElementById("azul");
var mensajes = document.getElementById("mensajes");
var errores = document.getElementById("errores");

//variables
var nivel = 0;
var colorActual = new String();
var colores = ["rojo", "amarillo", "verde", "azul"];
var patron = new Array();
var contador =0;
var posicion = new Number();
let i = new Number();
var total=0;

//listeners
boton.addEventListener("click", juegaMaquina); //al hacer click sobre el botón iniciamos el juego
rojo.addEventListener("click", juegaUsuario);
azul.addEventListener("click", juegaUsuario);
verde.addEventListener("click", juegaUsuario);
amarillo.addEventListener("click", juegaUsuario);
/////////////////////////////////////////////////////////




//************************************MÁQUINA**************************************

function juegaMaquina() {
mensajes.innerHTML="Turno de la máquina";  //mientras juega la máquina, deshabilitamos todos los clicks de los colores
  rojo.style.pointerEvents = "none";
  azul.style.pointerEvents = "none";
  amarillo.style.pointerEvents = "none";
  verde.style.pointerEvents = "none";

  deshabilitarBotonStart();
  nivelElement.innerHTML = nivel;

  generarNumeroAleatorio();
  patron.push(colores[posicion]);
  console.log("patron " + patron);

  for (i = 0; i < patron.length; i++) {
    (function(i) {
      setTimeout(function() {
        colorear(patron[i]);
        console.log("esperamos 1500 ms");
      }, 1500 * (i + 1));
    })(i);
  }
  //if (i == patron.length) {
    //console.log(i);
    console.log(patron.length);
    setTimeout(function() {
      mensajes.innerHTML = "Tu turno";
      rojo.style.pointerEvents = "auto";
      azul.style.pointerEvents = "auto";
      amarillo.style.pointerEvents = "auto";
      verde.style.pointerEvents = "auto";
    }, 2200 * patron.length);
  //}
}

//*************************************JUGADOR**************************************

function juegaUsuario() {
//console.log("usuario " + this.id);
// console.log("maquina " + patron[contador]);
// console.log("length de patron " + patron.length);

  borrarMensajes();
  if (this.id == patron[contador]) {
    colorear(this.id);
    contador++;
    if(contador==patron.length){
      subirNivel();
      mensajes.innerHTML="Patrón correcto. Subimos al nivel " + nivel;
      contador=0;
      juegaMaquina();
    }
  } else {
    errores.innerHTML = "Color erróneo. Has perdido.";
    finJuego();
  }

}
function finJuego() {
  setTimeout(function(){
    habilitarbBotonStart();
    borrarMensajes();
    patron=[];
    nivel=0;
    contador=0;
  },2000);
}
function deshabilitarBotonStart() {
  boton.style.display = "none";
}
function habilitarbBotonStart() {
  boton.style.display = "inline-block";
}
function subirNivel() {
  nivel++;
}
function generarNumeroAleatorio() {
  posicion = Math.floor(Math.random() * 3);
}
function borrarMensajes(){
  mensajes.innerHTML="";
}
function colorear(elemento) {
  switch (elemento) {
    case "rojo":
      //console.log("colorear rojo");
      rojo.style.backgroundColor = "#FF5900";
      setTimeout(function() {
        console.log("esperamos 700 ms");
        rojo.style.backgroundColor = "#B24207";
      }, 700);
      break;
    case "azul":
      //console.log("colorear azul");
      azul.style.backgroundColor = "#6FDEFF";
      setTimeout(function() {
        console.log("esperamos 700 ms");

        azul.style.backgroundColor = "#0D589F";
      }, 700);
      break;
    case "verde":
      //console.log("colorear verde");
      verde.style.backgroundColor = "#7DFF28";
      setTimeout(function() {
        console.log("esperamos 700 ms");

        verde.style.backgroundColor = "#208709";
      }, 700);
      break;
    case "amarillo":
      //console.log("colorear amarillo");
      amarillo.style.backgroundColor = "#FFF520";
      setTimeout(function() {
        console.log("esperamos 700 ms");

        amarillo.style.backgroundColor = "#B5A509";
      }, 700);
      break;
  }
}
