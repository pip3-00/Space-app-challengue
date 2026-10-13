const rng = crearRng(SEMILLA);
const inicio = { dia: 1, oxigeno: 100, energia: 100, comida: 100 };

console.log(JSON.stringify(turno(inicio, "comer", rng)));

console.log("VERSION NUEVA");