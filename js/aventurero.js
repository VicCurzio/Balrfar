const crearAventurero = document.querySelector("#btnAventureroCrear");
crearAventurero.addEventListener("click", creacionAventurero);

function creacionAventurero(e) {
    e.preventDefault();
    const claseSeleccionada = document.querySelector("#aventureroClase").value;
    const aventureroSeleccionado = clasesAventurero.find(
        (aventurero) => aventurero.nombre === claseSeleccionada
    );

    if (aventureroSeleccionado) {
        let contenedor = document.createElement("div");
        contenedor.className = "container mt-3 aventureroCard";

        let row = document.createElement("div");
        row.className = "row";

        let columna = document.createElement("div");
        columna.className = "col";

        let carta = document.createElement("div");
        carta.className = "card";
        carta.style = "width: 15vw";

        carta.innerHTML = `<img class="card-img-top" src="${aventureroSeleccionado.img}" alt="${aventureroSeleccionado.nombre}" style="width:100%">
                        <div class="card-body">
                            <h4 class="card-title">${aventureroSeleccionado.nombre}</h4>
                            <ul>
                                <li class="card-text">Vida: ${aventureroSeleccionado.vida}</li>
                                <li>Mana: ${aventureroSeleccionado.mana}</li>
                                <li>Daño: ${aventureroSeleccionado.daño}</li>
                                <li>Dinero: ${aventureroSeleccionado.dinero}</li>
                            </ul>
                        </div>`;

        columna.appendChild(carta);
        row.appendChild(columna);
        contenedor.appendChild(row);
        document.querySelector("main").appendChild(contenedor);
        Swal.fire({
            icon: 'success',
            title: 'Carta creada',
            showConfirmButton: false,
            timer: 1000
        })
    }
}

const borrarAventurero = document.querySelector("#btnAventureroBorrar");
borrarAventurero.addEventListener("click", eliminarAventurero);
function eliminarAventurero(e) {
    let borrar = document.querySelector(".aventureroCard");
    borrar.remove();
    Swal.fire({
        icon: 'warning',
        title: 'Carta eliminada',
        showConfirmButton: false,
        timer: 1700
    })
}