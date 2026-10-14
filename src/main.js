// Estado de la partida
const rng = crearRng(SEMILLA);
let estado = { ...ESTADO_INICIAL };
let terminado = false;

// Elementos de la página
const info = document.getElementById("info");
const contenedor = document.getElementById("acciones");

function mostrar(evento, veredicto) {
    let texto = JSON.stringify(estado, null, 2) + "\nEvento: " + (evento ?? "ninguno");
    if (veredicto === "ganada") texto += "\nMisión cumplida";
    if (veredicto === "perdida") texto += "\nMisión perdida";
    info.textContent = texto;
}

function jugar(accion) {
    if (terminado) return;

    const resultado = turno(estado, accion, rng);
    estado = resultado.estado;

    const veredicto = estadoMision(estado);
    if (veredicto !== "enCurso") terminado = true;

    mostrar(resultado.evento, veredicto);
    dibujar(estado);
}

// Un botón por cada acción de la tabla ACCIONES
for (const nombre of Object.keys(ACCIONES)) {
    const boton = document.createElement("button");
    boton.textContent = nombre;
    boton.addEventListener("click", () => jugar(nombre));
    contenedor.appendChild(boton);
}

mostrar(null, "enCurso");
dibujar(estado);