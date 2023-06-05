const crearAventurero = document.querySelector("#btnAventureroCrear");
crearAventurero.addEventListener("click", creacionAventurero);

function creacionAventurero(e) {
    e.preventDefault();
    const claseSeleccionada = document.querySelector("#aventureroClase").value;
    const aventureroSeleccionado = clasesAventurero.find(
        (aventurero) => aventurero.nombre === claseSeleccionada
    );

    if (aventureroSeleccionado) {
        const contenedor = document.createElement("div");
        contenedor.className = "aventureroCard";

        const carta = document.createElement("div");
        carta.className = "card";

        carta.innerHTML = `
        <img class="card-img-top" src="${aventureroSeleccionado.img}" alt="${aventureroSeleccionado.nombre}" style="width:100%">
        <div class="card-body">
            <h4 class="card-title">${aventureroSeleccionado.nombre}</h4>
            <ul>
                <li class="card-text">Vida: ${aventureroSeleccionado.vida}</li>
                <li>Mana: ${aventureroSeleccionado.mana}</li>
                <li>Daño: ${aventureroSeleccionado.daño}</li>
                <li>Dinero: ${aventureroSeleccionado.dinero}</li>
            </ul>
        </div>
        <button type="button" class="btn btn-dark btnAventureroBorrar">Borrar</button>`;

        contenedor.appendChild(carta);
        const contenedorExistente = document.querySelector(".cartasAventurero");
        if (contenedorExistente) {
            contenedorExistente.appendChild(contenedor);
        } else {
            const nuevaFila = document.createElement("div");
            nuevaFila.className = "row";
            nuevaFila.appendChild(contenedor);
            document.querySelector(".cartasAventurero").appendChild(nuevaFila);
        }
        Swal.fire({
            icon: "success",
            title: "Creada",
            text: "Tu carta fue creada con éxito!",
            showConfirmButton: false,
            timer: 1000,
        });

        const borrarAventurero = carta.querySelector(".btnAventureroBorrar");
        borrarAventurero.addEventListener("click", () => eliminarAventurero(contenedor));

        guardarCartaEnLocalStorage(aventureroSeleccionado);
    }
}

function eliminarAventurero(contenedor) {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: "btn btn-success",
            cancelButton: "btn btn-danger",
        },
        buttonsStyling: false,
    });

    swalWithBootstrapButtons
        .fire({
            title: "¿Estás seguro?",
            text: "Se eliminará la carta.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, ¡borrar!",
            cancelButtonText: "No, cancelar",
        })
        .then((result) => {
            if (result.isConfirmed) {
                contenedor.remove();
                eliminarCartaDeLocalStorage(contenedor);

                swalWithBootstrapButtons.fire(
                    "¡Borrada!",
                    "Tu carta ha sido borrada con éxito.",
                    "success"
                );
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                swalWithBootstrapButtons.fire(
                    "Cancelado",
                    "Tu carta se ha salvado.",
                    "error"
                );
            }
        });
}

function guardarCartaEnLocalStorage(aventurero) {
    let cartas = obtenerCartasLocalStorage();
    cartas.push(aventurero);
    localStorage.setItem("aventurero", JSON.stringify(cartas));
}

function eliminarCartaDeLocalStorage(contenedor) {
    let cartas = obtenerCartasLocalStorage();
    const nombreCartaEliminada = contenedor.querySelector("h4.card-title").textContent;
    const indiceCartaEliminada = cartas.findIndex((carta) => carta.nombre === nombreCartaEliminada);

    if (indiceCartaEliminada !== -1) {
        cartas.splice(indiceCartaEliminada, 1);
        localStorage.setItem("aventurero", JSON.stringify(cartas));
    }
}

window.addEventListener("DOMContentLoaded", () => {
    const cartas = obtenerCartasLocalStorage();
    mostrarCartas(cartas);
});

function obtenerCartasLocalStorage() {
    let cartas = JSON.parse(localStorage.getItem("aventurero")) || [];
    return cartas;
}

function mostrarCartas(cartas) {
    const contenedor = document.querySelector(".cartasAventurero");

    for (let i = 0; i < cartas.length; i++) {
        const aventurero = cartas[i];

        const row = document.createElement("div");
        row.className = "row";

        const columna = document.createElement("div");
        columna.className = "col";

        const carta = document.createElement("div");
        carta.className = "card";

        carta.innerHTML = `
        <img class="card-img-top" src="${aventurero.img}" alt="${aventurero.nombre}" style="width:100%">
        <div class="card-body">
            <h4 class="card-title">${aventurero.nombre}</h4>
            <ul>
                <li class="card-text">Vida: ${aventurero.vida}</li>
                <li>Mana: ${aventurero.mana}</li>
                <li>Daño: ${aventurero.daño}</li>
                <li>Dinero: ${aventurero.dinero}</li>
            </ul>
        </div>
        <button type="button" class="btn btn-dark btnAventureroBorrar">Borrar</button>`;

        columna.appendChild(carta);
        row.appendChild(columna);
        contenedor.appendChild(row);
    }

    const botonesBorrar = document.querySelectorAll(".btnAventureroBorrar");
    botonesBorrar.forEach((boton) => boton.addEventListener("click", () => eliminarAventurero(boton.parentElement.parentElement.parentElement)));
}
