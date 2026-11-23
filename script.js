// ==========================================
// 1. KONFIGURASI PESAN (EDIT BAGIAN INI)
// ==========================================
const CONFIG = {
  namaDia: "Syakila", // Ganti dengan nama panggilan dia
  namaKamu: "hanif", // Ganti dengan nama kamu
  nomorWA: "6281359327583", // Ganti dengan nomor WA kamu (awali dengan 62)
  isiSurat: `Jujur, udah cukup lama aku nyimpen perasaan ini sendirian.\n\nSetiap kali aku ketemu sama kamu, hari-hariku rasanya selalu jauh lebih ringan dan seru. Aku nyaman banget sama cara kamu ketawa dan semua hal kecil tentang kamu.\n\nAku nggak mau cuma sekadar jadi pengagum mu...`,
  pertanyaan: "Maukah kamu jadi pacar aku?",
  pesanBalasanWA: "Hai, aku udah baca suratnya. Quest diterima, aku mau!",
};

// Terapkan konfigurasi ke tampilan
document.getElementById("letterTitle").textContent =
  `TO: ${CONFIG.namaDia.toUpperCase()}`;
document.getElementById("questionText").textContent = CONFIG.pertanyaan;
document.getElementById("successDesc").textContent =
  `Makasih ya ${CONFIG.namaDia}, sudah mau nerima ${CONFIG.namaKamu}. Mulai hari ini, petualangan kita resmi dimulai!`;
document.getElementById("waLink").href =
  `https://wa.me/${CONFIG.nomorWA}?text=${encodeURIComponent(CONFIG.pesanBalasanWA)}`;

// ==========================================
// 2. GAMBAR BUNGA MAWAR PIXEL ART (SVG)
// ==========================================
// SVG Mawar lengkap dengan batang & daun (untuk taman di bawah)
const PIXEL_ROSE_PLANT_SVG = `
<svg viewBox="0 0 12 19" width="100%" height="100%" shape-rendering="crispEdges">
  <!-- Kelopak Mawar -->
  <rect x="4" y="1" width="4" height="1" fill="#ff758f"/>
  <rect x="3" y="2" width="6" height="1" fill="#e63946"/>
  <rect x="2" y="3" width="8" height="2" fill="#e63946"/>
  <rect x="4" y="3" width="2" height="1" fill="#ff8fa3"/>
  <rect x="6" y="4" width="2" height="1" fill="#9b1c26"/>
  <rect x="3" y="5" width="6" height="2" fill="#c9184a"/>
  <rect x="4" y="7" width="4" height="1" fill="#9b1c26"/>
  <!-- Daun Kelopak Bawah -->
  <rect x="3" y="8" width="2" height="1" fill="#2b9348"/>
  <rect x="7" y="8" width="2" height="1" fill="#2b9348"/>
  <!-- Batang -->
  <rect x="5" y="8" width="2" height="11" fill="#55a630"/>
  <!-- Daun Kiri & Kanan -->
  <rect x="2" y="11" width="3" height="2" fill="#55a630"/>
  <rect x="1" y="12" width="2" height="1" fill="#80b918"/>
  <rect x="7" y="13" width="3" height="2" fill="#55a630"/>
  <rect x="9" y="14" width="2" height="1" fill="#80b918"/>
</svg>`;

// SVG Kuntum Mawar Mini (untuk partikel melayang)
const PIXEL_ROSE_BUD_SVG = `
<svg viewBox="0 0 10 9" width="22" height="20" shape-rendering="crispEdges">
  <rect x="3" y="0" width="4" height="1" fill="#ff758f"/>
  <rect x="2" y="1" width="6" height="1" fill="#e63946"/>
  <rect x="1" y="2" width="8" height="2" fill="#e63946"/>
  <rect x="3" y="2" width="2" height="1" fill="#ff8fa3"/>
  <rect x="2" y="4" width="6" height="2" fill="#c9184a"/>
  <rect x="3" y="6" width="4" height="1" fill="#9b1c26"/>
  <rect x="2" y="7" width="6" height="1" fill="#2b9348"/>
  <rect x="4" y="8" width="2" height="1" fill="#55a630"/>
</svg>`;

// Buat barisan taman mawar pixel di bagian bawah layar
function buildRoseGarden() {
  const garden = document.getElementById("pixelGarden");
  const count = Math.max(5, Math.floor(window.innerWidth / 85));
  garden.innerHTML = "";
  for (let i = 0; i < count; i++) {
    const rose = document.createElement("div");
    rose.className = "pixel-rose-plant";
    rose.innerHTML = PIXEL_ROSE_PLANT_SVG;
    garden.appendChild(rose);
  }
}
buildRoseGarden();
window.addEventListener("resize", buildRoseGarden);

