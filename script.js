const startButton = document.getElementById('startButton');
const popup = document.getElementById('popup');
const yesButton = document.getElementById('yesButton');
const noButton = document.getElementById('noButton');
const closeButton = document.getElementById('closePopup');
const popupMessage = document.getElementById('popup-message');
const errorMessage = document.getElementById('errorMessage');
const loveStoryButton = document.getElementById('loveStoryButton');
const exitButton = document.getElementById('exitButton');
const exitPopup = document.getElementById('exitPopup');
const closeExitPopup = document.getElementById('closeExitPopup');

let count = 0;

// Tampilkan popup Start saat tombol Start diklik
startButton.addEventListener('click', () => {
  popup.style.display = 'flex';
  popupMessage.textContent = 'Kamu sayang aku nggak?';
  errorMessage.textContent = '';
});

// Tombol Yes
yesButton.addEventListener('click', () => {
  count++;

  if (count < 3) {
    popupMessage.textContent = `Beneran sayang? (${count})`;
    errorMessage.textContent = '';
  } else {
    popup.style.display = 'none';
    loveStoryButton.style.display = 'block';
    exitButton.style.display = 'block';
    loveStoryButton.classList.add('fade-in');
    exitButton.classList.add('fade-in');
  }
});

// Tombol No
noButton.addEventListener('click', () => {
  errorMessage.textContent = 'Kamu harus klik Yes baru bisa lanjut';
});

// Tombol tutup popup Start
closeButton.addEventListener('click', () => {
  popup.style.display = 'none';
});

// Tombol Exit
exitButton.addEventListener('click', () => {
  exitPopup.style.display = 'flex';
});

// Tombol tutup popup Exit
closeExitPopup.addEventListener('click', () => {
  exitPopup.style.display = 'none';
});
