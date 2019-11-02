////////////////////////////////////////////////////////
//elementos
var nivelElement = document.getElementById("nivel"); //span del nivel
var start = document.getElementById("start");
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
var porcentaje=0;
var primero=false;


//listeners
start.addEventListener("click", juegaMaquina); //al hacer click sobre el botón iniciamos el juego
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
      if(!primero){
        colorear(patron[i]);
        primero=true;
      }else{
        setTimeout(function() {
          colorear(patron[i]);
          console.log("esperamos 1500 ms");
        }, 1500 * (i + 1));
      }
    })(i);
  }
 
    console.log(patron.length);

   
    setTimeout(function() {
      mensajes.innerHTML = "Tu turno";
      rojo.style.pointerEvents = "auto";
      azul.style.pointerEvents = "auto";
      amarillo.style.pointerEvents = "auto";
      verde.style.pointerEvents = "auto";
    }, (2350 * patron.length)-(((2350*patron.length)*20)/100));

}

//*************************************JUGADOR**************************************

function juegaUsuario() {

  borrarMensajes();
  if (this.id == patron[contador]) {
    click(this.id);
    contador++;
    if(contador==patron.length){
      subirNivel();
     // setTimeout(function(){
       // mensajes.innerHTML="Patrón correcto. Subimos al nivel " + nivel;
     // }, 2000);
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
    borrarErrores();
    patron=[];
    nivel=0;
    contador=0;
  },2000);
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
  posicion = Math.floor(Math.random() * 3);
}
function borrarMensajes(){
  mensajes.innerHTML="";
}
function borrarErrores(){
  errores.innerHTML="";
}

function colorear(elemento) {
  switch (elemento) {
    case "rojo":
      //console.log("colorear rojo");
      rojo.style.backgroundColor = "#FF5900";
      rojo.style.transform="scale(1.3)";
      setTimeout(function() {
        console.log("esperamos 700 ms");
        rojo.style.backgroundColor = "#B24207";
        rojo.style.transform="scale(1)";
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
function click(elemento) {
  switch (elemento) {
    case "rojo":
      //console.log("colorear rojo");
      rojo.style.backgroundColor = "#FF5900";
      setTimeout(function() {
        console.log("esperamos 150 ms");
        rojo.style.backgroundColor = "#B24207";
      }, 150);
      break;
    case "azul":
      //console.log("colorear azul");
      azul.style.backgroundColor = "#6FDEFF";
      setTimeout(function() {
        console.log("esperamos 150 ms");

        azul.style.backgroundColor = "#0D589F";
      }, 150);
      break;
    case "verde":
      //console.log("colorear verde");
      verde.style.backgroundColor = "#7DFF28";
      setTimeout(function() {
        console.log("esperamos 150 ms");

        verde.style.backgroundColor = "#208709";
      }, 150);
      break;
    case "amarillo":
      //console.log("colorear amarillo");
      amarillo.style.backgroundColor = "#FFF520";
      setTimeout(function() {
        console.log("esperamos 150 ms");

        amarillo.style.backgroundColor = "#B5A509";
      }, 150);
      break;
  }
}
