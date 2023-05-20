const crearCreatura = document.querySelector("#btnMasterCrear");
crearCreatura.addEventListener("click", creacionCreatura);

function creacionCreatura(e) {
    e.preventDefault();
    const claseSeleccionada = document.querySelector("#masterCreacion").value;
    const creaturaSeleccionado = enemigosCreaturas.find(
        (creatura) => creatura.nombre === claseSeleccionada
    );

    if (creaturaSeleccionado) {
        let contenedor = document.createElement("div");
        contenedor.className = "container mt-3 creaturaCard";

        let row = document.createElement("div");
        row.className = "row justify-content-center";

        let columna = document.createElement("div");
        columna.className = "col";

        let carta = document.createElement("div");
        carta.className = "card";
        carta.style = "width: 15vw";

        carta.innerHTML = `<img class="card-img-top" src="${creaturaSeleccionado.img}" alt="${creaturaSeleccionado.nombre}" style="width:100%">
                        <div class="card-body">
                            <h4 class="card-title">${creaturaSeleccionado.nombre}</h4>
                            <ul>
                                <li class="card-text">Vida: ${creaturaSeleccionado.vida}</li>
                                <li>Mana: ${creaturaSeleccionado.mana}</li>
                                <li>Daño: ${creaturaSeleccionado.daño}</li>
                                <li>Dinero: ${creaturaSeleccionado.dinero}</li>
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

const borrarCreatura = document.querySelector("#btnMasterBorrar");
borrarCreatura.addEventListener("click", eliminarCreatura);
function eliminarCreatura(e) {
    let borrar = document.querySelector(".creaturaCard");
    borrar.remove();
    Swal.fire({
        icon: 'warning',
        title: 'Carta eliminada',
        showConfirmButton: false,
        timer: 1700
    })
}