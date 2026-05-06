/**
 * MisfortuneTelling – game logic
 *
 * Picks a random misfortune from the pool, optionally weaving the
 * player's question into the reading for a personalised touch.
 */

'use strict';

// ── Misfortune pool ────────────────────────────────────────────────────────
const MISFORTUNES = [
  "The stars have aligned — against you specifically.",
  "Your socks will always be slightly damp, and no one will understand why.",
  "An unexpected meeting awaits you. You will have forgotten their name.",
  "The path forward is clear. Unfortunately, it leads downhill.",
  "A great opportunity will pass you by while you are looking at your phone.",
  "You will find exactly what you were looking for — one day too late.",
  "Someone is thinking of you right now. They are mildly annoyed.",
  "Fortune favours the bold. You are advised to remain timid.",
  "The universe has big plans for you. None of them involve comfort.",
  "A new chapter begins. The previous one will haunt you anyway.",
  "Your best idea of the year will be credited to someone else.",
  "Today's obstacle is tomorrow's lesson. Unfortunately, class never ends.",
  "The answer you seek exists. It will arrive after you have given up.",
  "You will achieve great things — just not the ones you were hoping for.",
  "Prosperity is on its way. It took a wrong turn and will be late.",
  "The void stares back, shrugs, and moves on.",
  "A surprising windfall approaches. So does the bill that cancels it out.",
  "Many roads lie before you. All of them have construction.",
  "You are destined for something remarkable. Today is not that day.",
  "The crystal ball has seen your future and respectfully declines to elaborate.",
  "Beware the helping hand that also holds a clipboard.",
  "Your lucky number is the floor button in the elevator that never works.",
  "Change is coming. Please update your expectations accordingly.",
  "Every cloud has a silver lining. Yours is a slightly tarnished copper.",
  "The answer is closer than you think. It is also harder than you hoped.",
  "Opportunity knocks. You won't hear it — you'll have headphones on.",
  "A door closes and a window opens. It is on the second floor.",
  "Trust the process. The process has not read the instructions.",
  "Something you lost long ago will return. You no longer need it.",
  "Wisdom comes to those who wait. Impatience is also accepted.",
];

// Symbols shown in the crystal ball per reading
const SYMBOLS = ['🔮', '💀', '🌑', '⚰️', '🕯️', '🦇', '🌩️', '🕷️', '🌪️', '🪦'];

// ── DOM references ──────────────────────────────────────────────────────────
const introScreen     = document.getElementById('intro');
const resultScreen    = document.getElementById('result');
const questionInput   = document.getElementById('question-input');
const askBtn          = document.getElementById('ask-btn');
const againBtn        = document.getElementById('again-btn');
const misfortuneText  = document.getElementById('misfortune-text');
const questionEcho    = document.getElementById('question-echo');
const symbolEl        = document.getElementById('symbol');

// ── Helpers ─────────────────────────────────────────────────────────────────

/**
 * Returns a random element from an array.
 * @template T
 * @param {T[]} arr
 * @returns {T}
 */
function randomFrom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * Switches which screen is visible.
 * @param {HTMLElement} show
 * @param {HTMLElement} hide
 */
function showScreen(show, hide) {
  hide.classList.remove('active');
  // Allow the browser a frame to reset before animating in
  requestAnimationFrame(() => show.classList.add('active'));
}

// ── Game flow ────────────────────────────────────────────────────────────────

function revealMisfortune() {
  const question = questionInput.value.trim();

  // Pick a random misfortune and symbol
  const misfortune = randomFrom(MISFORTUNES);
  const symbol     = randomFrom(SYMBOLS);

  // Update result screen content
  misfortuneText.textContent = misfortune;
  symbolEl.textContent       = symbol;

  if (question) {
    questionEcho.textContent = `You asked: "${question}"`;
  } else {
    questionEcho.textContent = 'You dared to ask without a question. Bold.';
  }

  showScreen(resultScreen, introScreen);
}

function resetGame() {
  questionInput.value = '';
  symbolEl.textContent = '🔮';
  showScreen(introScreen, resultScreen);
  // Return focus to the input so the user can type immediately
  questionInput.focus();
}

// ── Event listeners ──────────────────────────────────────────────────────────

askBtn.addEventListener('click', revealMisfortune);

questionInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    revealMisfortune();
  }
});

againBtn.addEventListener('click', resetGame);
