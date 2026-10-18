
// ===== CONFIGURACIÓN =====
const SEMILLA = 99;
const DIAS_MISION = 6;
const PROB_EVENT = 0.4;


const ESTADO_INICIAL = { dia: 1, oxigeno: 100, energia: 100, comida: 100, radiacion: 0 };

// Lo que consume la tripulación cada día
const CONSUMO_DIARIO = { oxigeno: 15, energia: 10, comida: 10 };

const LIMITE_RADIACION = 80;
const RADIACION_DIARIA = 20;

const ACCIONES = {
    reciclarAire: { oxigeno: 20, energia: -10 },
    descansar: { energia: 20, oxigeno: -3 },
    comer: { comida: 25, energia: 5, oxigeno: -1 },
    reforzarBlindaje: { radiacion: -40, energia: -10, oxigeno: -2 },
};

const EVENTOS = [
    { nombre: "tormentaSolar", efecto: { energia: -20, oxigeno: -11, radiacion: 25 } },
    { nombre: "fallaCO2", efecto: { energia: -12, oxigeno: -23 } },
    { nombre: "micrometeorito", efecto: { energia: -15, oxigeno: -15 } },
];

// ===== FUNCIONES =====
function crearRng(semilla) {
    let s = semilla;
    return function () {
        s = (s + 0x6D2B79F5) | 0;
        let t = Math.imul(s ^ (s >>> 15), 1 | s);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

const RECURSOS = ["oxigeno", "energia", "comida", "radiacion"];

function sumarEfecto(estado, efecto) {
    const nuevo = { ...estado };                       // conserva dia y todo lo demás
    for (const k of RECURSOS) nuevo[k] = estado[k] + (efecto[k] ?? 0);
    nuevo.radiacion = Math.max(0, nuevo.radiacion);    // la radiación no baja de 0
    return nuevo;
}

function aplicarAccion(estado, accion) {
    const efecto = ACCIONES[accion];
    return efecto ? sumarEfecto(estado, efecto) : estado;
}

function pasarDia(estado) {
    const nuevo = sumarEfecto(estado, {
        oxigeno: -CONSUMO_DIARIO.oxigeno,
        energia: -CONSUMO_DIARIO.energia,
        comida: -CONSUMO_DIARIO.comida,
        radiacion: RADIACION_DIARIA,
    });
    nuevo.dia = estado.dia + 1;
    return nuevo;
}

function estaVivo(estado) {
    return estado.oxigeno > 0 && estado.energia > 0 &&
        estado.comida > 0 && estado.radiacion < LIMITE_RADIACION;
}

function aplicarEvento(estado, rng) {
    if (rng() >= PROB_EVENT) {
        return { estado: estado, evento: null };
    }

    const indice = Math.floor(rng() * EVENTOS.length);
    const evento = EVENTOS[indice];

    return { estado: sumarEfecto(estado, evento.efecto), evento: evento.nombre };
}

// Un turno = acción del jugador, luego pasa el día, luego puede ocurrir un evento.
// Devuelve { estado, evento }
function turno(estado, accion, rng) {
    const despuesDeAccion = aplicarAccion(estado, accion);
    const despuesDeDia = pasarDia(despuesDeAccion);
    return aplicarEvento(despuesDeDia, rng);
}

// Devuelve "perdida", "ganada" o "enCurso"
function estadoMision(estado) {
    if (!estaVivo(estado)) return "perdida";
    if (estado.dia >= DIAS_MISION) return "ganada";
    return "enCurso";
}


    export {
        crearRng, turno, estadoMision, estaVivo, ACCIONES, ESTADO_INICIAL,
        SEMILLA, DIAS_MISION, LIMITE_RADIACION, RADIACION_DIARIA
    };
