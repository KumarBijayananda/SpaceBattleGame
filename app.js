class Ship {
  constructor(name) {
    this.name = name;
    this.hull = 20;
    this.firepower = 5;
    this.accuracy = 0.7;
  }

  attack(_AlienShip) {
    _AlienShip.hull -= this.firepower;
    console.log("AlienShip's health is: " + _AlienShip.hull);
    while (_AlienShip.hull > 0) {
      this.hull -= _AlienShip.firepower;
      _AlienShip.hull -= this.firepower;
    }
    console.log(`${_AlienShip.name} has been destroyed!!`);
  }
}

class AlienShip extends Ship {
  constructor(name) {
    super(name);
    this.name = name;
    this.hull = Math.floor(Math.random() * 4) + 3;
    this.firepower = Math.floor(Math.random() * 3) + 2;
    this.accuracy = (Math.floor(Math.random() * 3) + 6) / 10;
  }
}

const ship = new Ship("USS Admiral");

const alienShip = new AlienShip("Dark Vader");

ship.attack(alienShip);
