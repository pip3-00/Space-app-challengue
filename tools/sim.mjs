import {
    crearRng, turno, estadoMision, estaVivo, ACCIONES, ESTADO_INICIAL,
    SEMILLA, DIAS_MISION, LIMITE_RADIACION, RADIACION_DIARIA
} from '../src/engine.js';

const nombres = Object.keys(ACCIONES);

const margen = (e, a) => {
    const x = ACCIONES[a];
    return Math.min(
        (e.oxigeno + (x.oxigeno ?? 0)) / 15,
        (e.energia + (x.energia ?? 0)) / 10,
        (e.comida + (x.comida ?? 0)) / 10,
        (LIMITE_RADIACION - Math.max(0, e.radiacion + (x.radiacion ?? 0))) / RADIACION_DIARIA
    );
};

const estrategias = {
    nada: () => null,
    codiciosa: e => nombres.reduce((m, a) => margen(e, a) > margen(e, m) ? a : m),
};

for (const [n, elegir] of Object.entries(estrategias)) {
    let g = 0;
    for (let s = 1; s <= 1000; s++) {
        let e = { ...ESTADO_INICIAL };
        const r = crearRng(s);
        while (estadoMision(e) === 'enCurso') e = turno(e, elegir(e), r).estado;
        if (estadoMision(e) === 'ganada') g++;
    }
    console.log(n, (g / 10).toFixed(1) + '%');
}