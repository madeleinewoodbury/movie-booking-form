const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

let ticketPrice = +movieSelect.value;

// Update total and count
const updateSelectedCount = () => {
  const selecetedSeats = document.querySelectorAll('.row .seat.selected');
  const selecetedSeatsCount = selecetedSeats.length;

  count.innerText = selecetedSeatsCount;
  total.innerText = selecetedSeatsCount * ticketPrice;
};

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
  updateSelectedCount();
});
