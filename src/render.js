const canvas = document.getElementById("juego");
const ctx = canvas.getContext("2d");

// PLACEHOLDER: el equipo gráfico reemplaza el contenido de dibujar()
function dibujar(estado) {
    // cielo y suelo
    ctx.fillStyle = "#d9a066";
    ctx.fillRect(0, 0, 800, 300);
    ctx.fillStyle = "#a0522d";
    ctx.fillRect(0, 300, 800, 150);

    // una barra por recurso: el ancho sale del valor (0 a 100)
    const recursos = ["oxigeno", "energia", "comida"];
    recursos.forEach((nombre, i) => {
        const valor = Math.max(0, Math.min(100, estado[nombre]));
        ctx.fillStyle = "#333";
        ctx.fillRect(20, 20 + i * 30, 200, 20);
        ctx.fillStyle = "#4caf50";
        ctx.fillRect(20, 20 + i * 30, valor * 2, 20);
    });
}