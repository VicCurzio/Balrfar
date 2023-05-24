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
        contenedor.className = "mt-3 aventureroCard";

        const row = document.createElement("div");
        row.className = "row";

        const columna = document.createElement("div");
        columna.className = "col";

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
        <button type="button" class="btn btn-dark" id="btnAventureroTablero">Tablero</button>
        <button type="button" class="btn btn-dark btnAventureroBorrar">Borrar</button>`;

        columna.appendChild(carta);
        row.appendChild(columna);
        contenedor.appendChild(row);
        document.querySelector(".cartasAventurero").appendChild(contenedor);
        Swal.fire({
            icon: 'success',
            title: 'Creada',
            text: 'Tu carta fue creada con éxito!',
            showConfirmButton: false,
            timer: 1000
        });

        const borrarAventurero = carta.querySelector(".btnAventureroBorrar");
        borrarAventurero.addEventListener("click", () => eliminarAventurero(contenedor));
    }
}

function eliminarAventurero(contenedor) {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    });

    swalWithBootstrapButtons.fire({
        title: '¿Estás seguro?',
        text: 'Se eliminará la carta.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, ¡borrar!',
        cancelButtonText: 'No, cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            contenedor.remove();
            swalWithBootstrapButtons.fire(
                '¡Borrada!',
                'Tu carta ha sido borrada con éxito.',
                'success'
            );
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            swalWithBootstrapButtons.fire(
                'Cancelado',
                'Tu carta se ha salvado.',
                'error'
            );
        }
    });
}