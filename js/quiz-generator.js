// 퀴즈 생성기 JavaScript

let parsedQuizData = null;
let currentQuizType = null;

// DOM 요소들
const quizTypeSelect = document.getElementById('quizType');
const fileNameInput = document.getElementById('fileName');
const quizInput = document.getElementById('quizInput');
const parseBtn = document.getElementById('parseBtn');
const downloadBtn = document.getElementById('downloadBtn');
const testBtn = document.getElementById('testBtn');
const previewSection = document.querySelector('.preview-section');
const questionCount = document.getElementById('questionCount');
const previewType = document.getElementById('previewType');
const previewData = document.getElementById('previewData');

// 형식 탭 관련
const formatTabs = document.querySelectorAll('.format-tab');
const formatExamples = document.querySelectorAll('.format-example');

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', function() {
    initializeEventListeners();
});

// 이벤트 리스너 초기화
function initializeEventListeners() {
    // 형식 탭 클릭
    formatTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const type = this.getAttribute('data-type');
            switchFormatTab(type);
        });
    });
    
    // 퀴즈 타입 선택 시 형식 탭도 변경
    quizTypeSelect.addEventListener('change', function() {
        const selectedType = this.value;
        if (selectedType) {
            switchFormatTab(selectedType);
        }
    });
    
    // 버튼 이벤트
    parseBtn.addEventListener('click', parseQuizData);
    downloadBtn.addEventListener('click', downloadJSFile);
    testBtn.addEventListener('click', openTestQuiz);
    
    // 입력 필드 변경 시 미리보기 숨기기
    [quizTypeSelect, fileNameInput, quizInput].forEach(element => {
        element.addEventListener('input', function() {
            hidePreview();
        });
    });
}

// 형식 탭 전환
function switchFormatTab(type) {
    formatTabs.forEach(tab => {
        tab.classList.toggle('active', tab.getAttribute('data-type') === type);
    });
    
    formatExamples.forEach(example => {
        example.classList.toggle('active', example.getAttribute('data-type') === type);
    });
    
    // 퀴즈 타입 선택도 동기화
    if (quizTypeSelect.value !== type) {
        quizTypeSelect.value = type;
    }
}

// 퀴즈 데이터 파싱
function parseQuizData() {
    const fileName = fileNameInput.value.trim();
    const quizType = quizTypeSelect.value;
    const inputText = quizInput.value.trim();
    
    // 유효성 검사
    if (!fileName) {
        alert('파일명을 입력해주세요.');
        fileNameInput.focus();
        return;
    }
    
    if (!quizType) {
        alert('퀴즈 유형을 선택해주세요.');
        quizTypeSelect.focus();
        return;
    }
    
    if (!inputText) {
        alert('퀴즈 데이터를 입력해주세요.');
        quizInput.focus();
        return;
    }
    
    try {
        // 로딩 상태
        parseBtn.classList.add('loading');
        
        // 데이터 파싱
        parsedQuizData = parseInputData(inputText, quizType);
        currentQuizType = quizType;
        
        // 미리보기 표시
        showPreview();
        
        // 버튼 활성화
        downloadBtn.disabled = false;
        testBtn.disabled = false;
        
    } catch (error) {
        alert('데이터 파싱 중 오류가 발생했습니다:\n' + error.message);
        console.error('Parsing error:', error);
    } finally {
        parseBtn.classList.remove('loading');
    }
}

// 입력 데이터 파싱 함수
function parseInputData(inputText, quizType) {
    // 실제 줄바꿈으로 분할 (Windows와 Unix 스타일 모두 처리)
    const questions = inputText.split(/\r?\n\s*\r?\n/).filter(q => q.trim());
    const quizData = [];
    
    console.log('분할된 문제 개수:', questions.length);
    console.log('분할된 문제들:', questions);
    
    questions.forEach((questionBlock, index) => {
        const lines = questionBlock.trim().split(/\r?\n/).map(line => line.trim()).filter(line => line);
        
        console.log(`문제 ${index + 1} 라인들:`, lines);
        
        if (lines.length === 0) return;
        
        const questionText = lines[0];
        
        if (quizType === 'flashcard') {
            // 암기 카드형: 문제와 정답만
            const answerLine = lines.find(line => line.startsWith('*'));
            if (!answerLine) {
                throw new Error(`${index + 1}번 문제에 정답(*로 시작하는 줄)이 없습니다.`);
            }
            
            quizData.push({
                question: questionText,
                answer: answerLine.substring(1).trim()
            });
            
        } else if (quizType === 'random') {
            // 랜덤형: 정답만 입력, 오답은 나중에 생성
            const answerLine = lines.find(line => line.startsWith('*'));
            if (!answerLine) {
                throw new Error(`${index + 1}번 문제에 정답(*로 시작하는 줄)이 없습니다.`);
            }
            
            quizData.push({
                question: questionText,
                correctAnswer: answerLine.substring(1).trim()
            });
            
        } else {
            // 고정형, 순서 변경형: 문제 + 4개 선택지
            const options = [];
            let correctAnswerIndex = -1;
            
            for (let i = 1; i < lines.length; i++) {
                const line = lines[i];
                if (line.startsWith('*')) {
                    options.push(line.substring(1).trim());
                    correctAnswerIndex = options.length;
                } else {
                    options.push(line);
                }
            }
            
            if (correctAnswerIndex === -1) {
                console.error(`문제 ${index + 1} 라인들:`, lines);
                throw new Error(`${index + 1}번 문제에 정답(*로 시작하는 선택지)이 없습니다.`);
            }
            
            if (options.length < 2) {
                throw new Error(`${index + 1}번 문제에 최소 2개의 선택지가 필요합니다.`);
            }
            
            quizData.push({
                question: questionText,
                options: options,
                answer: correctAnswerIndex
            });
        }
    });
    
    if (quizData.length === 0) {
        throw new Error('파싱된 문제가 없습니다. 입력 형식을 확인해주세요.');
    }
    
    // 랜덤형의 경우 오답 생성
    if (quizType === 'random') {
        return generateRandomQuizData(quizData);
    }
    
    return quizData;
}

