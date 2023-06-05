function obtenerCartasLocalStorage(key) {
    let cartas = JSON.parse(localStorage.getItem(key)) || [];
    return cartas;
}

function mostrarCartas(cartas, contenedorClass, btnClass, atacarFunc) {
    const contenedor = document.createElement("div");
    contenedor.className = contenedorClass + " mt-3";

    for (let i = 0; i < cartas.length; i++) {
        const carta = cartas[i];

        const row = document.createElement("div");
        row.className = "row";

        const columna = document.createElement("div");
        columna.className = "col";

        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
        <img class="card-img-top" src="${carta.img}" alt="${carta.nombre}" style="width:100%">
        <div class="card-body">
            <h4 class="card-title">${carta.nombre}</h4>
            <ul>
                <li class="card-text">Vida: ${carta.vida}</li>
                <li>Mana: ${carta.mana}</li>
                <li>Daño: ${carta.daño}</li>
                <li>Dinero: ${carta.dinero}</li>
            </ul>
        </div>
        <button type="button" class="btn btn-dark ${btnClass}">Atacar</button>`;

        columna.appendChild(card);
        row.appendChild(columna);
        contenedor.appendChild(row);
    }

    const contenedorCartas = document.querySelector("." + contenedorClass);
    contenedorCartas.appendChild(contenedor);

    const botonesAtacar = contenedor.querySelectorAll("." + btnClass);
    botonesAtacar.forEach((boton) => {
        boton.addEventListener("click", () => atacarFunc(boton.parentNode.parentNode));
    });
}

function atacarAventurero() {
    console.log("Aventurero: ataca");
}

function atacarCreatura() {
    console.log("Creatura: ataca");
}

window.addEventListener("DOMContentLoaded", () => {
    const cartasAventurero = obtenerCartasLocalStorage("aventurero");
    mostrarCartas(cartasAventurero, "cartasAventurero", "btnAventureroAtacar", atacarAventurero);

    const cartasMaster = obtenerCartasLocalStorage("creatura");
    mostrarCartas(cartasMaster, "cartasMaster", "btnCreaturaAtacar", atacarCreatura);
});
