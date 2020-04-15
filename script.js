const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

populateUi();

let ticketPrice = +movieSelect.value;

// Save selecte movie index and price
const setMovieData = (movieIndex, moviePrice) => {
  localStorage.setItem('selectedMovieIndex', movieIndex);
  // localStorage.setItem('selectedMoviePrice', moviePrice);
};

// Update total and count
const updateSelectedCount = () => {
  const selecetedSeats = document.querySelectorAll('.row .seat.selected');

  // Get the array of selected seats
  const seatsIndex = [...selecetedSeats].map((seat) =>
    [...seats].indexOf(seat)
  );

  // Save the selected seats to local storage
  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

  // Update the price
  const selecetedSeatsCount = selecetedSeats.length;
  count.innerText = selecetedSeatsCount;
  total.innerText = selecetedSeatsCount * ticketPrice;
};

// Get data from local storage and populate the UI
function populateUi() {
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add('selected');
      }
    });
  }

  const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}

// Select seats
container.addEventListener('click', (e) => {
  const seat = e.target.classList;
  if (seat.contains('seat') && !seat.contains('occupied')) {
    seat.toggle('selected');
    updateSelectedCount();
  }
});

// Update ticket price
movieSelect.addEventListener('change', (e) => {
  ticketPrice = +e.target.value;
  localStorage.setItem('selectedMovieIndex', e.target.selectedIndex);
  updateSelectedCount();
});

// Initial count and total
updateSelectedCount();