// 랜덤형 퀴즈 데이터 생성 (오답을 다른 문제의 정답으로 채움)
function generateRandomQuizData(rawData) {
    const allAnswers = rawData.map(item => item.correctAnswer);
    
    return rawData.map((item, index) => {
        const options = [item.correctAnswer];
        const otherAnswers = allAnswers.filter((answer, i) => i !== index);
        
        // 다른 답들 중에서 랜덤하게 선택 (중복 제거)
        const shuffledOthers = [...otherAnswers].sort(() => Math.random() - 0.5);
        const selectedOthers = shuffledOthers.slice(0, Math.min(3, shuffledOthers.length));
        
        // 부족한 선택지는 기본값으로 채움
        while (selectedOthers.length < 3) {
            selectedOthers.push(`선택지 ${selectedOthers.length + 1}`);
        }
        
        options.push(...selectedOthers);
        
        // 선택지 섞기
        const correctAnswer = options[0];
        const shuffledOptions = [...options].sort(() => Math.random() - 0.5);
        const correctIndex = shuffledOptions.indexOf(correctAnswer) + 1;
        
        return {
            question: item.question,
            options: shuffledOptions,
            answer: correctIndex
        };
    });
}

// 미리보기 표시
function showPreview() {
    questionCount.textContent = parsedQuizData.length;
    
    const typeNames = {
        'fixed': '고정형',
        'random': '랜덤형', 
        'shuffled': '순서 변경형',
        'flashcard': '암기 카드형'
    };
    previewType.textContent = typeNames[currentQuizType] || currentQuizType;
    
    // 데이터 미리보기 (처음 3개 문제만)
    const previewItems = parsedQuizData.slice(0, 3);
    let previewText = '';
    
    previewItems.forEach((item, index) => {
        previewText += `// 문제 ${index + 1}\n`;
        previewText += `{\n`;
        previewText += `    question: "${item.question}",\n`;
        
        if (currentQuizType === 'flashcard') {
            previewText += `    answer: "${item.answer}"\n`;
        } else {
            previewText += `    options: [\n`;
            item.options.forEach(option => {
                previewText += `        "${option}",\n`;
            });
            previewText += `    ],\n`;
            previewText += `    answer: ${item.answer}\n`;
        }
        
        previewText += `}`;
        if (index < previewItems.length - 1) previewText += ',';
        previewText += '\n\n';
    });
    
    if (parsedQuizData.length > 3) {
        previewText += `// ... 총 ${parsedQuizData.length}개 문제`;
    }
    
    previewData.textContent = previewText;
    previewSection.style.display = 'block';
    
    // 미리보기로 스크롤
    previewSection.scrollIntoView({ behavior: 'smooth' });
}

// 미리보기 숨기기
function hidePreview() {
    previewSection.style.display = 'none';
    downloadBtn.disabled = true;
    testBtn.disabled = true;
    parsedQuizData = null;
    currentQuizType = null;
}

// JS 파일 다운로드
function downloadJSFile() {
    if (!parsedQuizData) {
        alert('먼저 데이터를 파싱해주세요.');
        return;
    }
    
    const fileName = fileNameInput.value.trim();
    const jsContent = generateJSFileContent(parsedQuizData);
    
    // 파일 다운로드
    const blob = new Blob([jsContent], { type: 'application/javascript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${fileName}.js`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    // 성공 메시지
    alert(`${fileName}.js 파일이 다운로드되었습니다!`);
}

// JS 파일 내용 생성
function generateJSFileContent(data) {
    const jsonString = JSON.stringify(data, null, 4);
    return `let quizData = ${jsonString};`;
}

// 임시 퀴즈 테스트 열기
function openTestQuiz() {
    if (!parsedQuizData) {
        alert('먼저 데이터를 파싱해주세요.');
        return;
    }
    
    // 임시 퀴즈 데이터를 세션 스토리지에 저장
    const tempQuizData = {
        type: currentQuizType,
        data: parsedQuizData,
        title: fileNameInput.value.trim() || '임시 퀴즈'
    };
    
    sessionStorage.setItem('tempQuizData', JSON.stringify(tempQuizData));
    
    // 임시 퀴즈 페이지 열기
    window.open('temp-quiz.html', '_blank');
}
