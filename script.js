let hunger = 100;
let fun = 100;
let hygiene = 100;
let age = 0;
let poopCount = 0;
let alive = true;
let interval;

const hungerBar = document.getElementById('hunger-bar');
const funBar = document.getElementById('fun-bar');
const hygieneBar = document.getElementById('hygiene-bar');

const ageEl = document.getElementById('age');
const messageEl = document.getElementById('message');
const petImage = document.getElementById('pet-image');
const poopContainer = document.getElementById('poop-container');

function getImageForAge(age) {
  if (age < 1) return "huevo.jpg";
  if (age < 2) return "recien nacido.jpg";
  if (age < 4) return "pollito niño.jpg";
  if (age < 6) return "pollito adolecente.jpg";
  if (age < 10) return "pollito adulto joven.jpg";
  return "gallina.jpg";
}

function startGame() {
  hunger = 100;
  fun = 100;
  hygiene = 100;
  age = 0;
  poopCount = 0;
  alive = true;
  poopContainer.innerHTML = '';
  clearInterval(interval);
  interval = setInterval(gameLoop, 5000);
  updateUI("¡Cuidame!");
}

function updateUI(optionalMessage = "") {
  hungerBar.style.width = `${hunger}%`;
  funBar.style.width = `${fun}%`;
  hygieneBar.style.width = `${hygiene}%`;
  ageEl.textContent = Math.floor(age);
  petImage.src = getImageForAge(age);

  if (!alive) {
    petImage.src = "";
    messageEl.textContent = '💀 ¡Tu pollito ha muerto!';
    return;
  }

  if (hunger < 30 || fun < 30 || hygiene < 30) {
    messageEl.textContent = '¡Estoy triste!';
  } else if (age >= 10) {
    messageEl.textContent = '¡Ya soy una gallina!';
  } else if (age >= 5) {
    messageEl.textContent = '¡Estoy creciendo!';
  } else {
    messageEl.textContent = optionalMessage;
  }
}

function feed() {
  if (!alive) return;
  hunger = Math.min(hunger + 15, 100);
  hygiene = Math.max(hygiene - 5, 0);
  poop();
  updateUI("¡Gracias por la comida!");
}

function play() {
  if (!alive) return;
  fun = Math.min(fun + 15, 100);
  hunger = Math.max(hunger - 5, 0);
  updateUI("¡Qué divertido!");
}

function clean() {
  if (!alive) return;
  hygiene = Math.min(hygiene + 20, 100);
  poopContainer.innerHTML = '';
  poopCount = 0;
  updateUI("¡Todo limpio!");
}
function gameLoop() {
  if (!alive) return;

  hunger = Math.max(hunger - 1, 0);
  fun = Math.max(fun - 1, 0);
  hygiene = Math.max(hygiene - 0.5, 0);
  age += 0.2;

  if (hunger <= 0 || fun <= 0 || hygiene <= 0) {
    alive = false;
    clearInterval(interval);
  }

  updateUI();
}

function restartGame() {
  startGame();
}

startGame();
function saveGame() {
  const data = {
    hunger,
    fun,
    hygiene,
    age,
    poopCount,
    alive
  };
  localStorage.setItem('pollitoTamagochi', JSON.stringify(data));
}

function loadGame() {
  const saved = localStorage.getItem('pollitoTamagochi');
  if (saved) {
    const data = JSON.parse(saved);
    hunger = data.hunger;
    fun = data.fun;
    hygiene = data.hygiene;
    age = data.age;
    poopCount = data.poopCount;
    alive = data.alive;
    return true;
  }
  return false;
}
function feed() {
  if (!alive) return;
  hunger = Math.min(hunger + 15, 100);
  hygiene = Math.max(hygiene - 5, 0);
  poop();
  updateUI("¡Gracias por la comida!");
  saveGame();
}

function play() {
  if (!alive) return;
  fun = Math.min(fun + 15, 100);
  hunger = Math.max(hunger - 5, 0);
  updateUI("¡Qué divertido!");
  saveGame();
}

function clean() {
  if (!alive) return;
  hygiene = Math.min(hygiene + 20, 100);
  poopContainer.innerHTML = '';
  poopCount = 0;
  updateUI("¡Todo limpio!");
  saveGame();
}
function restartGame() {
  localStorage.removeItem('pollitoTamagochi');
  startGame();
}
