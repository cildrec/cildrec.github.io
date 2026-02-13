const noBtn = document.getElementById("no");
const yesBtn = document.getElementById("yes");

let yesSize = 18;
let noBtnClickCount = 0;
let clickCount = 0;
const MAX_NO_CLICKS = 5;
let letterOpened = false;
let envelopeOpen = false;
let typingTimer = null;

const messages = [
  "Are you sure? 🥺",
  "Really sure? 😭",
  "Last chance... 💔",
  "I'll cry 😔",
  "I'll cry 😔",
  "I'm your only choice now 💘",
];

const gifs = [
  "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3Z3BqZHMzMXgzZmNqMG14YWRwZ3doaGZlemU4Z283N3hlbXZlNXAwcSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/AOitRwIgx2wcOxZaIH/giphy.gif",
  "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExYmNuOGVpeDlzZWl5ejdldWVldWtyZTFzaGppNHNsM2JnMmp5aGQzbSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/dJYoOVAWf2QkU/giphy.gif",
  "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3ZG5neWQzZGhpaGN1Mmh0MzVzMmpsbTRtcjljdXh2MzdrMXJxYzh6NSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/10tIjpzIu8fe0/giphy.gif",
  "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExYmFsOW91NDA1NzMxMjNlbmx3OTdmYmttZ2ExOHdmdWI1NnB6azA2biZlcD12MV9naWZzX3NlYXJjaCZjdD1n/J93sVmfYBtsRi/giphy.gif",
  "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExYmFsOW91NDA1NzMxMjNlbmx3OTdmYmttZ2ExOHdmdWI1NnB6azA2biZlcD12MV9naWZzX3NlYXJjaCZjdD1n/N2YxIJpkEHdO2JKtMQ/giphy.gif",
];

function getMovementDistance() {
  const isMobile = window.innerWidth < 768;
  const maxX = isMobile ? 100 : 250;
  const maxY = isMobile ? 80 : 200;
  return { maxX, maxY };
}

function createHeart() {
  const heart = document.createElement("div");
  heart.className = "heart";
  heart.innerHTML = "💖";
  heart.style.left = Math.random() * 100 + "vw";
  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 4000);
}

noBtn.addEventListener("click", () => {
  if (noBtnClickCount >= MAX_NO_CLICKS) {
    yesBtn.textContent = messages[MAX_NO_CLICKS];
    noBtn.style.display = "none";
    return;
  }

  noBtnClickCount++;
  clickCount++;
  const { maxX, maxY } = getMovementDistance();
  const x = (Math.random() - 0.5) * maxX;
  const y = (Math.random() - 0.5) * maxY;
  noBtn.style.transform = `translate(${x}px, ${y}px)`;

  const btnWidth = noBtn.offsetWidth;
  const btnHeight = noBtn.offsetHeight;
  const posX = Math.random() * (window.innerWidth - btnWidth - 20);
  const posY = Math.random() * (window.innerHeight - btnHeight - 20);
  noBtn.style.position = "fixed";
  noBtn.style.left = posX + "px";
  noBtn.style.top = posY + "px";

  yesSize += 10;
  yesBtn.style.fontSize = yesSize + "px";
  yesBtn.style.padding = (10 + yesSize * 0.3) + "px";

  yesBtn.textContent = messages[(noBtnClickCount - 1) % messages.length];

  noBtn.classList.add("shake");
  setTimeout(() => noBtn.classList.remove("shake"), 400);

  if (noBtnClickCount <= MAX_NO_CLICKS) {
    const gif = document.getElementById("reactionGif");
    gif.classList.remove("show-gif");
    gif.src = gifs[(noBtnClickCount - 1) % gifs.length];
    gif.classList.add("show-gif");
  }
});

