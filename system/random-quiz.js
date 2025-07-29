// 랜덤형 퀴즈 모드 - 정답을 제외한 오답이 다른 문제들의 정답으로 채워짐
let randomCurrentQuestion = 0;
let randomCorrectCount = 0;
let randomIncorrectCount = 0;

function initRandomQuiz() {
    console.log('Initializing random quiz'); // 디버그용
    console.log('Quiz data available:', !!window.quizData, window.quizData ? window.quizData.length : 0); // 디버그용
    
    // 랜덤형 데이터 준비
    currentQuizData = prepareRandomQuizData();
    
    // 상태 초기화
    randomCurrentQuestion = 0;
    randomCorrectCount = 0;
    randomIncorrectCount = 0;
    
    console.log('Random quiz initialized with', currentQuizData.length, 'questions'); // 디버그용
    
    // 이벤트 리스너 설정
    setupRandomQuizEvents();
    
    // 첫 문제 로딩
    loadRandomQuestion();
}

function setupRandomQuizEvents() {
    const nextBtn = document.getElementById('next-button');
    const restartBtn = document.getElementById('restart-button');
    
    console.log('Setting up random quiz events, buttons found:', {
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
            randomCurrentQuestion++;
            if (randomCurrentQuestion < currentQuizData.length) {
                loadRandomQuestion();
            } else {
                showRandomResult();
            }
        });
    }
    
    if (newRestartBtn) {
        newRestartBtn.addEventListener('click', () => {
            resetToModeSelection();
        });
    }
}

function prepareRandomQuizData() {
    console.log('Preparing random quiz data'); // 디버그용
    
    const shuffled = shuffleArray([...quizData]);
    console.log('Shuffled quiz data:', shuffled.length, 'items'); // 디버그용

    const randomData = shuffled.map((current, idx, all) => {
        // 현재 문제의 정답 가져오기
        const currentAnswer = current.options[current.answer - 1];
        
        console.log('Processing question:', current.question, 'correct answer:', currentAnswer); // 디버그용
        
        // 다른 문제들의 정답들 가져오기 (현재 문제 제외)
        const otherAnswers = all
            .filter(item => item !== current)
            .map(item => item.options[item.answer - 1])
            .filter(answer => answer !== currentAnswer); // 중복 제거

        console.log('Other answers available:', otherAnswers.length); // 디버그용

        // 다른 정답들 중에서 3개 선택 (부족하면 사용 가능한 만큼만)
        const availableWrongOptions = shuffleArray([...otherAnswers]);
        const wrongOptions = availableWrongOptions.slice(0, 3);
        
        // 만약 3개가 안 되면 원래 선택지의 오답들로 채우기
        if (wrongOptions.length < 3) {
            const originalWrongOptions = current.options.filter((option, index) => index + 1 !== current.answer);
            const additionalOptions = originalWrongOptions.slice(0, 3 - wrongOptions.length);
            wrongOptions.push(...additionalOptions);
        }

        // 정답을 랜덤 위치에 삽입
        const correctIndex = Math.floor(Math.random() * 4);
        const finalOptions = [...wrongOptions];
        finalOptions.splice(correctIndex, 0, currentAnswer);
        
        // 4개가 안 되면 남은 자리를 원래 선택지로 채우기
        while (finalOptions.length < 4) {
            const remainingOriginal = current.options.find(opt => !finalOptions.includes(opt));
            if (remainingOriginal) {
                finalOptions.push(remainingOriginal);
            } else {
                finalOptions.push('기타 선택지');
            }
        }

        const result = {
            question: current.question,
            options: finalOptions.slice(0, 4), // 정확히 4개만
            answer: correctIndex + 1
        };
        
        console.log('Prepared random question:', result); // 디버그용
        
        return result;
    });
    
    console.log('Random quiz data prepared:', randomData.length, 'questions'); // 디버그용
    return randomData;
}

function loadRandomQuestion() {
    console.log('Loading random question:', randomCurrentQuestion + 1, 'of', currentQuizData.length); // 디버그용
    
    const q = currentQuizData[randomCurrentQuestion];
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
    
    console.log('Current random question data:', q); // 디버그용
    
    questionEl.textContent = q.question;
    optionsEl.innerHTML = '';
    if (resultEl) resultEl.textContent = '';
    if (nextBtn) nextBtn.style.display = 'none';

    q.options.forEach((opt, idx) => {
        const li = document.createElement('li');
        li.textContent = `${idx + 1}. ${opt}`;
        li.onclick = () => checkRandomAnswer(idx + 1, li);
        optionsEl.appendChild(li);
    });
}

function checkRandomAnswer(selected, selectedElement) {
    const correctAnswer = currentQuizData[randomCurrentQuestion].answer;
    const resultEl = document.getElementById('result');
    const nextBtn = document.getElementById('next-button');
    
    console.log('Checking random answer:', selected, 'vs correct:', correctAnswer); // 디버그용
    
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
        randomCorrectCount++;
    } else {
        if (resultEl) resultEl.textContent = `오답입니다! 정답은 ${correctAnswer}번입니다.`;
        randomIncorrectCount++;
    }

    // 모든 선택지 클릭 비활성화
    options.forEach(option => {
        option.style.pointerEvents = 'none';
    });

    if (nextBtn) nextBtn.style.display = 'inline-block';
}

function showRandomResult() {
    const questionEl = document.getElementById('question');
    const optionsEl = document.getElementById('options');
    const resultEl = document.getElementById('result');
    const nextBtn = document.getElementById('next-button');
    const restartBtn = document.getElementById('restart-button');
    
    if (questionEl) questionEl.textContent = '퀴즈 완료!';
    if (optionsEl) optionsEl.innerHTML = '';
    if (resultEl) resultEl.innerHTML = `정답: ${randomCorrectCount}개<br>오답: ${randomIncorrectCount}개<br><br>모드 선택으로 돌아가려면 다시 시작을 클릭하세요.`;
    if (nextBtn) nextBtn.style.display = 'none';
    if (restartBtn) restartBtn.style.display = 'inline-block';
}
