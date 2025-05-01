let quizData = [];
let currentQuestion = 0;
let correctCount = 0;
let incorrectCount = 0;

const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const resultEl = document.getElementById('result');
const nextBtn = document.getElementById('next-button');
const restartBtn = document.getElementById('restart-button');

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function prepareQuizData() {
  const shuffled = shuffleArray([...rawQuizData]);

  return shuffled.map((current, idx, all) => {
    const otherAnswers = all
      .filter(item => item !== current)
      .map(item => item.answer);

    const wrongOptions = shuffleArray(otherAnswers).slice(0, 3);

    const correctIndex = Math.floor(Math.random() * 4);
    const options = [...wrongOptions];
    options.splice(correctIndex, 0, current.answer);

    return {
      question: current.question,
      options,
      answer: correctIndex + 1
    };
  });
}

function loadQuestion() {
  const q = quizData[currentQuestion];
  questionEl.textContent = q.question;
  optionsEl.innerHTML = '';
  resultEl.textContent = '';
  nextBtn.style.display = 'none';

  q.options.forEach((opt, idx) => {
    const li = document.createElement('li');
    li.textContent = `${idx + 1}. ${opt}`;
    li.onclick = () => checkAnswer(idx + 1, li);
    optionsEl.appendChild(li);
  });
}

function checkAnswer(selected, selectedElement) {
  const correctAnswer = quizData[currentQuestion].answer;
  
  // 모든 선택지를 순회하며 클래스 추가
  const options = document.querySelectorAll('#options li');
  options.forEach((option, index) => {
    if (index + 1 === correctAnswer) {
      option.classList.add('correct');
    } else if (index + 1 === selected) {
      option.classList.add('incorrect');
    }
  });
  
  if (selected === correctAnswer) {
    resultEl.textContent = '정답입니다!';
    correctCount++;
  } else {
    resultEl.textContent = `오답입니다! 정답은 ${correctAnswer}번입니다.`;
    incorrectCount++;
  }

  // 모든 선택지 클릭 비활성화
  options.forEach(option => {
    option.style.pointerEvents = 'none';
  });

  nextBtn.style.display = 'inline-block';
}

nextBtn.onclick = () => {
  currentQuestion++;
  if (currentQuestion < quizData.length) {
    loadQuestion();
  } else {
    showResult();
  }
};

restartBtn.onclick = () => {
  currentQuestion = 0;
  correctCount = 0;
  incorrectCount = 0;
  quizData = prepareQuizData();
  restartBtn.style.display = 'none';
  loadQuestion();
};

function showResult() {
  questionEl.textContent = '퀴즈 완료!';
  optionsEl.innerHTML = '';
  resultEl.innerHTML = `정답: ${correctCount}개<br>오답: ${incorrectCount}개`;
  nextBtn.style.display = 'none';
  restartBtn.style.display = 'inline-block';
}

quizData = prepareQuizData();
loadQuestion();