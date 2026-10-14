## 🌿 Flujo de trabajo con Git

La rama `main` está **protegida**: no se puede subir código directo a ella. Todo cambio entra por un **pull request (PR)**.

### Reparto de archivos (para no pisarnos)

| Quién | Archivos |
|---|---|
| Lógica del juego | `src/engine.js`, `src/main.js`, `data/` |
| Gráficos | `src/render.js`(es ejemplo) y los recursos visuales |

Regla: **cada quien edita solo sus archivos**. Si necesitas algo de los del otro, avísale por el grupo.

### Paso a paso para cada tarea

**1. Actualiza `main` antes de empezar**
```bash
git switch main
git pull
```

**2. Crea una rama nueva para la tarea**
```bash
git switch -c feat/nombre-corto
```

**3. Trabaja y guarda cambios** (las veces que haga falta)
```bash
git add .
git commit -m "describe qué cambiaste"
```

**4. Sube tu rama** (la primera vez)
```bash
git push -u origin feat/nombre-corto
```
Los siguientes pushes de esa misma rama son solo `git push`.

**5. Abre el Pull Request en GitHub**
Botón verde **Compare & pull request** → título claro → **Create pull request**.

**6. Revisión y merge**
Otra persona del equipo revisa el PR y lo une con **Merge pull request**.

**7. Vuelve a empezar con una rama nueva**
```bash
git switch main
git pull
git switch -c feat/siguiente-tarea
```

### ♻️ ¿Puedo seguir usando mi rama inicial?

Sí, tienes dos situaciones:

**Mientras tu PR sigue abierto:** sigue trabajando en la misma rama. Cada push actualiza el PR solo.
```bash
git add .
git commit -m "describe el cambio"
git push
```

**Después de que tu PR se unió (merge):** puedes seguir usando la misma rama, pero primero hay que ponerla al día con `main`. Elige una opción:

*Opción A (recomendada): unir los cambios de `main` a tu rama*
```bash
git switch main
git pull
git switch tu-rama
git merge main
```
Si Git avisa de conflictos, abre los archivos marcados, deja la versión correcta y haz `git add .` y `git commit`.

*Opción B: reiniciar tu rama a como está `main`* (solo si **todo** lo de tu rama ya se unió; esto borra lo que no se haya subido)
```bash
git switch tu-rama
git fetch origin
git reset --hard origin/main
```

> 💡 Si no quieres lidiar con conflictos, crear una rama nueva por tarea sigue siendo lo más limpio (paso 7). Reutilizar la rama es opcional.

### Nombres de ramas

| Prefijo | Para qué | Ejemplo |
|---|---|---|
| `feat/` | función nueva | `feat/botones-acciones` |
| `fix/` | corregir un error | `fix/consumo-oxigeno` |
| `docs/` | documentación | `docs/fuentes-nasa` |

### Reglas de oro

- ❌ Nunca hacer `git push` estando en `main`.
- ✅ Una rama = una tarea pequeña.
- ✅ Un PR pequeño se revisa rápido y causa menos conflictos.
- ✅ Antes de crear una rama, siempre `git pull` en `main`.
- ✅ Mensajes de commit claros: "agrega acción comer", no "cambios".

### ¿Subiste a `main` por error?

El push será rechazado y tu commit sigue guardado en tu computador. Muévelo a una rama:
```bash
git switch -c feat/nombre-corto
git push -u origin feat/nombre-corto
git branch -f main origin/main
```
