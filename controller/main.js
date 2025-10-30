// Controlador principal
// funciones.
// Crud (Create, Read   ).
// funcion crearEmpleado. (C - Crear).
function crearEmpleado() {
    // código para crear un empleado.
    document.getElementById("divAgregarEmpleado").style.display = 
        document.getElementById("divAgregarEmpleado").style.display === 'none' ? 'block' : 'none';
}

document.addEventListener("DOMContentLoaded", () => {
    mostrarEmpleados();
    hallarTotalNomina();
    const form = document.getElementById("formEmpleado");
    if (form) {
        form.addEventListener("submit", function(e) {
            e.preventDefault();
        });
    }
});
function AgregarEmpleado() {
    // código para agregar un empleado.
    
    // // Mostrar empleados al cargar la página
    // document.addEventListener("DOMContentLoaded", mostrarEmpleados);
    // // Evitar el envío del formulario al hacer clic en el botón
    // document.getElementById("formEmpleado").addEventListener("submit", function(e) {
    //     e.preventDefault(); // Evitar el envío del formulario
    // });
    const empleado = new Empleado(
        document.getElementById("cc").value,
        document.getElementById("nombreCompleto").value,
        document.getElementById("direccion").value,
        document.getElementById("email").value,
        document.getElementById("telefono").value,
        document.getElementById("sueldoBase").value,
        document.getElementById("tipoEmpleado").value,
        document.getElementById("tipoBonificacion").value
    );

    // Crear un nuevo Json de empleados en el localStorage si no existe.
    let empleados = JSON.parse(localStorage.getItem("empleados")) || [];
    // Agregar el nuevo empleado al array.
    empleados.push(empleado);
    // Guardar el array actualizado en el localStorage.
    localStorage.setItem("empleados", JSON.stringify(empleados));
    // Llamar a la funcion para mostrar los empleados actualizados.
    mostrarEmpleados();
    hallarTotalNomina();
    // Resetear el formulario.
    document.getElementById("formEmpleado").reset();
}


function calcularSueldoTotal(emp) {
    const sueldoBase = parseFloat(emp.sueldoBase) || 0;
    let adicion = 0;
    switch (emp.tipoBonificacion || '') {
        case 'A': adicion = 200000; break;
        case 'B': adicion = 150000; break;
        case 'C': adicion = 100000; break;
        case 'D': adicion = 50000;  break;
        default:  adicion = 0;
    }
    return {
        adicion,
        sueldoTotal: sueldoBase + adicion
    };
}
// Mostrar empleados en tabla
function mostrarEmpleados() {
    const tbody = document.querySelector('#tablaEmpleados tbody');
    tbody.innerHTML = '';

    const empleados = JSON.parse(localStorage.getItem('empleados')) || [];
    empleados.forEach((emp, index) => {
        const { sueldoTotal } = calcularSueldoTotal(emp);
        const fila = `<tr>
            <td>${index + 1}</td> <!-- Aquí se genera el número autoincremento con el index del array -->
            <td>${emp.cc}</td>
            <td>${emp.nombreCompleto}</td>
            <td>${emp.direccion}</td>
            <td>${emp.email}</td>
            <td>${emp.telefono}</td>
            <td>${emp.sueldoBase}</td>
            <td>${emp.tipoEmpleado}</td>
            <td>${emp.tipoBonificacion}</td>
            <td>${sueldoTotal}</td>
            </tr>`;
        tbody.innerHTML += fila;
    });
}

function hallarTotalNomina() {
    const empleados = JSON.parse(localStorage.getItem('empleados')) || [];
    let totalNomina = 0;

    empleados.forEach(emp => {
        const { sueldoTotal } = calcularSueldoTotal(emp);
        totalNomina += sueldoTotal;
    });

    const el = document.getElementById("totalNomina");
    if (el) el.innerText = `$ ${totalNomina}`;
}
