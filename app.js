const alien = document.getElementById("alien");
const consol = document.getElementById("console");
const start = document.getElementById("start");
const alienShipScreen = document.getElementById("alienShipScreen");

let arrayAlienShip = [];
let hasGameStarted = false;

//class to create a ship
class Ship {
  constructor(name) {
    this.name = name;
    this.hull = 20;
    this.firepower = 5;
    this.accuracy = 0.7;
    this.attack = this.attack.bind(this);
  }

  //function to attack the alienship and alienship attacks back
  attack(_AlienShip) {
    //attack while both ships are alive
    addToConsol(`You are fighting ${_AlienShip.name}, prepare for battle!!`);
    while (_AlienShip.hull > 0 && this.hull > 0) {
      if (Math.random() < this.accuracy) {
        //check for accuracy
        _AlienShip.hull -= this.firepower; //if so attack and deduct damage from hull
        if (_AlienShip.hull <= 0) {
          //check if Alienship is dead
          addToConsol(`${_AlienShip.name} has been destroyed!!`); //log if ship is dead
          removeAlienShip();
          break; //if dead, break out of the loop
        }
      }

      if (Math.random() < _AlienShip.accuracy) {
        //check for accuracy
        this.hull -= _AlienShip.firepower; //if so attack and deduct damage from hull
        if (this.hull <= 0) {
          //check if your ship is dead
          addToConsol(`${this.name} has been destroyed!!`); //log if ship is dead
          break; //if dead, break out of the loop
        }
      }
      console.log("Attacking Again!!");
    }
  }
}

//class to create an alienship that extends ship class
class AlienShip extends Ship {
  constructor(name) {
    super(name);
    this.name = name;
    this.hull = Math.floor(Math.random() * 4) + 3;
    this.firepower = Math.floor(Math.random() * 3) + 2;
    this.accuracy = (Math.floor(Math.random() * 3) + 6) / 10;
  }
}

//Instantiating ship object from Ship class
const ship = new Ship("USS Admiral");
//Instantiating alienship object from AlienShip class

alien.addEventListener("click", () => {
  const alienShip = arrayAlienShip.shift();
  ship.attack(alienShip);
  delete alienShip;
});

start.addEventListener("click", () => {
  if (hasGameStarted === false) {
    addToConsol("Game has started!!");
    createAlienShip(5);
    hasGameStarted = true;
    toggleHideShow(start);
    alien.style.display = "block";
  }
});

function addToConsol(msg) {
  const msgNode = document.createElement("p");
  msgNode.innerText = msg;
  consol.appendChild(msgNode);
}

const createAlienShip = (numOfShips) => {
  arrayAlienShip = [];

  const title = document.createElement("h4");
  title.innerText = "Alien Spaceships have arrived!!";
  alienShipScreen.appendChild(title);

  for (let i = 1; i <= numOfShips; i++) {
    const alienShip = new AlienShip("AlienShip #" + i);
    arrayAlienShip.push(alienShip);
    const alienShipImage = document.createElement("img");
    alienShipImage.src = "./alien1.png";
    alienShipImage.width = "200";
    alienShipImage.height = "100";
    alienShipScreen.appendChild(alienShipImage);
  }
  addToConsol("Ships created!!");
};

function toggleHideShow(...elementID) {
  // const el = document.getElementById(elementID);
  for (let i = 0; i < elementID.length; i++) {
    elementID[i].style.display =
      elementID[i].style.diplay === "none" ? "block" : "none";
  }
}

function removeAlienShip() {
  alienShipScreen.removeChild(alienShipScreen.querySelector("img"));
}
