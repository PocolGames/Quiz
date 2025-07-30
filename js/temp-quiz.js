// 임시 퀴즈 테스트 JavaScript

let tempQuizData = null;
let currentQuestionIndex = 0;
let score = 0;
let userAnswers = [];
let quizType = 'fixed';

// DOM 요소들
const quizTitle = document.getElementById('quizTitle');
const quizTypeInfo = document.getElementById('quizTypeInfo');
const currentQuestionSpan = document.getElementById('currentQuestion');
const totalQuestionsSpan = document.getElementById('totalQuestions');
const questionNumber = document.getElementById('questionNumber');
const questionText = document.getElementById('questionText');
const optionsSection = document.getElementById('optionsSection');
const flashcardSection = document.getElementById('flashcardSection');
const flashcardAnswer = document.getElementById('flashcardAnswer');
const answerText = document.getElementById('answerText');
const showAnswerBtn = document.getElementById('showAnswerBtn');
const flashcardResultButtons = document.getElementById('flashcardResultButtons');
const correctBtn = document.getElementById('correctBtn');
const wrongBtn = document.getElementById('wrongBtn');
const submitBtn = document.getElementById('submitBtn');
const nextBtn = document.getElementById('nextBtn');
const resultSection = document.getElementById('resultSection');
const resultIcon = document.getElementById('resultIcon');
const resultText = document.getElementById('resultText');
const correctAnswerText = document.getElementById('correctAnswerText');
const finalResult = document.getElementById('finalResult');
const finalScore = document.getElementById('finalScore');
const finalTotal = document.getElementById('finalTotal');
const scorePercentage = document.getElementById('scorePercentage');

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', function() {
    loadTempQuizData();
    initializeEventListeners();
});

// 임시 퀴즈 데이터 로드
function loadTempQuizData() {
    const storedData = sessionStorage.getItem('tempQuizData');
    
    if (!storedData) {
        alert('임시 퀴즈 데이터를 찾을 수 없습니다. 퀴즈 생성기에서 다시 시도해주세요.');
        window.close();
        return;
    }
    
    try {
        const parsedData = JSON.parse(storedData);
        tempQuizData = parsedData.data;
        quizType = parsedData.type;
        
        // 제목 설정
        quizTitle.textContent = parsedData.title;
        
        // 퀴즈 타입 정보 설정
        const typeNames = {
            'fixed': '고정형',
            'random': '랜덤형', 
            'shuffled': '순서 변경형',
            'flashcard': '암기 카드형'
        };
        quizTypeInfo.textContent = typeNames[quizType] || quizType;
        
        // 전체 문제 수 설정
        totalQuestionsSpan.textContent = tempQuizData.length;
        
        // 순서 변경형의 경우 선택지 섞기
        if (quizType === 'shuffled') {
            tempQuizData = tempQuizData.map(question => {
                const correctAnswer = question.options[question.answer - 1];
                const shuffledOptions = [...question.options].sort(() => Math.random() - 0.5);
                const newCorrectIndex = shuffledOptions.indexOf(correctAnswer) + 1;
                
                return {
                    ...question,
                    options: shuffledOptions,
                    answer: newCorrectIndex
                };
            });
        }
        
        // 문제 순서 랜덤 섞기
        tempQuizData = [...tempQuizData].sort(() => Math.random() - 0.5);
        
        // 첫 번째 문제 로드
        loadQuestion();
        
    } catch (error) {
        alert('퀴즈 데이터를 불러오는 중 오류가 발생했습니다.');
        console.error('Load error:', error);
        window.close();
    }
}

// 이벤트 리스너 초기화
function initializeEventListeners() {
    // 객관식 선택지 클릭
    const options = document.querySelectorAll('.option');
    options.forEach(option => {
        option.addEventListener('click', function() {
            if (quizType !== 'flashcard') {
                selectOption(this);
            }
        });
    });
    
    // 암기카드 버튼들
    showAnswerBtn.addEventListener('click', showFlashcardAnswer);
    correctBtn.addEventListener('click', () => markFlashcard(true));
    wrongBtn.addEventListener('click', () => markFlashcard(false));
    
    // 제출/다음 버튼
    submitBtn.addEventListener('click', submitAnswer);
    nextBtn.addEventListener('click', nextQuestion);
}

// 문제 로드
function loadQuestion() {
    if (currentQuestionIndex >= tempQuizData.length) {
        showFinalResult();
        return;
    }
    
    const question = tempQuizData[currentQuestionIndex];
    
    // 문제 정보 업데이트
    currentQuestionSpan.textContent = currentQuestionIndex + 1;
    questionNumber.textContent = currentQuestionIndex + 1;
    questionText.textContent = question.question;
    
    // UI 초기화
    resetQuestionUI();
    
    if (quizType === 'flashcard') {
        // 암기카드형
        optionsSection.style.display = 'none';
        flashcardSection.style.display = 'block';
        answerText.textContent = question.answer;
        flashcardAnswer.style.display = 'none';
        showAnswerBtn.style.display = 'block';
        flashcardResultButtons.style.display = 'none';
        submitBtn.style.display = 'none';
    } else {
        // 객관식
        optionsSection.style.display = 'block';
        flashcardSection.style.display = 'none';
        
        // 선택지 설정
        for (let i = 1; i <= 4; i++) {
            const optionElement = document.getElementById(`option${i}`);
            if (question.options && question.options[i - 1]) {
                optionElement.textContent = question.options[i - 1];
                optionElement.parentElement.style.display = 'flex';
            } else {
                optionElement.parentElement.style.display = 'none';
            }
        }
        
        submitBtn.style.display = 'block';
        submitBtn.textContent = '정답 확인';
        submitBtn.disabled = true;
    }
}

