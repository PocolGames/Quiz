// 랜덤형 퀴즈 모드 - 정답을 제외한 오답이 다른 문제들의 정답으로 채워짐
let currentQuestion = 0;
let correctCount = 0;
let incorrectCount = 0;

function initRandomQuiz() {
    // 랜덤형 데이터 준비
    currentQuizData = prepareRandomQuizData();
    
    // 상태 초기화
    currentQuestion = 0;
    correctCount = 0;
    incorrectCount = 0;
    
    // 이벤트 리스너 설정
    setupRandomQuizEvents();
    
    // 첫 문제 로딩
    loadRandomQuestion();
}

function setupRandomQuizEvents() {
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
            loadRandomQuestion();
        } else {
            showRandomResult();
        }
    });
    
    newRestartBtn.addEventListener('click', () => {
        resetToModeSelection();
    });
}

function prepareRandomQuizData() {
    const shuffled = shuffleArray([...quizData]);

    return shuffled.map((current, idx, all) => {
        // 현재 문제의 정답 가져오기
        const currentAnswer = current.options[current.answer - 1];
        
        // 다른 문제들의 정답들 가져오기 (현재 문제 제외)
        const otherAnswers = all
            .filter(item => item !== current)
            .map(item => item.options[item.answer - 1]);

        // 다른 정답들 중에서 3개 선택
        const wrongOptions = shuffleArray([...otherAnswers]).slice(0, 3);

        // 정답을 랜덤 위치에 삽입
        const correctIndex = Math.floor(Math.random() * 4);
        const options = [...wrongOptions];
        options.splice(correctIndex, 0, currentAnswer);

        return {
            question: current.question,
            options,
            answer: correctIndex + 1
        };
    });
}

function loadRandomQuestion() {
    const q = currentQuizData[currentQuestion];
    const questionEl = document.getElementById('question');
    const optionsEl = document.getElementById('options');
    const resultEl = document.getElementById('result');
    const nextBtn = document.getElementById('next-button');
    
    questionEl.textContent = q.question;
    optionsEl.innerHTML = '';
    resultEl.textContent = '';
    nextBtn.style.display = 'none';

    q.options.forEach((opt, idx) => {
        const li = document.createElement('li');
        li.textContent = `${idx + 1}. ${opt}`;
        li.onclick = () => checkRandomAnswer(idx + 1, li);
        optionsEl.appendChild(li);
    });
}

function checkRandomAnswer(selected, selectedElement) {
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

function showRandomResult() {
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
