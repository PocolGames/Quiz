// 순서변경형 퀴즈 모드 - 선택지 순서가 매번 섞임
let shuffledCurrentQuestion = 0;
let shuffledCorrectCount = 0;
let shuffledIncorrectCount = 0;

function initShuffledQuiz() {
    console.log('Initializing shuffled quiz'); // 디버그용
    console.log('Quiz data available:', !!window.quizData, window.quizData ? window.quizData.length : 0); // 디버그용
    
    // 퀴즈 데이터 복사 및 문제 순서 랜덤으로 섞기
    currentQuizData = shuffleArray([...quizData]);
    
    // 상태 초기화
    shuffledCurrentQuestion = 0;
    shuffledCorrectCount = 0;
    shuffledIncorrectCount = 0;
    
    console.log('Shuffled quiz initialized with', currentQuizData.length, 'questions'); // 디버그용
    
    // 이벤트 리스너 설정
    setupShuffledQuizEvents();
    
    // 첫 문제 로딩
    loadShuffledQuestion();
}

function setupShuffledQuizEvents() {
    const nextBtn = document.getElementById('next-button');
    const restartBtn = document.getElementById('restart-button');
    
    console.log('Setting up shuffled quiz events, buttons found:', {
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
            shuffledCurrentQuestion++;
            if (shuffledCurrentQuestion < currentQuizData.length) {
                loadShuffledQuestion();
            } else {
                showShuffledResult();
            }
        });
    }
    
    if (newRestartBtn) {
        newRestartBtn.addEventListener('click', () => {
            resetToModeSelection();
        });
    }
}

function loadShuffledQuestion() {
    console.log('Loading shuffled question:', shuffledCurrentQuestion + 1, 'of', currentQuizData.length); // 디버그용
    
    const q = currentQuizData[shuffledCurrentQuestion];
    const questionEl = document.getElementById('question');
    const optionsEl = document.getElementById('options');
    const resultEl = document.getElementById('result');
    const nextBtn = document.getElementById('next-button');
    
    if (!questionEl || !optionsEl) {
        console.error('Required elements not found:', {
            question: !!questionEl,
            options: !!optionsEl
        });
        return;
    }
    
    console.log('Current question data:', q); // 디버그용
    
    questionEl.innerHTML = q.question;
    optionsEl.innerHTML = '';
    if (resultEl) resultEl.textContent = '';
    if (nextBtn) nextBtn.style.display = 'none';

    // 선택지를 인덱스와 함께 배열로 만들기
    const optionsWithIndex = q.options.map((option, index) => ({
        text: option,
        originalIndex: index + 1 // 1부터 시작하도록 수정
    }));

    console.log('Options with index:', optionsWithIndex); // 디버그용

    // 선택지 순서 섞기
    const shuffledOptions = shuffleArray([...optionsWithIndex]);
    
    console.log('Shuffled options:', shuffledOptions); // 디버그용

    shuffledOptions.forEach((option, displayIndex) => {
        const li = document.createElement('li');
        li.textContent = `${displayIndex + 1}. ${option.text}`;
        li.onclick = () => checkShuffledAnswer(option.originalIndex, li);
        optionsEl.appendChild(li);
    });
}

function checkShuffledAnswer(selectedOriginalIndex, selectedElement) {
    const correctAnswer = currentQuizData[shuffledCurrentQuestion].answer;
    const resultEl = document.getElementById('result');
    const nextBtn = document.getElementById('next-button');
    
    console.log('Checking shuffled answer:', selectedOriginalIndex, 'vs correct:', correctAnswer); // 디버그용
    
    // 모든 선택지를 순회하며 클래스 추가
    const options = document.querySelectorAll('#options li');
    
    // 올바른 답과 선택한 답을 찾기
    options.forEach((option, displayIndex) => {
        const optionText = option.textContent.substring(3); // "1. " 부분 제거
        const originalOptions = currentQuizData[shuffledCurrentQuestion].options;
        
        // 이 선택지가 원래 몇 번째 선택지인지 찾기
        const originalIndex = originalOptions.indexOf(optionText) + 1;
        
        if (originalIndex === correctAnswer) {
            option.classList.add('correct');
        } else if (originalIndex === selectedOriginalIndex) {
            option.classList.add('incorrect');
        }
    });
    
    if (selectedOriginalIndex === correctAnswer) {
        if (resultEl) resultEl.textContent = '정답입니다!';
        shuffledCorrectCount++;
    } else {
        if (resultEl) resultEl.textContent = `오답입니다! 정답은 "${currentQuizData[shuffledCurrentQuestion].options[correctAnswer - 1]}"입니다.`;
        shuffledIncorrectCount++;
    }

    // 모든 선택지 클릭 비활성화
    options.forEach(option => {
        option.style.pointerEvents = 'none';
    });

    if (nextBtn) nextBtn.style.display = 'inline-block';
}

function showShuffledResult() {
    const questionEl = document.getElementById('question');
    const optionsEl = document.getElementById('options');
    const resultEl = document.getElementById('result');
    const nextBtn = document.getElementById('next-button');
    const restartBtn = document.getElementById('restart-button');
    
    if (questionEl) questionEl.textContent = '퀴즈 완료!';
    if (optionsEl) optionsEl.innerHTML = '';
    if (resultEl) resultEl.innerHTML = `정답: ${shuffledCorrectCount}개<br>오답: ${shuffledIncorrectCount}개<br><br>모드 선택으로 돌아가려면 다시 시작을 클릭하세요.`;
    if (nextBtn) nextBtn.style.display = 'none';
    if (restartBtn) restartBtn.style.display = 'inline-block';
}
