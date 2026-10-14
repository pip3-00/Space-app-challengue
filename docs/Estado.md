# Guía para el equipo gráfico

Este documento explica qué datos entrega el motor del juego y qué partes del proyecto puede modificar el equipo gráfico.
Si algo de aquí necesita cambiar, se avisa por el grupo **antes** de hacer el cambio.

## 1. Cómo funciona la conexión

El motor (`src/engine.js`) calcula el estado del juego. Cada vez que el jugador elige una acción, `src/main.js` llama a:

```js
dibujar(estado)
```

La función `dibujar` vive en `src/render.js`. **El nombre `dibujar` y el parámetro `estado` no se cambian.** Lo que hay dentro de la función es de gráficos.

## 2. Forma del estado

```js
{ dia: 1, oxigeno: 100, energia: 100, comida: 100 }
```

| Propiedad | Qué significa | Valor inicial | Rango |
|---|---|---|---|
| `dia` | Día actual de la misión | 1 | 1 a 6 (`DIAS_MISION`) |
| `oxigeno` | Reserva de oxígeno (soporte vital) | 100 | 0 a 100 aprox. |
| `energia` | Reserva de energía | 100 | 0 a 100 aprox. |
| `comida` | Reserva de alimentos | 100 | 0 a 100 aprox. |
| `radiacion` | PENDIENTE: por decidir si se agrega | por definir | por definir |

**Importante:** el motor no limita los valores. Un recurso puede pasar de 100 (por ejemplo, 120 después de reciclar aire) o bajar de 0 el día que la misión se pierde. Quien dibuje debe limitar el valor antes de usarlo:

```js
const valor = Math.max(0, Math.min(100, estado.oxigeno));
```

## 3. Cuándo se pierde o se gana

- **Misión perdida:** algún recurso (`oxigeno`, `energia` o `comida`) llega a 0 o menos.
- **Misión cumplida:** la tripulación sigue viva y `dia` llega a 6.

## 4. Acciones del jugador

| Nombre | Efecto |
|---|---|
| `reciclarAire` | oxígeno +20, energía -10 |
| `descansar` | energía +20, oxígeno -3 |
| `comer` | comida +25, energía +5, oxígeno -1 |

## 5. Consumo diario (cada día que pasa)

oxígeno -15, energía -10, comida -10.

## 6. Eventos aleatorios

Hay un 40% de probabilidad de que ocurra un evento al final de cada día.

| Nombre (`evento`) | Efecto | Qué representa |
|---|---|---|
| `tormentaSolar` | energía -20, oxígeno -11 | Ráfaga de radiación solar |
| `fallaCO2` | energía -12, oxígeno -23 | Falla del sistema de aire |
| `micrometeorito` | energía -15, oxígeno -15 | Impacto en el hábitat |
| `null` | sin efecto | No ocurrió ningún evento |

Por ahora `dibujar` solo recibe el `estado`. Si el equipo gráfico necesita saber **qué evento acaba de ocurrir** (para mostrar una animación, por ejemplo), se lo pedimos a la lógica y se agrega como segundo parámetro.

## 7. Qué se puede modificar y qué no

**Zona gráfica (se puede cambiar):**
- `src/render.js`: todo lo que se pinta en el lienzo.
- El bloque `<style>` de `index.html`: colores, fuentes, botones, bordes.
- El `<title>` y el `<h1>` de `index.html`.
- Recursos visuales (imágenes, íconos) en la carpeta `assets/`.

**Zona de lógica (no tocar sin avisar):**
- `src/engine.js`, `src/main.js` y `data/`.
- Los `id` de `index.html`: `juego`, `acciones` e `info`. `main.js` los busca por nombre, y si cambian el juego se rompe.
- El orden de los `<script>`: `engine.js`, `render.js`, `main.js`.
- El `width` y `height` del canvas (800 × 450). Si hace falta otro tamaño, se acuerda con lógica.

## 8. Cómo probar `dibujar` sin jugar

En `src/main.js` (solo para pruebas locales) se puede llamar a `dibujar` con estados inventados:

```js
dibujar({ dia: 1, oxigeno: 100, energia: 100, comida: 100 }); // todo bien
dibujar({ dia: 4, oxigeno: 20, energia: 10, comida: 60 });    // energía crítica
dibujar({ dia: 6, oxigeno: 0, energia: 50, comida: 50 });     // sin oxígeno
```

Esas líneas de prueba **no se suben** al repositorio.

## 9. Flujo de trabajo

Todo cambio entra por pull request, como indica el README. Cada persona edita solo sus archivos para no pisarse.