// ==========================================
// 3. PARTIKEL MAWAR & HATI MELAYANG
// ==========================================
function createFloatingElements() {
  const container = document.getElementById("floatingHearts");
  setInterval(() => {
    const el = document.createElement("div");
    el.className = "heart-particle";

    // Bergantian memunculkan kuntum mawar pixel & simbol hati pixel
    if (Math.random() > 0.45) {
      el.innerHTML = PIXEL_ROSE_BUD_SVG;
    } else {
      el.textContent = "♥";
      el.style.fontSize = Math.random() * 10 + 14 + "px";
    }

    el.style.left = Math.random() * 96 + "vw";
    el.style.animationDuration = Math.random() * 5 + 7 + "s";
    container.appendChild(el);
    setTimeout(() => el.remove(), 12000);
  }, 600);
}
createFloatingElements();

// ==========================================
// 4. AUDIO CHIPTUNE 8-BIT (WEB AUDIO API)
// ==========================================
function playChiptuneMelody() {
  const AudioCtx = window.AudioContext || window.webkitAudioContext;
  const ctx = new AudioCtx();
  const notes = [261.63, 329.63, 392.0, 523.25, 493.88, 392.0, 329.63, 293.66];
  let step = 0;

  setInterval(() => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "square";
    osc.frequency.setValueAtTime(notes[step % notes.length], ctx.currentTime);

    gain.gain.setValueAtTime(0.03, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.45);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.45);
    step++;
  }, 500);
}

// ==========================================
// 5. BUKA AMPLOP & EFEK MESIN TIK RPG
// ==========================================
function openLetter() {
  playChiptuneMelody();
  document.getElementById("envelope").classList.add("open");

  setTimeout(() => {
    document.getElementById("envelopeWrapper").style.display = "none";
    document.getElementById("letterCard").style.display = "block";
    typeWriter(CONFIG.isiSurat, 0);
  }, 450);
}

function typeWriter(text, index) {
  const target = document.getElementById("typewriterText");
  if (index < text.length) {
    target.textContent += text.charAt(index);
    setTimeout(() => typeWriter(text, index + 1), 35);
  } else {
    document.getElementById("questionBox").classList.add("visible");
  }
}

// ==========================================
// 6. TOMBOL PENOLAKAN MENGHINDAR
// ==========================================
let dodgeCount = 0;
const funnyLines = [
  "MISS! Nggak kena!",
  "Error 404: Jawaban ditolak tidak ditemukan.",
  "Tombol ini dikunci sama sistem!",
  "Pilih yang merah aja biar quest selesai.",
  "Udah nggak bisa kabur lagi!",
];

function dodgeButton() {
  const btnNo = document.getElementById("btnNo");
  const btnYes = document.getElementById("btnYes");
  const msg = document.getElementById("funnyMsg");

  const maxX = window.innerWidth - btnNo.offsetWidth - 30;
  const maxY = window.innerHeight - btnNo.offsetHeight - 100;
  const randomX = Math.max(20, Math.floor(Math.random() * maxX));
  const randomY = Math.max(20, Math.floor(Math.random() * maxY));

  btnNo.style.position = "fixed";
  btnNo.style.left = randomX + "px";
  btnNo.style.top = randomY + "px";
  btnNo.style.zIndex = "50";

  dodgeCount++;
  const scale = Math.min(1 + dodgeCount * 0.1, 1.6);
  btnYes.style.transform = `scale(${scale})`;

  msg.textContent = funnyLines[(dodgeCount - 1) % funnyLines.length];
}

function acceptConfession() {
  document.getElementById("letterCard").style.display = "none";
  document.getElementById("btnNo").style.display = "none";
  document.getElementById("successScreen").style.display = "block";
  launchPixelConfetti();
}

function launchPixelConfetti() {
  const canvas = document.getElementById("confetti-canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const pieces = [];
  const colors = ["#e63946", "#ff758f", "#ffd166", "#06d6a0", "#4cc9f0"];

  for (let i = 0; i < 120; i++) {
    pieces.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      size: 10,
      color: colors[Math.floor(Math.random() * colors.length)],
      speedY: Math.random() * 4 + 2,
      speedX: Math.random() * 2 - 1,
    });
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pieces.forEach((p) => {
      ctx.fillStyle = p.color;
      ctx.fillRect(Math.floor(p.x), Math.floor(p.y), p.size, p.size);

      p.y += p.speedY;
      p.x += p.speedX;
      if (p.y > canvas.height) p.y = -10;
    });
    requestAnimationFrame(draw);
  }
  draw();
}
