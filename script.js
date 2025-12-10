// ====================== PRELOADER & TAHUN ======================
window.onload = () => {
    document.getElementById("year").textContent = new Date().getFullYear();
    newQuestion();
    newEnglishWord();
};

const menuBtn = document.getElementById("menuBtn");
const menu = document.getElementById("menu");

menuBtn.addEventListener("click", () => {
    menu.classList.toggle("show");
});

// ====================== RESPONSIVE CANVAS RESIZE ======================
window.addEventListener("resize", () => {
    setupRain();
    setupStars();
});

// ====================== RAIN EFFECT ======================
const rainCanvas = document.getElementById("rainCanvas");
const rainCtx = rainCanvas.getContext("2d");
let rainDrops = [];

function setupRain() {
    rainCanvas.width = innerWidth;
    rainCanvas.height = innerHeight;

    rainDrops = [...Array(120)].map(() => ({
        x: Math.random() * innerWidth,
        y: Math.random() * innerHeight,
        length: Math.random() * 20 + 10,
        speed: Math.random() * 4 + 4,
    }));
}

function animateRain() {
    rainCtx.clearRect(0, 0, rainCanvas.width, rainCanvas.height);
    rainCtx.strokeStyle = "rgba(148,212,255,0.7)";
    rainCtx.lineWidth = 2;

    rainDrops.forEach((drop) => {
        rainCtx.beginPath();
        rainCtx.moveTo(drop.x, drop.y);
        rainCtx.lineTo(drop.x, drop.y + drop.length);
        rainCtx.stroke();

        drop.y += drop.speed;
        if (drop.y > rainCanvas.height) drop.y = -10;
    });

    requestAnimationFrame(animateRain);
}

setupRain();
animateRain();

// ====================== STAR BACKGROUND ======================
const starCanvas = document.getElementById("starCanvas");
const starCtx = starCanvas.getContext("2d");
let stars = [];

function setupStars() {
    starCanvas.width = innerWidth;
    starCanvas.height = innerHeight;

    stars = [...Array(150)].map(() => ({
        x: Math.random() * innerWidth,
        y: Math.random() * innerHeight,
        size: Math.random() * 2,
    }));
}

function drawStars() {
    starCtx.clearRect(0, 0, starCanvas.width, starCanvas.height);
    starCtx.fillStyle = "#ffffff";

    stars.forEach((star) => {
        starCtx.beginPath();
        starCtx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        starCtx.fill();
    });
}

setupStars();
setInterval(drawStars, 50);

// ====================== GAME MATEMATIKA ======================
let num1, num2;
let score = 0;

function newQuestion() {
    num1 = Math.floor(Math.random() * 20) + 1;
    num2 = Math.floor(Math.random() * 20) + 1;
    document.getElementById("question").innerText = `${num1} + ${num2} = ?`;
}

function checkAnswer() {
    let userAns = document.getElementById("answer").value;

    if (userAns == num1 + num2) {
        score++;
        playCorrect();
    } else {
        playWrong();
    }

    document.getElementById("score").innerText = score;
    document.getElementById("answer").value = "";
    newQuestion();
}

// ====================== GAME ENGLISH ======================
const words = {
    apple: "apel",
    cat: "kucing",
    house: "rumah",
    water: "air",
    book: "buku",
};

let engScore = 0;
let currentWord;

function newEnglishWord() {
    const list = Object.keys(words);
    currentWord = list[Math.floor(Math.random() * list.length)];
    document.getElementById("word").innerText = `Translate: ${currentWord}`;
}

function checkEnglish() {
    let userInput = document.getElementById("engAnswer").value.toLowerCase();

    if (userInput === words[currentWord]) {
        engScore++;
        playCorrect();
    } else {
        playWrong();
    }

    document.getElementById("engScore").innerText = engScore;
    document.getElementById("engAnswer").value = "";
    newEnglishWord();
}

// ====================== SOUND FX ======================
function playCorrect() {
    new Audio(
        "https://cdn.pixabay.com/audio/2022/03/15/audio_4319457488.mp3"
    ).play();
}

function playWrong() {
    new Audio(
        "https://cdn.pixabay.com/audio/2022/03/15/audio_4895243725.mp3"
    ).play();
}

// ====================== EXIT GAME ======================
function exitGame() {
    alert("Game ditutup 🎮. Terima kasih sudah bermain!");
    document.getElementById("game").style.display = "none";
}
// === SIMPAN DATA KE LOCAL STORAGE ===
function simpanData() {
    let nama = document.getElementById("nama").value;
    let alamat = document.getElementById("alamat").value;
    let umur = document.getElementById("umur").value;
    let email = document.getElementById("email").value;
    let tanggal = document.getElementById("tanggal").value;

    if (!nama || !alamat || !umur || !email || !tanggal) {
        alert("Harap isi semua data!");
        return;
    }

    let data = {
        nama: nama,
        alamat: alamat,
        umur: umur,
        email: email,
        tanggal: tanggal,
    };

    let daftar = JSON.parse(localStorage.getItem("pengunjung")) || [];
    daftar.push(data);

    localStorage.setItem("pengunjung", JSON.stringify(daftar));

    alert("Data berhasil disimpan!");
    tampilkanData();

    document.getElementById("nama").value = "";
    document.getElementById("alamat").value = "";
    document.getElementById("umur").value = "";
    document.getElementById("email").value = "";
    document.getElementById("tanggal").value = "";
}

// === TAMPILKAN DATA ===
function tampilkanData() {
    let daftar = JSON.parse(localStorage.getItem("pengunjung")) || [];
    let tabel = document.getElementById("tabelPengunjung");

    tabel.innerHTML = "";

    daftar.forEach((p) => {
        tabel.innerHTML += `
            <tr>
                <td>${p.nama}</td>
                <td>${p.alamat}</td>
                <td>${p.umur}</td>
                <td>${p.email}</td>
                <td>${p.tanggal}</td>
            </tr>
        `;
    });
}

// === RESET DATA ===
function resetData() {
    if (confirm("Apakah yakin ingin menghapus semua data?")) {
        localStorage.removeItem("pengunjung");
        tampilkanData();
    }
}

// === LOAD SAAT PAGE DIBUKA ===
document.addEventListener("DOMContentLoaded", tampilkanData);