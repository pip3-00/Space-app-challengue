# Tareas de código para el programador

Contexto: la lógica base ya funciona (estado, acciones, eventos con semilla, victoria y derrota, botones y un dibujo provisional). Me enfócare en la **IA del juego**. Estas son las tareas de código que quedan. El simulador es de práctica: los datos pueden ser ilustrativos.


| # | Tarea | Archivos |
|---|---|---|
| 1 | Cambiar Marte por Luna en el HTML | `index.html` |
| 2 | Agregar el cuarto medidor: radiación | `src/engine.js`, `src/render.js` |
| 3 | Registrar historial de la partida | `src/main.js` |
| 4 | Botón de reinicio y mejoras de la interfaz | `src/main.js`, `index.html` |
| 5 | Pantalla de inicio y manejo de pantallas | `src/main.js`, `index.html` |
| 6 | Cargador de imágenes (opcional) | `src/assets.js` (nuevo) |
| 7 | Tutorial de lanzamiento (opcional) | `src/lanzamiento.js` (nuevo) |

---

## 1. Cambiar Marte por Luna en el HTML

- En `index.html`, cambiar "Marte" por "Luna" en el `<title>` y en el `<h1>` (ahora dice "Puesto Avanzado Marte").
- Buscar con `Ctrl+Shift+F` si "Marte" aparece en otros archivos y cambiarlo también.
- Los ids (`juego`, `acciones`, `info`) **no se tocan**.


**Listo cuando:** la pestaña y el título de la página dicen Luna y no queda "Marte" en el proyecto.

## 2. Agregar el cuarto medidor: radiación

**En `src/engine.js`:**
- Agregar `radiacion` al estado, empezando en 0. A diferencia de los otros recursos, **sube** con el tiempo, y subir es malo.
- Constante `LIMITE_RADIACION`. Llegar al límite = misión perdida (actualizar `estaVivo`).
- La radiación sube un poco cada día (en la configuración, junto a `CONSUMO_DIARIO`).
- El evento `tormentaSolar` la sube más.
- Una acción nueva que la reduzca o frene (por ejemplo, `reforzarBlindaje`, con costo de energía).

**En `src/render.js`:** agregar una cuarta barra provisional.

**Listo cuando:** con la semilla 99 se puede ganar con buenas decisiones y no se puede ganar sin hacer nada. Probar varias partidas y ajustar los números.

## 3. Registrar historial de la partida

La IA  lo necesita para el reporte final. Guardar por cada turno un objeto con este formato:

```js
{ dia: 1, accion: "comer", evento: "micrometeorito", estado: { dia: 2, oxigeno: 69, energia: 80, comida: 115 } }
```

- Un arreglo `historial` que se reinicia en cada partida.
- Una función `obtenerHistorial()` que lo devuelva.

**Listo cuando:** después de jugar 3 turnos, `console.log(obtenerHistorial())` muestra 3 objetos con ese formato.

## 4. Botón de reinicio y mejoras de la interfaz

- Botón **Nueva misión**: reinicia estado, generador aleatorio e historial, y vuelve a habilitar los botones.
- Campo para elegir la **semilla** (por defecto 99).
- Cada botón de acción muestra su efecto, generado desde la tabla `ACCIONES`, sin números escritos a mano.
- Mostrar "Día X de 6".
- Solo se **agregan** elementos al HTML: no se cambian los ids existentes.

**Listo cuando:** se puede jugar, perder, pulsar Nueva misión y jugar otra vez sin recargar.


**Coordinar con equipo gráfico cuando estén listos**

## 5. Pantalla de inicio y manejo de pantallas

Flujo: **Inicio → Lanzamiento → Superficie → Gestión de la base.**

- Mostrar una pantalla a la vez (un contenedor por pantalla, que se oculta o se muestra).
- Pantalla de inicio: "Bienvenido, astronauta junior" y botón **Comenzar misión**, que lleva a la gestión (mientras no existan las otras).
- **Coordinar con Equipo gráfico:** él diseña primero la pantalla de inicio. Pedirle el texto, los ids que usa y los tamaños.

**Listo cuando:** se abre la página, aparece el inicio, se pulsa Comenzar y se llega al juego.

## 6. Cargador de imágenes (opcional)

**Equipo gráfico** entrega PNG y SVG. El cargador debe:
- Precargar las imágenes de `assets/` antes de empezar.
- Exponer una forma simple de usarlas desde `dibujar` (por ejemplo, `imagenes.fondo`).
- No romper el juego si una imagen todavía no existe.

**Listo cuando:** una imagen de prueba en `assets/` aparece en el lienzo.

## 7. Tutorial de lanzamiento (opcional)

Vista del cohete; el jugador controla **velocidad** y **combustible**; dura 30 a 60 segundos.


**Listo cuando:** se juega el tutorial completo y termina en la pantalla de gestión.
