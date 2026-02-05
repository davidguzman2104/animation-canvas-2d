# Animación de Círculos en Canvas con JavaScript

Este proyecto muestra una animación interactiva usando **HTML5 Canvas** y **JavaScript**, aplicando **Programación Orientada a Objetos (POO)**. Los círculos se mueven dentro del canvas y rebotan al colisionar con los bordes de la pantalla.

---

## Características
- Canvas 2D a pantalla completa
- Clase `Circle` con POO
- Animación fluida con `requestAnimationFrame`
- Detección de colisiones con límites
- Texto centrado dentro de cada círculo
- Velocidades independientes por objeto

---

## Tecnologías
- HTML5
- JavaScript (ES6)
- Canvas API

---

## Configuración del Canvas
El canvas se ajusta automáticamente al tamaño de la ventana del navegador y se le asigna un color de fondo.

---

## Clase `Circle`
Representa un círculo animado.

**Constructor**
- `x`, `y`: posición inicial
- `radius`: radio
- `color`: color del borde
- `text`: texto centrado
- `speed`: velocidad de movimiento

**Métodos**
- `draw(context)`: dibuja el círculo y el texto centrado.
- `update(context)`: controla el movimiento, detecta colisiones con los bordes e invierte la dirección cuando es necesario.

---

## Creación de Objetos
Se crean dos círculos con valores aleatorios de posición y tamaño, cada uno con color, texto y velocidad distintos, lo que permite observar comportamientos independientes dentro de la animación.

---

## Animación
La animación se ejecuta mediante un bucle con `requestAnimationFrame`, limpiando el canvas en cada frame y actualizando la posición de los círculos para lograr un movimiento continuo y fluido.

---

## Resultado
- Dos círculos se desplazan por toda la pantalla
- Rebotan al tocar los bordes del canvas
- Mantienen su texto visible
- Cada círculo se mueve de forma independiente

---

## Objetivo Académico
Practicar el uso de Canvas, animaciones básicas, detección de colisiones y Programación Orientada a Objetos en JavaScript.

---

## Autor
Proyecto desarrollado con fines educativos.
