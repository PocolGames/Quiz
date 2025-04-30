// 문제 배열을 랜덤으로 섞는 함수
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

quizData = shuffleArray(quizData);

let currentQuestion = 0;
let correctCount = 0;
let incorrectCount = 0;

const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const resultEl = document.getElementById('result');
const nextBtn = document.getElementById('next-button');
const restartBtn = document.getElementById('restart-button');

function loadQuestion() {
  const q = quizData[currentQuestion];
  questionEl.innerHTML = q.question;
  optionsEl.innerHTML = '';
  resultEl.textContent = '';
  nextBtn.style.display = 'none';

  q.options.forEach((option, index) => {
    const li = document.createElement('li');
    const btn = document.createElement('button');
    btn.textContent = `${index + 1}. ${option}`;
    btn.onclick = () => checkAnswer(index + 1);
    li.appendChild(btn);
    optionsEl.appendChild(li);
  });
}

function checkAnswer(selected) {
  const correctAnswer = quizData[currentQuestion].answer;
  if (selected === correctAnswer) {
    resultEl.textContent = '정답입니다!';
    correctCount++;
  } else {
    resultEl.textContent = `오답입니다! 정답은 ${correctAnswer}번입니다.`;
    incorrectCount++;
  }

  // 모든 버튼 비활성화
  const buttons = document.querySelectorAll('#options button');
  buttons.forEach(btn => btn.disabled = true);

  nextBtn.style.display = 'inline-block';
}

nextBtn.addEventListener('click', () => {
  currentQuestion++;
  if (currentQuestion < quizData.length) {
    loadQuestion();
  } else {
    showResult();
  }
});

restartBtn.addEventListener('click', () => {
  currentQuestion = 0;
  correctCount = 0;
  incorrectCount = 0;
  quizData = shuffleArray(quizData);
  restartBtn.style.display = 'none';
  loadQuestion();
});

function showResult() {
  questionEl.textContent = '퀴즈 완료!';
  optionsEl.innerHTML = '';
  resultEl.innerHTML = `정답: ${correctCount}개<br>오답: ${incorrectCount}개`;
  nextBtn.style.display = 'none';
  restartBtn.style.display = 'inline-block';
}

// 첫 문제 로딩
loadQuestion();