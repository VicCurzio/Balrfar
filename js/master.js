const crearCreatura = document.querySelector("#btnMasterCrear");
crearCreatura.addEventListener("click", creacionCreatura);

function creacionCreatura(e) {
    e.preventDefault();
    const claseSeleccionada = document.querySelector("#masterCreacion").value;
    const creaturaSeleccionada = enemigosCreaturas.find(
        (creatura) => creatura.nombre === claseSeleccionada
    );

    if (creaturaSeleccionada) {
        const contenedor = document.createElement("div");
        contenedor.className = "creaturaCard";

        const carta = document.createElement("div");
        carta.className = "card";

        carta.innerHTML = `
        <img class="card-img-top" src="${creaturaSeleccionada.img}" alt="${creaturaSeleccionada.nombre}" style="width:100%">
        <div class="card-body">
            <h4 class="card-title">${creaturaSeleccionada.nombre}</h4>
            <ul>
                <li class="card-text">Vida: ${creaturaSeleccionada.vida}</li>
                <li>Mana: ${creaturaSeleccionada.mana}</li>
                <li>Daño: ${creaturaSeleccionada.daño}</li>
                <li>Dinero: ${creaturaSeleccionada.dinero}</li>
            </ul>
        </div>
        <button type="button" class="btn btn-dark btnCreaturaBorrar">Borrar</button>`;

        contenedor.appendChild(carta);

        const contenedorExistente = document.querySelector(".cartasMaster");
        if (contenedorExistente) {
            contenedorExistente.appendChild(contenedor);
        } else {
            const nuevaFila = document.createElement("div");
            nuevaFila.className = "row";
            nuevaFila.appendChild(contenedor);
            document.querySelector(".cartasMaster").appendChild(nuevaFila);
        }

        Swal.fire({
            icon: "success",
            title: "Creada",
            text: "Tu carta fue creada con éxito!",
            showConfirmButton: false,
            timer: 1000,
        });

        const borrarCreatura = carta.querySelector(".btnCreaturaBorrar");
        borrarCreatura.addEventListener("click", () =>
            eliminarCreatura(contenedor)
        );

        guardarCartaEnLocalStorage(creaturaSeleccionada);
    }
}

function eliminarCreatura(contenedor) {
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

function guardarCartaEnLocalStorage(creatura) {
    let cartas = obtenerCartasLocalStorage();
    cartas.push(creatura);
    localStorage.setItem("creatura", JSON.stringify(cartas));
}

function eliminarCartaDeLocalStorage(contenedor) {
    let cartas = obtenerCartasLocalStorage();
    const nombreCartaEliminada = contenedor.querySelector(
        "h4.card-title"
    ).textContent;
    const indiceCartaEliminada = cartas.findIndex(
        (carta) => carta.nombre === nombreCartaEliminada
    );

    if (indiceCartaEliminada !== -1) {
        cartas.splice(indiceCartaEliminada, 1);
        localStorage.setItem("creatura", JSON.stringify(cartas));
    }
}

window.addEventListener("DOMContentLoaded", () => {
    const cartas = obtenerCartasLocalStorage();
    mostrarCartas(cartas);
});

function obtenerCartasLocalStorage() {
    let cartas = JSON.parse(localStorage.getItem("creatura")) || [];
    return cartas;
}

function mostrarCartas(cartas) {
    const contenedor = document.querySelector(".cartasMaster");

    for (let i = 0; i < cartas.length; i++) {
        const creatura = cartas[i];

        const row = document.createElement("div");
        row.className = "row";

        const columna = document.createElement("div");
        columna.className = "col";

        const carta = document.createElement("div");
        carta.className = "card";

        carta.innerHTML = `
        <img class="card-img-top" src="${creatura.img}" alt="${creatura.nombre}" style="width:100%">
        <div class="card-body">
            <h4 class="card-title">${creatura.nombre}</h4>
            <ul>
                <li class="card-text">Vida: ${creatura.vida}</li>
                <li>Mana: ${creatura.mana}</li>
                <li>Daño: ${creatura.daño}</li>
                <li>Dinero: ${creatura.dinero}</li>
            </ul>
        </div>
        <button type="button" class="btn btn-dark btnCreaturaBorrar">Borrar</button>`;

        columna.appendChild(carta);
        row.appendChild(columna);
        contenedor.appendChild(row);
    }

    const botonesBorrar = document.querySelectorAll(".btnCreaturaBorrar");
    botonesBorrar.forEach((boton) =>
        boton.addEventListener("click", () =>
            eliminarCreatura(boton.parentElement.parentElement.parentElement)
        )
    );
}