// 문제 UI 초기화
function resetQuestionUI() {
    // 선택지 초기화
    const options = document.querySelectorAll('.option');
    options.forEach(option => {
        option.classList.remove('selected', 'correct', 'incorrect');
    });
    
    // 버튼 초기화
    nextBtn.style.display = 'none';
    resultSection.style.display = 'none';
}

// 선택지 선택
function selectOption(optionElement) {
    // 기존 선택 해제
    const options = document.querySelectorAll('.option');
    options.forEach(option => {
        option.classList.remove('selected');
    });
    
    // 새 선택 설정
    optionElement.classList.add('selected');
    submitBtn.disabled = false;
}

// 암기카드 답안 보기
function showFlashcardAnswer() {
    flashcardAnswer.style.display = 'block';
    showAnswerBtn.style.display = 'none';
    flashcardResultButtons.style.display = 'flex';
}

// 암기카드 정답/오답 표시
function markFlashcard(isCorrect) {
    userAnswers.push({
        questionIndex: currentQuestionIndex,
        isCorrect: isCorrect
    });
    
    if (isCorrect) {
        score++;
    }
    
    // 다음 문제로
    setTimeout(() => {
        currentQuestionIndex++;
        loadQuestion();
    }, 500);
}

// 정답 제출
function submitAnswer() {
    const selectedOption = document.querySelector('.option.selected');
    if (!selectedOption) {
        return;
    }
    
    const selectedAnswer = parseInt(selectedOption.getAttribute('data-option'));
    const correctAnswer = tempQuizData[currentQuestionIndex].answer;
    const isCorrect = selectedAnswer === correctAnswer;
    
    // 답안 기록
    userAnswers.push({
        questionIndex: currentQuestionIndex,
        selectedAnswer: selectedAnswer,
        correctAnswer: correctAnswer,
        isCorrect: isCorrect
    });
    
    if (isCorrect) {
        score++;
    }
    
    // 결과 표시
    showAnswerResult(selectedAnswer, correctAnswer, isCorrect);
    
    // 버튼 상태 변경
    submitBtn.style.display = 'none';
    nextBtn.style.display = 'block';
    
    // 선택지 비활성화
    const options = document.querySelectorAll('.option');
    options.forEach(option => {
        const optionNum = parseInt(option.getAttribute('data-option'));
        if (optionNum === correctAnswer) {
            option.classList.add('correct');
        } else if (optionNum === selectedAnswer && !isCorrect) {
            option.classList.add('incorrect');
        }
        option.style.pointerEvents = 'none';
    });
}

// 답안 결과 표시
function showAnswerResult(selectedAnswer, correctAnswer, isCorrect) {
    const question = tempQuizData[currentQuestionIndex];
    
    resultSection.style.display = 'block';
    
    if (isCorrect) {
        resultIcon.textContent = '✓';
        resultIcon.className = 'result-icon correct';
        resultText.textContent = '정답입니다!';
        resultText.className = 'result-text correct';
        correctAnswerText.style.display = 'none';
    } else {
        resultIcon.textContent = '✗';
        resultIcon.className = 'result-icon incorrect';
        resultText.textContent = '틀렸습니다.';
        resultText.className = 'result-text incorrect';
        
        if (question.options) {
            correctAnswerText.textContent = `정답: ${correctAnswer}번 ${question.options[correctAnswer - 1]}`;
            correctAnswerText.style.display = 'block';
        }
    }
}

// 다음 문제
function nextQuestion() {
    currentQuestionIndex++;
    loadQuestion();
}

// 최종 결과 표시
function showFinalResult() {
    // 퀴즈 영역 숨기기
    document.querySelector('.quiz-container').style.display = 'none';
    
    // 최종 결과 표시
    finalResult.style.display = 'block';
    finalScore.textContent = score;
    finalTotal.textContent = tempQuizData.length;
    
    const percentage = Math.round((score / tempQuizData.length) * 100);
    scorePercentage.textContent = `${percentage}%`;
    
    // 점수 원형 그래프 애니메이션
    animateScoreCircle(percentage);
}

// 점수 원형 그래프 애니메이션
function animateScoreCircle(percentage) {
    const circle = document.querySelector('.score-circle');
    const circumference = 2 * Math.PI * 80; // 반지름 80px
    
    // CSS 변수로 애니메이션 적용
    circle.style.setProperty('--percentage', percentage);
    
    // 숫자 카운트 애니메이션
    let currentScore = 0;
    const targetScore = score;
    const increment = targetScore / 30; // 30프레임으로 나누어 애니메이션
    
    function countUp() {
        currentScore += increment;
        if (currentScore >= targetScore) {
            finalScore.textContent = targetScore;
        } else {
            finalScore.textContent = Math.floor(currentScore);
            requestAnimationFrame(countUp);
        }
    }
    
    setTimeout(countUp, 300);
}