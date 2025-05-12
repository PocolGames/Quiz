// 배열을 랜덤으로 섞는 함수
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// 문제 배열을 랜덤으로 섞기
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

  // 선택지를 인덱스와 함께 배열로 만들기
  const optionsWithIndex = q.options.map((option, index) => ({
    text: option,
    originalIndex: index
  }));

  // 선택지 순서 섞기
  const shuffledOptions = shuffleArray([...optionsWithIndex]);

  shuffledOptions.forEach((option, displayIndex) => {
    const li = document.createElement('li');
    li.textContent = `${displayIndex + 1}. ${option.text}`;
    li.onclick = () => checkAnswer(option.originalIndex + 1, li);
    optionsEl.appendChild(li);
  });
}

function checkAnswer(selectedOriginalIndex, selectedElement) {
  const correctAnswer = quizData[currentQuestion].answer;
  
  // 모든 선택지를 순회하며 클래스 추가
  const options = document.querySelectorAll('#options li');
  
  // 올바른 답과 선택한 답을 찾기
  options.forEach((option, displayIndex) => {
    const optionText = option.textContent.substring(3); // "1. " 부분 제거
    const originalOptions = quizData[currentQuestion].options;
    
    // 이 선택지가 원래 몇 번째 선택지인지 찾기
    const originalIndex = originalOptions.indexOf(optionText) + 1;
    
    if (originalIndex === correctAnswer) {
      option.classList.add('correct');
    } else if (originalIndex === selectedOriginalIndex) {
      option.classList.add('incorrect');
    }
  });
  
  if (selectedOriginalIndex === correctAnswer) {
    resultEl.textContent = '정답입니다!';
    correctCount++;
  } else {
    resultEl.textContent = `오답입니다! 정답은 "${quizData[currentQuestion].options[correctAnswer - 1]}"입니다.`;
    incorrectCount++;
  }

  // 모든 선택지 클릭 비활성화
  options.forEach(option => {
    option.style.pointerEvents = 'none';
  });

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
  // 문제 순서도 다시 섞기
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
