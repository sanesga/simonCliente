////////////////////////////////////////////////////////
//elementos
var nivelElement = document.getElementById("nivel"); //span del nivel
var boton = document.getElementById("boton");
var rojo = document.getElementById("rojo");
var verde = document.getElementById("verde");
var amarillo = document.getElementById("amarillo");
var azul = document.getElementById("azul");
var mensajes = document.getElementById("mensajes");

//variables
var nivel = 0;
var colorActual = new String();
var colores = ["rojo", "amarillo", "verde", "azul"];
var patron = new Array();
var contador = -1;
var posicion = new Number();
let i = new Number();

//listeners
boton.addEventListener("click", juegaMaquina); //al hacer click sobre el botón iniciamos el juego
rojo.addEventListener("click", juegaUsuario);
azul.addEventListener("click", juegaUsuario);
verde.addEventListener("click", juegaUsuario);
amarillo.addEventListener("click", juegaUsuario);
/////////////////////////////////////////////////////////

//------------------------MÁQUINA-----------------------

function juegaMaquina() {
  //mientras juega la máquina, deshabilitamos todos los clicks de los colores
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
      }, 1500 * (i + 1));
    })(i);
  }
  if (i == patron.length) {
    console.log(i);
    console.log(patron.length);
    setTimeout(function() {
      mensajes.innerHTML = "Tu turno";
      rojo.style.pointerEvents = "auto";
      azul.style.pointerEvents = "auto";
      amarillo.style.pointerEvents = "auto";
      verde.style.pointerEvents = "auto";
    }, 3000 * patron.length);
  }
}

//-------------------------JUGADOR-----------------------

function juegaUsuario() {

  mensajes.innerHTML="";
  if (this.id == patron[contador]) {
    console.log("usuario " + this.id);
    console.log("maquina " + patron[contador]);
    colorear(this.id);
    contador++;
    if(contador==patron.length){
      juegaMaquina();
      contador=-1;    
    }
  } else {
    finJuego();
  }

}
function finJuego() {
  mensajes.innerHTML = "Color erróneo. Has perdido.";
  habilitarbBotonStart();
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
function colorear(elemento) {
  switch (elemento) {
    case "rojo":
      console.log("rojo");
      rojo.style.backgroundColor = "#FF5900";
      setTimeout(function() {
        rojo.style.backgroundColor = "#B24207";
      }, 700);
      break;
    case "azul":
      console.log("azul");
      azul.style.backgroundColor = "#6FDEFF";
      setTimeout(function() {
        azul.style.backgroundColor = "#0D589F";
      }, 700);
      break;
    case "verde":
      console.log("verde");
      verde.style.backgroundColor = "#7DFF28";
      setTimeout(function() {
        verde.style.backgroundColor = "#208709";
      }, 700);
      break;
    case "amarillo":
      console.log("amarillo");
      amarillo.style.backgroundColor = "#FFF520";
      setTimeout(function() {
        amarillo.style.backgroundColor = "#B5A509";
      }, 700);
      break;
  }
}
