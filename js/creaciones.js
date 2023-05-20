class Personaje {
    constructor(nombre, vida, daño, dinero, mana, img) {
        this.nombre = nombre
        this.vida = vida
        this.mana = mana
        this.daño = daño
        this.dinero = dinero
        this.img = img
    }
}

const clasesAventurero = []

clasesAventurero.push(new Personaje("Paladin", 1000, 20, 20, 50, "../img/aventurero/paladin.jpg"))
clasesAventurero.push(new Personaje("Mago", 300, 100, 20, 100, "../img/aventurero/mago.jpg"))
clasesAventurero.push(new Personaje("Arquero", 500, 30, 40, 50, "../img/aventurero/arquero.jpg"))
clasesAventurero.push(new Personaje("Ladron", 200, 50, 80, 150, "../img/aventurero/ladron.jpg"))

const enemigosCreaturas = []

enemigosCreaturas.push(new Personaje("Goblin", 100, 0, 10, 10, "../img/master/goblin.jpg"))
enemigosCreaturas.push(new Personaje("Orco", 550, 0, 100, 50, "../img/master/orco.jpg"))
enemigosCreaturas.push(new Personaje("Mago orco", 350, 180, 170, 100, "../img/master/magoOrco.jpg"))