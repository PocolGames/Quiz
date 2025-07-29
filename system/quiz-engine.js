// 통합 퀴즈 엔진 - 모드 선택 및 공통 로직
let selectedMode = null;
let currentQuizData = [];

// 모드 선택 이벤트 리스너
document.addEventListener('DOMContentLoaded', function() {
    console.log('Quiz engine loaded'); // 디버그용
    
    const modeButtons = document.querySelectorAll('.mode-btn');
    console.log('Found mode buttons:', modeButtons.length); // 디버그용
    
    modeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const mode = this.getAttribute('data-mode');
            console.log('Selected mode:', mode); // 디버그용
            initializeQuiz(mode);
        });
    });
});

// 퀴즈 초기화 - 선택된 모드에 따라 해당 모드 실행
function initializeQuiz(mode) {
    selectedMode = mode;
    
    // DOM 요소들을 여기서 가져오기 (DOM이 로드된 후)
    const modeSelectionEl = document.getElementById('mode-selection');
    const quizContainerEl = document.getElementById('quiz-container');
    const flashcardContainerEl = document.getElementById('flashcard-container');
    
    console.log('Elements found:', {
        modeSelection: !!modeSelectionEl,
        quizContainer: !!quizContainerEl, 
        flashcardContainer: !!flashcardContainerEl
    }); // 디버그용
    
    // 모드 선택 화면 숨기기
    if (modeSelectionEl) modeSelectionEl.style.display = 'none';
    
    // 모든 컨테이너 먼저 숨기기
    if (quizContainerEl) quizContainerEl.style.display = 'none';
    if (flashcardContainerEl) flashcardContainerEl.style.display = 'none';
    
    // 모드에 따라 해당 컨테이너 보이기 및 초기화
    switch(mode) {
        case 'fixed':
            if (quizContainerEl) quizContainerEl.style.display = 'block';
            if (typeof initFixedQuiz === 'function') {
                initFixedQuiz();
            } else {
                console.error('initFixedQuiz function not found');
            }
            break;
        case 'random':
            if (quizContainerEl) quizContainerEl.style.display = 'block';
            if (typeof initRandomQuiz === 'function') {
                initRandomQuiz();
            } else {
                console.error('initRandomQuiz function not found');
            }
            break;
        case 'shuffled':
            if (quizContainerEl) quizContainerEl.style.display = 'block';
            if (typeof initShuffledQuiz === 'function') {
                initShuffledQuiz();
            } else {
                console.error('initShuffledQuiz function not found');
            }
            break;
        case 'flashcard':
            if (flashcardContainerEl) flashcardContainerEl.style.display = 'block';
            if (typeof initFlashcardQuiz === 'function') {
                initFlashcardQuiz();
            } else {
                console.error('initFlashcardQuiz function not found');
            }
            break;
        default:
            console.error('Unknown mode:', mode);
    }
}

// 퀴즈 재시작 (모드 선택 화면으로 돌아가기)
function resetToModeSelection() {
    selectedMode = null;
    
    // DOM 요소들을 여기서 가져오기
    const modeSelectionEl = document.getElementById('mode-selection');
    const quizContainerEl = document.getElementById('quiz-container');
    const flashcardContainerEl = document.getElementById('flashcard-container');
    
    // 모든 컨테이너 숨기기
    if (quizContainerEl) quizContainerEl.style.display = 'none';
    if (flashcardContainerEl) flashcardContainerEl.style.display = 'none';
    
    // 모드 선택 화면 보이기
    if (modeSelectionEl) modeSelectionEl.style.display = 'block';
    
    // 퀴즈 상태 초기화
    resetQuizState();
}

// 공통 퀴즈 상태 초기화
function resetQuizState() {
    // 각 모드별 전역 변수들 초기화
    if (typeof fixedCurrentQuestion !== 'undefined') fixedCurrentQuestion = 0;
    if (typeof fixedCorrectCount !== 'undefined') fixedCorrectCount = 0;
    if (typeof fixedIncorrectCount !== 'undefined') fixedIncorrectCount = 0;
    
    if (typeof randomCurrentQuestion !== 'undefined') randomCurrentQuestion = 0;
    if (typeof randomCorrectCount !== 'undefined') randomCorrectCount = 0;
    if (typeof randomIncorrectCount !== 'undefined') randomIncorrectCount = 0;
    
    if (typeof shuffledCurrentQuestion !== 'undefined') shuffledCurrentQuestion = 0;
    if (typeof shuffledCorrectCount !== 'undefined') shuffledCorrectCount = 0;
    if (typeof shuffledIncorrectCount !== 'undefined') shuffledIncorrectCount = 0;
    
    if (typeof flashcardCurrentIndex !== 'undefined') flashcardCurrentIndex = 0;
    
    // 결과 요소들 초기화
    const resultEl = document.getElementById('result');
    const nextBtn = document.getElementById('next-button');
    const restartBtn = document.getElementById('restart-button');
    const showAnswerBtn = document.getElementById('show-answer-button');
    const flashcardPrevBtn = document.getElementById('flashcard-prev-button');
    const flashcardNextBtn = document.getElementById('flashcard-next-button');
    const flashcardRestartBtn = document.getElementById('flashcard-restart-button');
    const flashcardAnswerEl = document.getElementById('flashcard-answer');
    const optionsEl = document.getElementById('options');
    
    if (resultEl) resultEl.textContent = '';
    if (nextBtn) nextBtn.style.display = 'none';
    if (restartBtn) restartBtn.style.display = 'none';
    if (showAnswerBtn) showAnswerBtn.style.display = 'none';
    if (flashcardPrevBtn) flashcardPrevBtn.style.display = 'none';
    if (flashcardNextBtn) flashcardNextBtn.style.display = 'none';
    if (flashcardRestartBtn) flashcardRestartBtn.style.display = 'none';
    if (flashcardAnswerEl) flashcardAnswerEl.style.display = 'none';
    
    if (optionsEl) {
        optionsEl.innerHTML = '';
        // 선택지의 클릭 이벤트와 스타일 초기화
        const options = optionsEl.querySelectorAll('li');
        options.forEach(option => {
            option.classList.remove('correct', 'incorrect');
            option.style.pointerEvents = 'auto';
        });
    }
}

// 배열 섞기 유틸 함수 (모든 모드에서 공통 사용)
function shuffleArray(array) {
    const newArray = [...array]; // 원본 배열 보호
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}