yesBtn.addEventListener("click", () => {
  document.body.style.overflowY = "auto";

  document.body.innerHTML = `
    <div class="success-section" id="successSection">
      <h1 class="success-message">YAY 💖, I knew it</h1>
      <p class="success-sub">Hold tight — opening something special...</p>
    </div>
  `;

  setTimeout(() => {
    const success = document.getElementById("successSection");
    if (!success) return;
    success.classList.add("fade-out");

    success.addEventListener(
      "animationend",
      () => {
        document.body.innerHTML = `
          <div class="letter-section">
            <div class="envelope" id="envelope">✉️</div>

            <div class="letter" id="letter">
              <h2>It ain't that much hehe 💌</h2>
              <p id="letterText" data-fulltext=
              "Happy Valentine's Day, my love.
              \nThank you for being you.
              \nI don’t say it enough, but 
              \nI’m really lucky to have you. 
              \nYou make my days better 
              \njust by being in them. 
              \nI am sorry for being too
              \nmuch to handle sometimes.
              \nI will love You and only You. "></p>
            </div>
          </div>
        `;

        const envelope = document.getElementById("envelope");
        const letter = document.getElementById("letter");
        if (envelope) {
          envelope.style.opacity = 0;
          envelope.style.transform = "translateY(20px) scale(0.9)";
          envelope.style.transition = "all 0.5s ease";
          requestAnimationFrame(() => {
            envelope.style.opacity = 1;
            envelope.style.transform = "translateY(0) scale(1)";
          });

          envelope.addEventListener("click", toggleEnvelope);
        }
      },
      { once: true }
    );
  }, 1600);
});

setInterval(createHeart, 600);

const bgAudio = new Audio("https://actions.google.com/sounds/v1/ambiences/soft_chimes.ogg");
bgAudio.loop = true;
bgAudio.volume = 0;

function fadeInAudio(target = 0.3, duration = 2000) {
  const step = 50;
  const increment = (target - bgAudio.volume) / (duration / step);
  const iv = setInterval(() => {
    bgAudio.volume = Math.min(target, bgAudio.volume + increment);
    if (bgAudio.volume >= target - 0.001) clearInterval(iv);
  }, step);
}

function fadeOutAudio(duration = 1200) {
  const step = 50;
  const decrement = (bgAudio.volume) / (duration / step);
  const iv = setInterval(() => {
    bgAudio.volume = Math.max(0, bgAudio.volume - decrement);
    if (bgAudio.volume <= 0.001) {
      bgAudio.pause();
      bgAudio.currentTime = 0;
      clearInterval(iv);
    }
  }, step);
}

function typeText(el, text, speed = 40, callback) {
  el.textContent = "";
  el.classList.add('typing-caret');
  let i = 0;
  const t = setInterval(() => {
    const ch = text[i];

    el.textContent += ch;
    i++;
    if (i >= text.length) {
      clearInterval(t);
      el.classList.remove('typing-caret');
      if (callback) callback();
    }
  }, speed);
  return t;
}

function openLetter() {
  const letter = document.getElementById("letter");
  const envelope = document.getElementById("envelope");
  const letterTextEl = document.getElementById("letterText");
  if (!letter || !envelope || !letterTextEl) return;
  if (envelopeOpen) return; 
  envelopeOpen = true;

  envelope.classList.add("open");

  bgAudio.play().catch(() => {});
  fadeInAudio(0.18, 2200);

  setTimeout(() => {
    letter.classList.add("show");

    const full = letterTextEl.getAttribute("data-fulltext") || "";
    typingTimer = typeText(letterTextEl, full, 45, () => {

      for (let i = 0; i < 6; i++) {
        setTimeout(createHeart, i * 180);
      }
      letterOpened = true;
    });
  }, 420);
}

function closeLetter() {
  const letter = document.getElementById("letter");
  const envelope = document.getElementById("envelope");
  const letterTextEl = document.getElementById("letterText");
  if (!letter || !envelope || !letterTextEl) return;

  if (typingTimer) {
    clearInterval(typingTimer);
    typingTimer = null;
  }

  letter.classList.remove("show");

  letterTextEl.textContent = "";
  letterTextEl.classList.remove('typing-caret');


  envelope.classList.remove("open");

  fadeOutAudio(800);

  envelopeOpen = false;
  letterOpened = false;
}

function toggleEnvelope() {
  if (envelopeOpen) closeLetter();
  else openLetter();

}



