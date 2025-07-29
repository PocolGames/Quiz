// 통합 퀴즈 엔진 - 모드 선택 및 공통 로직
let selectedMode = null;
let currentQuizData = [];

// DOM 요소들
const modeSelectionEl = document.getElementById('mode-selection');
const quizContainerEl = document.getElementById('quiz-container');
const flashcardContainerEl = document.getElementById('flashcard-container');

// 모드 선택 이벤트 리스너
document.addEventListener('DOMContentLoaded', function() {
    const modeButtons = document.querySelectorAll('.mode-btn');
    modeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const mode = this.getAttribute('data-mode');
            initializeQuiz(mode);
        });
    });
});

// 퀴즈 초기화 - 선택된 모드에 따라 해당 모드 실행
function initializeQuiz(mode) {
    selectedMode = mode;
    
    // 모드 선택 화면 숨기기
    modeSelectionEl.style.display = 'none';
    
    // 모드에 따라 해당 컨테이너 보이기 및 초기화
    switch(mode) {
        case 'fixed':
            quizContainerEl.style.display = 'block';
            initFixedQuiz();
            break;
        case 'random':
            quizContainerEl.style.display = 'block';
            initRandomQuiz();
            break;
        case 'shuffled':
            quizContainerEl.style.display = 'block';
            initShuffledQuiz();
            break;
        case 'flashcard':
            flashcardContainerEl.style.display = 'block';
            initFlashcardQuiz();
            break;
    }
}

// 퀴즈 재시작 (모드 선택 화면으로 돌아가기)
function resetToModeSelection() {
    selectedMode = null;
    
    // 모든 컨테이너 숨기기
    quizContainerEl.style.display = 'none';
    flashcardContainerEl.style.display = 'none';
    
    // 모드 선택 화면 보이기
    modeSelectionEl.style.display = 'block';
    
    // 퀴즈 상태 초기화
    resetQuizState();
}

// 공통 퀴즈 상태 초기화
function resetQuizState() {
    currentQuestion = 0;
    correctCount = 0;
    incorrectCount = 0;
    currentIndex = 0;
    
    // 결과 요소들 초기화
    const resultEl = document.getElementById('result');
    const nextBtn = document.getElementById('next-button');
    const restartBtn = document.getElementById('restart-button');
    const showAnswerBtn = document.getElementById('show-answer-button');
    const prevBtn = document.getElementById('prev-button');
    
    if (resultEl) resultEl.textContent = '';
    if (nextBtn) nextBtn.style.display = 'none';
    if (restartBtn) restartBtn.style.display = 'none';
    if (showAnswerBtn) showAnswerBtn.style.display = 'none';
    if (prevBtn) prevBtn.style.display = 'none';
}

// 배열 섞기 유틸 함수 (모든 모드에서 공통 사용)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
