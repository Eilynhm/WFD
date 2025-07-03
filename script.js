/*profile page*/

document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.querySelectorAll(".tab-btn");
  const contents = document.querySelectorAll(".tab-content");

  buttons.forEach(button => {
    button.addEventListener("click", function () {
      const target = this.getAttribute("data-tab");

      // Retirer tous les "active"
      buttons.forEach(btn => btn.classList.remove("active"));
      contents.forEach(content => content.classList.remove("active"));

      // Ajouter la classe active au bouton cliqué et au contenu correspondant
      this.classList.add("active");
      document.getElementById(target).classList.add("active");
    });
  });
});



/*hearth full js */

document.addEventListener("DOMContentLoaded", function () {
  const heartIcons = document.querySelectorAll(".heart-icon");

  heartIcons.forEach(icon => {
    icon.addEventListener("click", function () {
      const isFilled = icon.src.includes("heart-filled.png");

      if (isFilled) {
        icon.src = "images/heart.png";
      } else {
        icon.src = "images/heart-filled.png";
      }
    });
  });
});

//HI basel we will need to add fetch to later add the liked/saved recipe to the user's profile


/* recipe page */


document.addEventListener("DOMContentLoaded", function () {
  let count = 1;

  function updateDisplay() {
    const label = count > 1 ? "people" : "person";
    const countElem = document.getElementById("count");
    if (!countElem) {
      console.warn('Élément #count non trouvé !');
      return;
    }
    countElem.innerText = `${count} ${label}`;
    updateIngredients();
  }

  function increase() {
    count++;
    updateDisplay();
  }

  function decrease() {
    if (count > 1) {
      count--;
      updateDisplay();
    }
  }

  function updateIngredients() {
    const quantities = document.querySelectorAll('.quantity');
    quantities.forEach(qty => {
      const base = parseFloat(qty.dataset.base);
      const newValue = base * count;

      if (qty.innerText.includes("g")) {
        qty.innerText = `${newValue}g`;
      } else if (qty.innerText.includes("ml")) {
        qty.innerText = `${newValue}ml`;
      } else {
        qty.innerText = `${newValue}`;
      }
    });
  }

  // Rattache les boutons aux fonctions
  const buttons = document.querySelectorAll('.counter button');
  if (buttons.length === 2) {
    buttons[0].addEventListener('click', increase);
    buttons[1].addEventListener('click', decrease);
  }

  // Appel initial pour afficher correctement
  updateDisplay();
});



/*full strars */

function setupStarRating(containerId, options = {}) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const stars = container.querySelectorAll('.star');
  let currentRating = options.initialRating || 0;

  function updateStars(rating = currentRating) {
    stars.forEach((star, index) => {
      star.src = index < rating ? 'images/star-full.png' : 'images/star-empty.png';
    });
  }

  if (options.readOnly) {
    container.classList.add('read-only');
  } else {
    stars.forEach((star, index) => {
      star.addEventListener('click', () => {
        currentRating = index + 1;
        updateStars();

        // Bonus : affiche la note si tu as un élément #user-rating-value
        const ratingText = document.getElementById('user-rating-value');
        if (ratingText) {
          ratingText.innerText = `${currentRating}/5`;
        }
      });

      star.addEventListener('mouseenter', () => updateStars(index + 1));
      star.addEventListener('mouseleave', () => updateStars());
    });
  }

  updateStars();
}

// Call both groups
setupStarRating('rating-stars-general', { readOnly: true, initialRating: 4 });
setupStarRating('rating-stars-user');


 //HI Basel we will need to add fetch to the user stars function to send his rate for later change the general rate


 /*statistics page*/


document.addEventListener('DOMContentLoaded', () => {
  // Graphique en barres
  const ctxBar = document.getElementById('barChart').getContext('2d');
  const barChart = new Chart(ctxBar, {
    type: 'bar',
    data: {
      labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai'],
      datasets: [{
        label: 'Visites',
        data: [150, 200, 180, 220, 170],
        backgroundColor: '#BAD6DA',
        borderRadius: 5,
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });

  // Camembert (Pie Chart)
const ctxPie = document.getElementById('pieChart')?.getContext('2d');
  if (ctxPie) {
    const pieChart = new Chart(ctxPie, {
      type: 'pie',
      data: {
        labels: ['Gluten free recipes ', 'Italian recipes', 'Desserts recipes', 'Summer drinks recipes'],
        datasets: [{
          label: 'Catégories',
          data: [45, 25, 15, 15],
          backgroundColor: [
            '#FFC98B',
            '#FFB284',
            '#E79796',
            '#C6C09C'
          ],
          hoverOffset: 30
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              color: '#333',         // couleur du texte
              font: {
                size: 18,            // taille du texte
                family: 'DM Serif Text' // ou ta police
              }
            }
          }
        }
      }
    });
  }
});



/* overlay--> */

document.getElementById('openProfileEdit').addEventListener('click', () => {
  document.getElementById('profileOverlay').classList.remove('hidden');
});

document.getElementById('closeProfileEdit').addEventListener('click', () => {
  document.getElementById('profileOverlay').classList.add('hidden');
});

// Optionnel : fermer l'overlay en cliquant à l'extérieur de la box
document.getElementById('profileOverlay').addEventListener('click', e => {
  if (e.target === e.currentTarget) {
    e.currentTarget.classList.add('hidden');
  }
});
