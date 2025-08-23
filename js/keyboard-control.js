// 키보드 조작 기능
let keyboardEnabled = false;

document.addEventListener('DOMContentLoaded', function() {
    console.log('Keyboard control loaded');
    
    // 키보드 이벤트 리스너 등록
    document.addEventListener('keydown', handleKeyPress);
});

// 키보드 입력 처리
function handleKeyPress(event) {
    // 입력 필드에 포커스가 있을 때는 키보드 조작 비활성화
    if (document.activeElement.tagName === 'INPUT' || 
        document.activeElement.tagName === 'TEXTAREA') {
        return;
    }

    const key = event.key;
    
    // 모드 선택 화면에서의 키보드 조작
    if (isModeSelectionVisible()) {
        handleModeSelectionKeys(key);
        return;
    }
    
    // 퀴즈 진행 중 키보드 조작
    if (isQuizContainerVisible()) {
        handleQuizKeys(key);
        return;
    }
    
    // 플래시카드 모드에서의 키보드 조작
    if (isFlashcardContainerVisible()) {
        handleFlashcardKeys(key);
        return;
    }
}

// 모드 선택 화면에서의 키보드 조작
function handleModeSelectionKeys(key) {
    const modeButtons = document.querySelectorAll('.mode-btn');
    
    switch(key) {
        case '1':
            if (modeButtons[0]) modeButtons[0].click();
            break;
        case '2':
            if (modeButtons[1]) modeButtons[1].click();
            break;
        case '3':
            if (modeButtons[2]) modeButtons[2].click();
            break;
        case '4':
            if (modeButtons[3]) modeButtons[3].click();
            break;
    }
}

// 퀴즈(객관식) 모드에서의 키보드 조작
function handleQuizKeys(key) {
    const options = document.querySelectorAll('#options li');
    const nextButton = document.getElementById('next-button');
    const restartButton = document.getElementById('restart-button');
    
    // 선택지 선택 (1-5번 키)
    if (key >= '1' && key <= '5') {
        const optionIndex = parseInt(key) - 1;
        if (options[optionIndex] && !isAnswerRevealed()) {
            options[optionIndex].click();
        }
    }
    // 다음 문제 또는 재시작 (아무 키나 눌러서 진행)
    else {
        if (nextButton && nextButton.style.display !== 'none') {
            nextButton.click();
        } else if (restartButton && restartButton.style.display !== 'none') {
            // 재시작 버튼이 보일 때는 Enter나 Space만 허용
            if (key === 'Enter' || key === ' ') {
                restartButton.click();
            }
        }
    }
}

// 플래시카드 모드에서의 키보드 조작
function handleFlashcardKeys(key) {
    const showAnswerButton = document.getElementById('show-answer-button');
    const flashcardPrevButton = document.getElementById('flashcard-prev-button');
    const flashcardNextButton = document.getElementById('flashcard-next-button');
    const flashcardRestartButton = document.getElementById('flashcard-restart-button');
    
    // 정답이 아직 보이지 않는 상태에서 정답 보기
    if (!isFlashcardAnswerVisible()) {
        switch(key) {
            case '1':
            case ' ': // 스페이스바로도 정답 보기
            case 'Enter':
                if (showAnswerButton && showAnswerButton.style.display !== 'none') {
                    showAnswerButton.click();
                }
                break;
            case 'ArrowLeft':
            case 'a':
            case 'A':
                if (flashcardPrevButton && flashcardPrevButton.style.display !== 'none') {
                    flashcardPrevButton.click();
                }
                break;
        }
    }
    // 정답이 보이는 상태에서 다음 문제 또는 이전 문제
    else {
        switch(key) {
            case 'ArrowLeft':
            case 'a':
            case 'A':
                if (flashcardPrevButton && flashcardPrevButton.style.display !== 'none') {
                    flashcardPrevButton.click();
                }
                break;
            case 'ArrowRight':
            case 'd':
            case 'D':
                if (flashcardNextButton && flashcardNextButton.style.display !== 'none') {
                    flashcardNextButton.click();
                }
                break;
            default:
                // 아무 키나 눌러서 다음 문제
                if (flashcardNextButton && flashcardNextButton.style.display !== 'none') {
                    flashcardNextButton.click();
                } else if (flashcardRestartButton && flashcardRestartButton.style.display !== 'none') {
                    if (key === 'Enter' || key === ' ') {
                        flashcardRestartButton.click();
                    }
                }
                break;
        }
    }
}

// 화면 상태 확인 함수들
function isModeSelectionVisible() {
    const modeSelection = document.getElementById('mode-selection');
    return modeSelection && modeSelection.style.display !== 'none';
}

function isQuizContainerVisible() {
    const quizContainer = document.getElementById('quiz-container');
    return quizContainer && quizContainer.style.display !== 'none';
}

function isFlashcardContainerVisible() {
    const flashcardContainer = document.getElementById('flashcard-container');
    return flashcardContainer && flashcardContainer.style.display !== 'none';
}

function isAnswerRevealed() {
    const result = document.getElementById('result');
    return result && result.textContent.trim() !== '';
}

function isFlashcardAnswerVisible() {
    const flashcardAnswer = document.getElementById('flashcard-answer');
    return flashcardAnswer && flashcardAnswer.style.display !== 'none';
}
