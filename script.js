const startButton = document.getElementById('startButton');
const popup = document.getElementById('popup');

const titleForm = document.getElementById('title-form');
const mulaiButton = document.getElementById('mulaiButton');


const usernameField = document.getElementById('username-field');
const passwordField = document.getElementById('password-field');
const pinField = document.getElementById('pin-field');

const mulaiContainer = document.getElementById('mulai-container');
const afterContainer = document.getElementById('after-container');

const textSaya = document.getElementById('text-saya');
const textDia = document.getElementById('text-dia');


const loginForm = document.getElementById('loginForm');
const loginFormButton = document.getElementById('loginFormButton');

const chatForm = document.getElementById('chatForm');

const popupLogin = document.getElementById('popup-login');
const yesButton = document.getElementById('yesButton');
const noButton = document.getElementById('noButton');
const closeButton = document.getElementById('closePopup');
const closeButtonLogin = document.getElementById('closePopupLogin');
const popupMessage = document.getElementById('popup-message');
const errorMessage = document.getElementById('errorMessage');
const loveStoryButton = document.getElementById('loveStoryButton');
const exitButton = document.getElementById('exitButton');
const exitPopup = document.getElementById('exitPopup');
const closeExitPopup = document.getElementById('closeExitPopup');

const showPopUpLogin = document.getElementById('showPopUpLogin');

let count = 0;

showPopUpLogin.addEventListener('click', () => {
  popupLogin.style.display = 'flex';
});

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

closeButtonLogin.addEventListener('click', () => {
  popupLogin.style.display = 'none';
});

// Tombol Exit
exitButton.addEventListener('click', () => {
  exitPopup.style.display = 'flex';
});

// Tombol tutup popup Exit
closeExitPopup.addEventListener('click', () => {
  exitPopup.style.display = 'none';
});


mulaiButton.addEventListener('click', () => {
  handleMulaiButton();
});

loginFormButton.addEventListener('click', (event) => {
  login()
});


const firebaseConfig = {

  apiKey: "AIzaSyDRAq8Ts-Aoy8OnRIIe3OLA3-pvpziZ214",
  authDomain: "cobainchat.firebaseapp.com",
  projectId: "cobainchat",
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

let uid = "";
let partner = "";
let chatRef;


async function handleMulaiButton() {

  const pin = pinField.value.trim();


  const credDoc = await db.collection("login").doc("credential").get();
  
  if (!credDoc.exists) return alert("Password tidak ditemukan.");
  if (credDoc.data().password !== pin) return alert("PIN salah.");

  mulaiContainer.style.display = "none";
  afterContainer.style.display = "block";
  
}
async function login() {
  const userId = usernameField.value.trim();
  const pin = passwordField.value.trim();

  const userDoc = await db.collection("users").doc(userId).get();
  if (!userDoc.exists) return alert("User tidak ditemukan.");
  if (userDoc.data().pin !== pin) return alert("PIN salah.");

  uid = userId;
  partner = (uid === "syarif") ? "nadia" : "syarif";

  
  const partnerDoc = await db.collection("users").doc(partner).get();
  

  // document.getElementById("currentUser").innerText = uid;
  // document.getElementById("partnerUser").innerText = partner;
  chatForm.style.display = "block";
  loginForm.style.display = "none";
  titleForm.innerHTML = `Cobain chat sama ${partnerDoc.data().nama}`;

  startChat();
}

function startChat() {
  const sessionId = uid < partner ? `${uid}_${partner}` : `${partner}_${uid}`;
  chatRef = db.collection("realtimeChats").doc(sessionId);

  const textarea = textSaya;
  const remoteDiv = textDia;
  textarea.disabled = false;

  chatRef.onSnapshot((doc) => {
    const data = doc.data();
    if (data && data[partner]) {
      remoteDiv.textContent = data[partner].currentText || "";
    }
  });

  textarea.addEventListener("input", () => {

      console.log("Input event triggered");
    chatRef.set({
      [uid]: {
        uid,
        currentText: textarea.value
      },
      lastUpdated: firebase.firestore.FieldValue.serverTimestamp()
    }, { merge: true });
  });
}
