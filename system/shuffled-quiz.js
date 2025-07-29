// 순서변경형 퀴즈 모드 - 선택지 순서가 매번 섞임
let currentQuestion = 0;
let correctCount = 0;
let incorrectCount = 0;

function initShuffledQuiz() {
    // 퀴즈 데이터 복사 및 문제 순서 랜덤으로 섞기
    currentQuizData = shuffleArray([...quizData]);
    
    // 상태 초기화
    currentQuestion = 0;
    correctCount = 0;
    incorrectCount = 0;
    
    // 이벤트 리스너 설정
    setupShuffledQuizEvents();
    
    // 첫 문제 로딩
    loadShuffledQuestion();
}

function setupShuffledQuizEvents() {
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
            loadShuffledQuestion();
        } else {
            showShuffledResult();
        }
    });
    
    newRestartBtn.addEventListener('click', () => {
        resetToModeSelection();
    });
}

function loadShuffledQuestion() {
    const q = currentQuizData[currentQuestion];
    const questionEl = document.getElementById('question');
    const optionsEl = document.getElementById('options');
    const resultEl = document.getElementById('result');
    const nextBtn = document.getElementById('next-button');
    
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
        li.onclick = () => checkShuffledAnswer(option.originalIndex + 1, li);
        optionsEl.appendChild(li);
    });
}

function checkShuffledAnswer(selectedOriginalIndex, selectedElement) {
    const correctAnswer = currentQuizData[currentQuestion].answer;
    const resultEl = document.getElementById('result');
    const nextBtn = document.getElementById('next-button');
    
    // 모든 선택지를 순회하며 클래스 추가
    const options = document.querySelectorAll('#options li');
    
    // 올바른 답과 선택한 답을 찾기
    options.forEach((option, displayIndex) => {
        const optionText = option.textContent.substring(3); // "1. " 부분 제거
        const originalOptions = currentQuizData[currentQuestion].options;
        
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
        resultEl.textContent = `오답입니다! 정답은 "${currentQuizData[currentQuestion].options[correctAnswer - 1]}"입니다.`;
        incorrectCount++;
    }

    // 모든 선택지 클릭 비활성화
    options.forEach(option => {
        option.style.pointerEvents = 'none';
    });

    nextBtn.style.display = 'inline-block';
}

function showShuffledResult() {
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
