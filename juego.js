// ------------------- DATOS DEL JUGADOR -------------------
let jugador = {
  nombre: "Aventurero",
  nivel: 1,
  vida: 100,
  ataque: 10,
  defensa: 5,
  monedas: 50
};

// ------------------- ENEMIGOS -------------------
let enemigos = [
  { nombre: "Duende", vida: 30, ataque: 8, defensa: 2, sprite: "img/duende.png" },
  { nombre: "Esqueleto", vida: 50, ataque: 12, defensa: 4, sprite: "img/esqueleto.png" },
  { nombre: "Orco", vida: 80, ataque: 15, defensa: 6, sprite: "img/orco.png" }
];

let enemigoActual = null;

// ------------------- FUNCIONES DE SONIDO -------------------
function reproducirSonido(ruta) {
  let sonido = new Audio(ruta);
  sonido.play();
}

// ------------------- MOSTRAR ESTADO -------------------
function actualizarEstado() {
  document.getElementById("vidaJugador").textContent = jugador.vida;
  document.getElementById("ataqueJugador").textContent = jugador.ataque;
  document.getElementById("defensaJugador").textContent = jugador.defensa;
  document.getElementById("monedasJugador").textContent = jugador.monedas;
}

// ------------------- LOG -------------------
function log(mensaje) {
  document.getElementById("log").innerHTML = mensaje;
}

// ------------------- EXPLORAR -------------------
function explorar() {
  log("Exploras el bosque...");
  let evento = Math.random();

  if (evento < 0.6) { // aparece enemigo
    enemigoActual = JSON.parse(JSON.stringify(enemigos[Math.floor(Math.random() * enemigos.length)]));
    document.getElementById("enemigo").style.display = "block";
    document.getElementById("batalla").style.display = "block";

    document.getElementById("nombreEnemigo").textContent = enemigoActual.nombre;
    document.getElementById("vidaEnemigo").textContent = enemigoActual.vida;
    document.getElementById("spriteEnemigo").src = enemigoActual.sprite;

    log("¡Un " + enemigoActual.nombre + " salvaje apareció!");
  } else {
    log("No encontraste nada interesante...");
  }
}

// ------------------- DESCANSAR -------------------
function descansar() {
  jugador.vida = Math.min(jugador.vida + 10, 100);
  actualizarEstado();
  log("Descansaste y recuperaste 10 puntos de vida.");
}

// ------------------- BATALLA -------------------
function atacar() {
  if (!enemigoActual) return;

  reproducirSonido("sounds/ataque.mp3");

  // Daño jugador -> enemigo
  let danoJugador = Math.max(0, jugador.ataque - enemigoActual.defensa);
  enemigoActual.vida -= danoJugador;
  document.getElementById("vidaEnemigo").textContent = enemigoActual.vida;
  log("Atacaste al " + enemigoActual.nombre + " e hiciste " + danoJugador + " de daño.");

  if (enemigoActual.vida <= 0) {
    reproducirSonido("sounds/victoria.mp3");
    log("¡Derrotaste al " + enemigoActual.nombre + "!");
    jugador.monedas += 10;
    actualizarEstado();
    document.getElementById("batalla").style.display = "none";
    document.getElementById("enemigo").style.display = "none";
    enemigoActual = null;
    return;
  }

  // Daño enemigo -> jugador
  let danoEnemigo = Math.max(0, enemigoActual.ataque - jugador.defensa);
  jugador.vida -= danoEnemigo;
  actualizarEstado();
  log(enemigoActual.nombre + " te hizo " + danoEnemigo + " de daño.");

  if (jugador.vida <= 0) {
    log("¡Has sido derrotado!");
    reproducirSonido("sounds/derrota.mp3");
    document.getElementById("batalla").style.display = "none";
    document.getElementById("enemigo").style.display = "none";
  }
}

function huir() {
  log("¡Has huido del combate!");
  document.getElementById("batalla").style.display = "none";
  document.getElementById("enemigo").style.display = "none";
  enemigoActual = null;
}

// ------------------- MERCADO -------------------
function mostrarMercado() {
  log("Bienvenido al mercado (aún en construcción).");
}

// ------------------- SALIR -------------------
function salir() {
  log("¡Gracias por jugar!");
}

// ------------------- INICIO -------------------
window.onload = function() {
  actualizarEstado();
  log("¡Bienvenido al juego de aventura!");
};
