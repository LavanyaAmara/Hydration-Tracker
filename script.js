const liters = document.getElementById('liters');
const percentage = document.getElementById('percentage');
const remained = document.getElementById('remained');
const goalSelect = document.getElementById('goal');
const goalDisplay = document.getElementById('goal-display');
const cupsContainer = document.getElementById('cups');

let waterGoal = parseFloat(goalSelect.value); // in Liters
const cupVolume = 0.25; // 250ml
let smallCups = [];

goalSelect.addEventListener('change', () => {
  waterGoal = parseFloat(goalSelect.value);
  goalDisplay.innerText = waterGoal;
  generateCups(); // regenerate cups
  updateBigCup(); // update display
});

function generateCups() {
  const totalCups = Math.round(waterGoal / cupVolume);
  cupsContainer.innerHTML = ''; // Clear old cups

  for (let i = 0; i < totalCups; i++) {
    const cup = document.createElement('div');
    cup.classList.add('cup', 'cup-small');
    cup.innerText = '250 ml';
    cup.addEventListener('click', () => highlightCups(i));
    cupsContainer.appendChild(cup);
  }

  smallCups = document.querySelectorAll('.cup-small');
}

function highlightCups(idx) {
  if (
    smallCups[idx].classList.contains('full') &&
    (!smallCups[idx].nextElementSibling || !smallCups[idx].nextElementSibling.classList.contains('full'))
  ) {
    idx--;
  }

  smallCups.forEach((cup, i) => {
    if (i <= idx) cup.classList.add('full');
    else cup.classList.remove('full');
  });

  updateBigCup();
}

function updateBigCup() {
  const fullCups = document.querySelectorAll('.cup-small.full').length;
  const totalCups = smallCups.length;
  const consumed = fullCups * cupVolume;

  if (fullCups === 0) {
    percentage.style.visibility = 'hidden';
    percentage.style.height = 0;
  } else {
    percentage.style.visibility = 'visible';
    percentage.style.height = `${(consumed / waterGoal) * 330}px`;
    percentage.innerText = `${Math.min((consumed / waterGoal) * 100, 100).toFixed(0)}%`;
  }

  if (consumed >= waterGoal) {
    remained.style.visibility = 'hidden';
    remained.style.height = 0;
  } else {
    remained.style.visibility = 'visible';
    liters.innerText = `${(waterGoal - consumed).toFixed(2)}L`;
  }
}

// Initial setup
generateCups();
updateBigCup();
