const alien = document.getElementById("alien");
const consol = document.getElementById("console");
const start = document.getElementById("start");
const alienShipScreen = document.getElementById("alienShipScreen");
const gameScreen = document.getElementById("gameScreen");
const rocket = document.getElementById("rocket");
const explosion = document.getElementById("explosion");

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
    addToConsol(`You are fighting ${_AlienShip.name}!!`);
    fireRocket();
    while (_AlienShip.hull > 0 && this.hull > 0) {
      if (Math.random() < this.accuracy) {
        //check for accuracy
        _AlienShip.hull -= this.firepower; //if so attack and deduct damage from hull
        addToConsol(`${_AlienShip.name} has taken ${this.firepower} damage!`);
        if (_AlienShip.hull <= 0) {
          //check if Alienship is dead
          addToConsol(`${_AlienShip.name} has been destroyed!!`); //log if ship is dead
          removeAlienShip(); //calling the function to remove alien ship
          break; //if dead, break out of the loop
        }
      } else addToConsol(`${this.name} missed!!`);

      if (Math.random() < _AlienShip.accuracy) {
        //check for accuracy
        this.hull -= _AlienShip.firepower; //if so attack and deduct damage from hull
        addToConsol(`${this.name} has taken ${_AlienShip.firepower} damage!`);
        if (this.hull <= 0) {
          //check if your ship is dead
          addToConsol(`${this.name} has been destroyed!!`); //log if ship is dead

          break; //if dead, break out of the loop
        }
      } else addToConsol(`${_AlienShip.name} missed!!`);
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

//Instantiating alienship object from AlienShip class

alien.addEventListener("click", () => {
  const alienShip = arrayAlienShip.shift(); //removing alienship from array after user clicks on the alien ship
  ship.attack(alienShip); //calling the attack function
  rocket.style.display = "block";

  if (arrayAlienShip[0]) {
    displayStats(arrayAlienShip.at(0));
    setTimeout(checkContinue, 500);
  } else {
    // alien.style.display = "none";
    while (document.querySelector(".stats")) {
      document.querySelector(".stats").remove();
    }
    setTimeout(checkGameEnd, 500);
  }
});

//Instantiating ship object from Ship class
const ship = new Ship("USS Assembly");

function checkContinue() {
  if (
    window.confirm(
      "Alienship has been destroyed! Click OK to continue or cancel to retreat which will end the game"
    ) == false
  ) {
    alien.style.display = "none";
    addToConsol("Game has ended!!");
    toggleHideShow(start);
  } else {
    explosion.style.display = "none";
    rocket.style.display = "none";
  }
}
function checkGameEnd() {
  if (
    window.confirm(
      "All the aliens have been destroyed! Do you want to restart the game"
    ) == true
  ) {
    location.reload();
  } else addToConsol("Game has ended!!");
}

start.addEventListener("click", () => {
  const shipName = window.prompt(
    "Please enter your ship's name.",
    "USS Assembly"
  );
  if (shipName !== null && shipName !== "") ship.name = shipName; //if user'n name is not null, use that name

  if (hasGameStarted === false) {
    addToConsol(
      "Click on Alien Ship to attack it! Watch  your progress here on console!!"
    );
    createAlienShip(6); //creating 6 alien ships per specification
    hasGameStarted = true;
    toggleHideShow(start);
    alien.style.display = "block"; //showing the alien after the game has been started
  }
});

//function to show msg to ship's console
function addToConsol(msg) {
  const msgNode = document.createElement("p");
  msgNode.innerText = msg;
  consol.appendChild(msgNode);
  msgNode.scrollIntoView({ behavior: "smooth", block: "end" }); //function to auto scroll to last msg
}

//function to create a specified number of alien ships
const createAlienShip = (numOfShips) => {
  arrayAlienShip = [];

  const title = document.createElement("h4");
  title.innerText = "Alien Spaceships";
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
  alienShipScreen.lastChild.style.border = "1px solid white";

  displayStats(arrayAlienShip[0]);
};

//function to toggle any element between hide or show
function toggleHideShow(...elementID) {
  // const el = document.getElementById(elementID);
  console.log(elementID);
  for (let i = 0; i < elementID.length; i++) {
    elementID[i].style.display =
      elementID[i].style.display === "none" ? "block" : "none";
    console.log("Toggle Hide Show");
  }
}

//function to remove an alien from alien Screen
function removeAlienShip() {
  alienShipScreen.removeChild(alienShipScreen.querySelector("img"));
}

//function to display stats for both ships
function displayStats(obj) {
  while (document.querySelector(".stats")) {
    //removing any previous stats
    document.querySelector(".stats").remove();
  }

  //displaying currect stats
  const statsAlien = document.createElement("p");
  statsAlien.innerText = `Ship Name: ${obj.name}\n Hull: ${obj.hull}\n Fire Power: ${obj.firepower}\n  Accuracy: ${obj.accuracy}`;
  statsAlien.style.margin = "7vh 0 0 3vw";
  statsAlien.style.fontSize = "20px";
  statsAlien.classList.add("stats");
  gameScreen.appendChild(statsAlien);

  const statsShip = document.createElement("p");
  statsShip.innerText = `Ship Name: ${ship.name}\nHull: ${ship.hull}\n Fire Power: ${ship.firepower}\n  Accuracy: ${ship.accuracy}`;
  statsShip.style.margin = "40vh 0 0 3vw";
  statsShip.style.fontSize = "20px";
  statsShip.classList.add("stats");
  gameScreen.appendChild(statsShip);
}

function fireRocket() {
  rocket.style.display = "block";
  rocket.style.animation = "fireRocket 0.3s linear";

  rocket.addEventListener("animationend", () => {
    rocket.style.display = "none";
    rocket.style.animation = "";
    explosion.style.display = "block";
  });
}
