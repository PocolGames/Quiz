let cardData = shuffleArray([...rawQuizData]);
let currentIndex = 0;

const questionEl = document.getElementById('question');
const answerEl = document.getElementById('answer');
const showAnswerBtn = document.getElementById('show-answer-button');
const prevBtn = document.getElementById('prev-button');
const nextBtn = document.getElementById('next-button');
const restartBtn = document.getElementById('restart-button');
const counterEl = document.getElementById('card-counter');

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function loadCard() {
  const card = cardData[currentIndex];
  questionEl.textContent = card.question;
  answerEl.textContent = card.answer;
  answerEl.style.display = 'none';

  showAnswerBtn.style.display = 'inline-block';
  nextBtn.style.display = 'none';
  prevBtn.style.display = currentIndex > 0 ? 'inline-block' : 'none';
  restartBtn.style.display = 'none';

  counterEl.textContent = `${currentIndex + 1} / ${cardData.length}`;
}

showAnswerBtn.onclick = () => {
  answerEl.style.display = 'block';
  showAnswerBtn.style.display = 'none';
  nextBtn.style.display = 'inline-block';
};

nextBtn.onclick = () => {
  currentIndex++;
  if (currentIndex < cardData.length) {
    loadCard();
  } else {
    showCompleteMessage();
  }
};

prevBtn.onclick = () => {
  if (currentIndex > 0) {
    currentIndex--;
    loadCard();
  }
};

restartBtn.onclick = () => {
  cardData = shuffleArray([...rawQuizData]);
  currentIndex = 0;
  loadCard();
};

function showCompleteMessage() {
  questionEl.textContent = "수고하셨습니다!";
  answerEl.style.display = 'none';
  counterEl.textContent = '';
  showAnswerBtn.style.display = 'none';
  nextBtn.style.display = 'none';
  prevBtn.style.display = 'none';
  restartBtn.style.display = 'inline-block';
}

loadCard();
