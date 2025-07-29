// 암기카드형 퀴즈 모드 - 정답만 보기
let flashcardCurrentIndex = 0;

function initFlashcardQuiz() {
    console.log('Initializing flashcard quiz'); // 디버그용
    
    // 퀴즈 데이터를 암기카드 형태로 변환 및 섞기
    currentQuizData = shuffleArray([...quizData]).map(item => ({
        question: item.question,
        answer: item.options[item.answer - 1] // 정답 텍스트만 사용
    }));
    
    console.log('Flashcard data prepared:', currentQuizData.length, 'items'); // 디버그용
    
    // 상태 초기화
    flashcardCurrentIndex = 0;
    
    // 이벤트 리스너 설정
    setupFlashcardEvents();
    
    // 첫 카드 로딩
    loadFlashcard();
}

function setupFlashcardEvents() {
    const showAnswerBtn = document.getElementById('show-answer-button');
    const prevBtn = document.getElementById('flashcard-prev-button');
    const nextBtn = document.getElementById('flashcard-next-button');
    const restartBtn = document.getElementById('flashcard-restart-button');
    
    console.log('Setting up flashcard events, buttons found:', {
        showAnswer: !!showAnswerBtn,
        prev: !!prevBtn,
        next: !!nextBtn,
        restart: !!restartBtn
    }); // 디버그용
    
    // 기존 이벤트 리스너 제거
    if (showAnswerBtn) showAnswerBtn.replaceWith(showAnswerBtn.cloneNode(true));
    if (prevBtn) prevBtn.replaceWith(prevBtn.cloneNode(true));
    if (nextBtn) nextBtn.replaceWith(nextBtn.cloneNode(true));
    if (restartBtn) restartBtn.replaceWith(restartBtn.cloneNode(true));
    
    // 새 요소 참조
    const newShowAnswerBtn = document.getElementById('show-answer-button');
    const newPrevBtn = document.getElementById('flashcard-prev-button');
    const newNextBtn = document.getElementById('flashcard-next-button');
    const newRestartBtn = document.getElementById('flashcard-restart-button');
    
    if (newShowAnswerBtn) {
        newShowAnswerBtn.addEventListener('click', () => {
            const answerEl = document.getElementById('flashcard-answer');
            if (answerEl) {
                answerEl.style.display = 'block';
                newShowAnswerBtn.style.display = 'none';
                if (newNextBtn) newNextBtn.style.display = 'inline-block';
            }
        });
    }
    
    if (newNextBtn) {
        newNextBtn.addEventListener('click', () => {
            flashcardCurrentIndex++;
            if (flashcardCurrentIndex < currentQuizData.length) {
                loadFlashcard();
            } else {
                showFlashcardComplete();
            }
        });
    }
    
    if (newPrevBtn) {
        newPrevBtn.addEventListener('click', () => {
            if (flashcardCurrentIndex > 0) {
                flashcardCurrentIndex--;
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
    console.log('Loading flashcard:', flashcardCurrentIndex + 1, 'of', currentQuizData.length); // 디버그용
    
    const card = currentQuizData[flashcardCurrentIndex];
    const questionEl = document.getElementById('flashcard-question');
    const answerEl = document.getElementById('flashcard-answer');
    const showAnswerBtn = document.getElementById('show-answer-button');
    const nextBtn = document.getElementById('flashcard-next-button');
    const prevBtn = document.getElementById('flashcard-prev-button');
    const restartBtn = document.getElementById('flashcard-restart-button');
    const counterEl = document.getElementById('card-counter');
    
    if (questionEl) questionEl.textContent = card.question;
    if (answerEl) {
        answerEl.textContent = card.answer;
        answerEl.style.display = 'none';
    }

    if (showAnswerBtn) showAnswerBtn.style.display = 'inline-block';
    if (nextBtn) nextBtn.style.display = 'none';
    if (prevBtn) prevBtn.style.display = flashcardCurrentIndex > 0 ? 'inline-block' : 'none';
    if (restartBtn) restartBtn.style.display = 'none';
    if (counterEl) counterEl.textContent = `${flashcardCurrentIndex + 1} / ${currentQuizData.length}`;
}

function showFlashcardComplete() {
    const questionEl = document.getElementById('flashcard-question');
    const answerEl = document.getElementById('flashcard-answer');
    const counterEl = document.getElementById('card-counter');
    const showAnswerBtn = document.getElementById('show-answer-button');
    const nextBtn = document.getElementById('flashcard-next-button');
    const prevBtn = document.getElementById('flashcard-prev-button');
    const restartBtn = document.getElementById('flashcard-restart-button');
    
    if (questionEl) questionEl.textContent = "수고하셨습니다!";
    if (answerEl) answerEl.style.display = 'none';
    if (counterEl) counterEl.textContent = '모드 선택으로 돌아가려면 다시 시작을 클릭하세요.';
    
    if (showAnswerBtn) showAnswerBtn.style.display = 'none';
    if (nextBtn) nextBtn.style.display = 'none';
    if (prevBtn) prevBtn.style.display = 'none';
    if (restartBtn) restartBtn.style.display = 'inline-block';
}
