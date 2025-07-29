// 고정형 퀴즈 모드 - 선택지 순서 고정
let currentQuestion = 0;
let correctCount = 0;
let incorrectCount = 0;

function initFixedQuiz() {
    // 퀴즈 데이터 복사 및 문제 순서만 랜덤으로 섞기
    currentQuizData = shuffleArray([...quizData]);
    
    // 상태 초기화
    currentQuestion = 0;
    correctCount = 0;
    incorrectCount = 0;
    
    // 이벤트 리스너 설정
    setupFixedQuizEvents();
    
    // 첫 문제 로딩
    loadFixedQuestion();
}

function setupFixedQuizEvents() {
    const nextBtn = document.getElementById('next-button');
    const restartBtn = document.getElementById('restart-button');
    
    // 기존 이벤트 리스너 제거
    nextBtn.replaceWith(nextBtn.cloneNode(true));
    restartBtn.replaceWith(restartBtn.cloneNode(true));
    
    // 새 요소 참조
    const newNextBtn = document.getElementById('next-button');
    const newRestartBtn = document.getElementById('restart-button');
    
    newNextBtn.addEventListener('click', () => {
        currentQuestion++;
        if (currentQuestion < currentQuizData.length) {
            loadFixedQuestion();
        } else {
            showFixedResult();
        }
    });
    
    newRestartBtn.addEventListener('click', () => {
        resetToModeSelection();
    });
}

function loadFixedQuestion() {
    const q = currentQuizData[currentQuestion];
    const questionEl = document.getElementById('question');
    const optionsEl = document.getElementById('options');
    const resultEl = document.getElementById('result');
    const nextBtn = document.getElementById('next-button');
    
    questionEl.innerHTML = q.question;
    optionsEl.innerHTML = '';
    resultEl.textContent = '';
    nextBtn.style.display = 'none';

    q.options.forEach((option, index) => {
        const li = document.createElement('li');
        li.textContent = `${index + 1}. ${option}`;
        li.onclick = () => checkFixedAnswer(index + 1, li);
        optionsEl.appendChild(li);
    });
}

function checkFixedAnswer(selected, selectedElement) {
    const correctAnswer = currentQuizData[currentQuestion].answer;
    const resultEl = document.getElementById('result');
    const nextBtn = document.getElementById('next-button');
    
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

function showFixedResult() {
    const questionEl = document.getElementById('question');
    const optionsEl = document.getElementById('options');
    const resultEl = document.getElementById('result');
    const nextBtn = document.getElementById('next-button');
    const restartBtn = document.getElementById('restart-button');
    
    questionEl.textContent = '퀴즈 완료!';
    optionsEl.innerHTML = '';
    resultEl.innerHTML = `정답: ${correctCount}개<br>오답: ${incorrectCount}개<br><br>모드 선택으로 돌아가려면 다시 시작을 클릭하세요.`;
    nextBtn.style.display = 'none';
    restartBtn.style.display = 'inline-block';
}
