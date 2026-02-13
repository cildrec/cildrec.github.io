// DOM Elements
const noBtn = document.getElementById("no");
const yesBtn = document.getElementById("yes");

// Game state
let yesSize = 18;
let noBtnClickCount = 0;
let clickCount = 0;
const MAX_NO_CLICKS = 5;

// Messages for no button
const messages = [
  "Are you sure? 🥺",
  "Really sure? 😭",
  "Last chance... 💔",
  "Please say yes 😢",
  "I'll cry 😔",
    "I'm your only choice now 💘"
];

// Reaction GIFs
const gifs = [
  "https://media.giphy.com/media/l1J9u3TZfpmeDLkD6/giphy.gif",
  "https://media.giphy.com/media/11tTNkNy1SdXGg/giphy.gif",
  "https://media.giphy.com/media/3o6ZtaO9BZHcOjmErm/giphy.gif",
  "https://media.giphy.com/media/26ufdipQqU2lhNA4g/giphy.gif",
  "https://media.giphy.com/media/5GoVLqeAOo6PK/giphy.gif"
];

// Calculate responsive movement distance based on screen size
function getMovementDistance() {
  const isMobile = window.innerWidth < 768;
  const maxX = isMobile ? 100 : 250;
  const maxY = isMobile ? 80 : 200;
  return { maxX, maxY };
}

// Create floating hearts
function createHeart() {
  const heart = document.createElement("div");
  heart.className = "heart";
  heart.innerHTML = "💖";
  heart.style.left = Math.random() * 100 + "vw";
  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 4000);
}

// No button click handler - consolidated all functionality
noBtn.addEventListener("click", () => {
  // Show final message and disable after max clicks
  if (noBtnClickCount >= MAX_NO_CLICKS) {
    yesBtn.textContent = messages[MAX_NO_CLICKS]; // Show final message
    noBtn.style.display = "none";
    return;
  }
  
  noBtnClickCount++;
  clickCount++;
  const { maxX, maxY } = getMovementDistance();
  const x = (Math.random() - 0.5) * maxX;
  const y = (Math.random() - 0.5) * maxY;
  noBtn.style.transform = `translate(${x}px, ${y}px)`;
  
  // Also set fixed position for additional movement
  const btnWidth = noBtn.offsetWidth;
  const btnHeight = noBtn.offsetHeight;
  const posX = Math.random() * (window.innerWidth - btnWidth - 20);
  const posY = Math.random() * (window.innerHeight - btnHeight - 20);
  noBtn.style.position = "fixed";
  noBtn.style.left = posX + "px";
  noBtn.style.top = posY + "px";
  
  // Grow yes button
  yesSize += 10;
  yesBtn.style.fontSize = yesSize + "px";
  yesBtn.style.padding = (10 + yesSize * 0.3) + "px";
  
  // Update yes button message
  yesBtn.textContent = messages[(noBtnClickCount - 1) % messages.length];
  
  // Add shake animation
  noBtn.classList.add("shake");
  setTimeout(() => noBtn.classList.remove("shake"), 400);
  
  // Show reaction GIF
  const gif = document.getElementById("reactionGif");
  gif.classList.remove("show-gif");
  void gif.offsetWidth; // Trigger reflow to reset animation
  gif.src = gifs[clickCount % gifs.length];
  gif.classList.add("show-gif");
});

// Yes button click handler
yesBtn.addEventListener("click", () => {
  // Change background
  document.body.style.background = "linear-gradient(135deg, #ff9a9e, #fad0c4)";
  
  // Add pop animation
  yesBtn.style.animation = "pop 0.5s ease";
  
  // Show success message with animation
  document.body.innerHTML = "<h1 class='success-message'>Yay! I knew it 💖</h1>";
  document.body.innerHTML += "<p class='success-text'>You've made me the happiest!</p>";
  // Create multiple floating hearts
  for (let i = 0; i < 20; i++) {
    setTimeout(() => {
      const heart = document.createElement("div");
      heart.className = "success-heart";
      heart.innerHTML = "💖";
      heart.style.left = Math.random() * 100 + "vw";
      document.body.appendChild(heart);
      setTimeout(() => heart.remove(), 3000);
    }, i * 100);
  }
});

// Start creating hearts on page load
setInterval(createHeart, 600);