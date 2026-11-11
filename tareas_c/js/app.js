const formulario = document.getElementById("formulario");
const inputTarea = document.getElementById("nuevaTarea");
const mensajeError = document.getElementById("error");
const lista = document.getElementById("lista");
const mensajeVacio = document.getElementById("vacio");
 
const spanTotal = document.getElementById("total");
const spanCompletadas = document.getElementById("completadas");
const spanPendientes = document.getElementById("pendientes");
const barra = document.getElementById("barra");
const relleno = document.getElementById("relleno");
const textoPorcentaje = document.getElementById("porcentaje");
 
// ===== Estado =====
let tareas = [];
let contadorId = 0;
 
// ===== Funciones =====
function agregarTarea(texto) {
  contadorId++;
  tareas.push({
    id: contadorId,
    texto: texto,
    completada: false
  });
}
 
function completarTarea(id) {
  for (const tarea of tareas) {
    if (tarea.id === id) {
      tarea.completada = true;
    }
  }
}
 
function eliminarTarea(id) {
  tareas = tareas.filter(function (tarea) {
    return tarea.id !== id;
  });
}
 
function crearElementoTarea(tarea) {
  const item = document.createElement("li");
  item.classList.add("tarea");
  if (tarea.completada) {
    item.classList.add("tarea--completada");
  }
 
  const texto = document.createElement("span");
  texto.classList.add("tarea__texto");
  texto.textContent = (tarea.completada ? "[x] " : "[ ] ") + tarea.texto;
 
  const acciones = document.createElement("div");
  acciones.classList.add("tarea__acciones");
 
  const botonCompletar = document.createElement("button");
  botonCompletar.type = "button";
  botonCompletar.textContent = "Completar";
  botonCompletar.classList.add("boton", "boton--completar");
  botonCompletar.disabled = tarea.completada;
  botonCompletar.addEventListener("click", function () {
    completarTarea(tarea.id);
    mostrarTareas();
  });
 
  const botonEliminar = document.createElement("button");
  botonEliminar.type = "button";
  botonEliminar.textContent = "Eliminar";
  botonEliminar.classList.add("boton", "boton--eliminar");
  botonEliminar.addEventListener("click", function () {
    eliminarTarea(tarea.id);
    mostrarTareas();
  });
 
  acciones.appendChild(botonCompletar);
  acciones.appendChild(botonEliminar);
  item.appendChild(texto);
  item.appendChild(acciones);
 
  return item;
}
 
function actualizarContador() {
  const total = tareas.length;
  const completadas = tareas.filter(function (tarea) {
    return tarea.completada;
  }).length;
  const pendientes = total - completadas;
  const porcentaje = total === 0 ? 0 : Math.round((completadas / total) * 100);
 
  spanTotal.textContent = total;
  spanCompletadas.textContent = completadas;
  spanPendientes.textContent = pendientes;
 
  relleno.style.width = porcentaje + "%";
  barra.setAttribute("aria-valuenow", porcentaje);
  textoPorcentaje.textContent = porcentaje + "% completado";
}
 
function mostrarTareas() {
  lista.innerHTML = "";
 
  for (const tarea of tareas) {
    lista.appendChild(crearElementoTarea(tarea));
  }
 
  mensajeVacio.classList.toggle("vacio--oculto", tareas.length > 0);
  actualizarContador();
}
 
// ===== Eventos =====
formulario.addEventListener("submit", function (evento) {
  evento.preventDefault();
 
  const texto = inputTarea.value.trim();
 
  // No se permiten tareas vacías
  if (texto === "") {
    mensajeError.textContent = "Escribe una tarea antes de agregarla.";
    inputTarea.focus();
    return;
  }
 
  mensajeError.textContent = "";
  agregarTarea(texto);
  mostrarTareas();
 
  formulario.reset();
  inputTarea.focus();
});
 
inputTarea.addEventListener("input", function () {
  mensajeError.textContent = "";
});
 
// ===== Inicio =====
mostrarTareas();
 