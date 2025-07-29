// 암기카드형 퀴즈 모드 - 정답만 보기
let currentIndex = 0;

function initFlashcardQuiz() {
    // 퀴즈 데이터를 암기카드 형태로 변환 및 섞기
    currentQuizData = shuffleArray([...quizData]).map(item => ({
        question: item.question,
        answer: item.options[item.answer - 1] // 정답 텍스트만 사용
    }));
    
    // 상태 초기화
    currentIndex = 0;
    
    // 이벤트 리스너 설정
    setupFlashcardEvents();
    
    // 첫 카드 로딩
    loadFlashcard();
}

function setupFlashcardEvents() {
    const showAnswerBtn = document.getElementById('show-answer-button');
    const prevBtn = document.getElementById('prev-button');
    const nextBtn = document.getElementById('next-button');
    const restartBtn = document.getElementById('restart-button');
    
    // 기존 이벤트 리스너 제거
    if (showAnswerBtn) showAnswerBtn.replaceWith(showAnswerBtn.cloneNode(true));
    if (prevBtn) prevBtn.replaceWith(prevBtn.cloneNode(true));
    if (nextBtn) nextBtn.replaceWith(nextBtn.cloneNode(true));
    if (restartBtn) restartBtn.replaceWith(restartBtn.cloneNode(true));
    
    // 새 요소 참조
    const newShowAnswerBtn = document.getElementById('show-answer-button');
    const newPrevBtn = document.getElementById('prev-button');
    const newNextBtn = document.getElementById('next-button');
    const newRestartBtn = document.getElementById('restart-button');
    
    if (newShowAnswerBtn) {
        newShowAnswerBtn.addEventListener('click', () => {
            const answerEl = document.getElementById('answer');
            answerEl.style.display = 'block';
            newShowAnswerBtn.style.display = 'none';
            newNextBtn.style.display = 'inline-block';
        });
    }
    
    if (newNextBtn) {
        newNextBtn.addEventListener('click', () => {
            currentIndex++;
            if (currentIndex < currentQuizData.length) {
                loadFlashcard();
            } else {
                showFlashcardComplete();
            }
        });
    }
    
    if (newPrevBtn) {
        newPrevBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                loadFlashcard();
            }
        });
    }
    
    if (newRestartBtn) {
        newRestartBtn.addEventListener('click', () => {
            resetToModeSelection();
        });
    }
}

function loadFlashcard() {
    const card = currentQuizData[currentIndex];
    const questionEl = document.getElementById('question');
    const answerEl = document.getElementById('answer');
    const showAnswerBtn = document.getElementById('show-answer-button');
    const nextBtn = document.getElementById('next-button');
    const prevBtn = document.getElementById('prev-button');
    const restartBtn = document.getElementById('restart-button');
    const counterEl = document.getElementById('card-counter');
    
    questionEl.textContent = card.question;
    answerEl.textContent = card.answer;
    answerEl.style.display = 'none';

    if (showAnswerBtn) showAnswerBtn.style.display = 'inline-block';
    if (nextBtn) nextBtn.style.display = 'none';
    if (prevBtn) prevBtn.style.display = currentIndex > 0 ? 'inline-block' : 'none';
    if (restartBtn) restartBtn.style.display = 'none';
    if (counterEl) counterEl.textContent = `${currentIndex + 1} / ${currentQuizData.length}`;
}

function showFlashcardComplete() {
    const questionEl = document.getElementById('question');
    const answerEl = document.getElementById('answer');
    const counterEl = document.getElementById('card-counter');
    const showAnswerBtn = document.getElementById('show-answer-button');
    const nextBtn = document.getElementById('next-button');
    const prevBtn = document.getElementById('prev-button');
    const restartBtn = document.getElementById('restart-button');
    
    questionEl.textContent = "수고하셨습니다!";
    if (answerEl) answerEl.style.display = 'none';
    if (counterEl) counterEl.textContent = '모드 선택으로 돌아가려면 다시 시작을 클릭하세요.';
    
    if (showAnswerBtn) showAnswerBtn.style.display = 'none';
    if (nextBtn) nextBtn.style.display = 'none';
    if (prevBtn) prevBtn.style.display = 'none';
    if (restartBtn) restartBtn.style.display = 'inline-block';
}
