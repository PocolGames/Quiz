// 고정형 퀴즈 모드 - 선택지 순서 고정
let fixedCurrentQuestion = 0;
let fixedCorrectCount = 0;
let fixedIncorrectCount = 0;

function initFixedQuiz() {
    console.log('Initializing fixed quiz'); // 디버그용
    console.log('Quiz data available:', !!window.quizData, window.quizData ? window.quizData.length : 0); // 디버그용
    
    // 퀴즈 데이터 복사 및 문제 순서만 랜덤으로 섞기
    currentQuizData = shuffleArray([...quizData]);
    
    // 상태 초기화
    fixedCurrentQuestion = 0;
    fixedCorrectCount = 0;
    fixedIncorrectCount = 0;
    
    console.log('Fixed quiz initialized with', currentQuizData.length, 'questions'); // 디버그용
    
    // 이벤트 리스너 설정
    setupFixedQuizEvents();
    
    // 첫 문제 로딩
    loadFixedQuestion();
}

function setupFixedQuizEvents() {
    const nextBtn = document.getElementById('next-button');
    const restartBtn = document.getElementById('restart-button');
    
    console.log('Setting up fixed quiz events, buttons found:', {
        next: !!nextBtn,
        restart: !!restartBtn
    }); // 디버그용
    
    // 기존 이벤트 리스너 제거
    if (nextBtn) nextBtn.replaceWith(nextBtn.cloneNode(true));
    if (restartBtn) restartBtn.replaceWith(restartBtn.cloneNode(true));
    
    // 새 요소 참조
    const newNextBtn = document.getElementById('next-button');
    const newRestartBtn = document.getElementById('restart-button');
    
    if (newNextBtn) {
        newNextBtn.addEventListener('click', () => {
            fixedCurrentQuestion++;
            if (fixedCurrentQuestion < currentQuizData.length) {
                loadFixedQuestion();
            } else {
                showFixedResult();
            }
        });
    }
    
    if (newRestartBtn) {
        newRestartBtn.addEventListener('click', () => {
            resetToModeSelection();
        });
    }
}

function loadFixedQuestion() {
    console.log('Loading fixed question:', fixedCurrentQuestion + 1, 'of', currentQuizData.length); // 디버그용
    
    const q = currentQuizData[fixedCurrentQuestion];
    const questionEl = document.getElementById('question');
    const optionsEl = document.getElementById('options');
    const resultEl = document.getElementById('result');
    const nextBtn = document.getElementById('next-button');
    const counterEl = document.getElementById('quiz-counter');
    
    if (!questionEl || !optionsEl) {
        console.error('Required elements not found:', {
            question: !!questionEl,
            options: !!optionsEl
        });
        return;
    }
    
    questionEl.innerHTML = q.question;
    optionsEl.innerHTML = '';
    if (resultEl) resultEl.textContent = '';
    if (nextBtn) nextBtn.style.display = 'none';
    if (counterEl) counterEl.textContent = `${fixedCurrentQuestion + 1} / ${currentQuizData.length}`;

    q.options.forEach((option, index) => {
        const li = document.createElement('li');
        li.textContent = `${index + 1}. ${option}`;
        li.onclick = () => checkFixedAnswer(index + 1, li);
        optionsEl.appendChild(li);
    });
}

function checkFixedAnswer(selected, selectedElement) {
    const correctAnswer = currentQuizData[fixedCurrentQuestion].answer;
    const resultEl = document.getElementById('result');
    const nextBtn = document.getElementById('next-button');
    
    console.log('Checking answer:', selected, 'vs correct:', correctAnswer); // 디버그용
    
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
        if (resultEl) resultEl.textContent = '정답입니다!';
        fixedCorrectCount++;
    } else {
        if (resultEl) resultEl.textContent = `오답입니다! 정답은 ${correctAnswer}번입니다.`;
        fixedIncorrectCount++;
    }

    // 모든 선택지 클릭 비활성화
    options.forEach(option => {
        option.style.pointerEvents = 'none';
    });

    if (nextBtn) nextBtn.style.display = 'inline-block';
}

function showFixedResult() {
    const questionEl = document.getElementById('question');
    const optionsEl = document.getElementById('options');
    const resultEl = document.getElementById('result');
    const nextBtn = document.getElementById('next-button');
    const restartBtn = document.getElementById('restart-button');
    
    if (questionEl) questionEl.textContent = '퀴즈 완료!';
    if (optionsEl) optionsEl.innerHTML = '';
    if (resultEl) resultEl.innerHTML = `정답: ${fixedCorrectCount}개<br>오답: ${fixedIncorrectCount}개<br><br>모드 선택으로 돌아가려면 다시 시작을 클릭하세요.`;
    if (nextBtn) nextBtn.style.display = 'none';
    if (restartBtn) restartBtn.style.display = 'inline-block';
}
