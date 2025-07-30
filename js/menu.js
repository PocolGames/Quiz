// 메뉴 데이터 구조
const menuData = {
    "세명대학교": {
        "전공": {
            "컴퓨터학부": {
                "데이터통신과 네트워킹": {
                    "연습문제 1장 ~ 6장 (테스트용)": {
                        file: "quiz_page/cs_network.html",
                        info: "2025년도 3학년 1학기 중간고사"
                    }
                },
                "웹프로그래밍": {
                    "중간고사 PDF 정리 (테스트용)": {
                        file: "quiz_page/cs_webprogramming.html",
                        info: "2025년도 3학년 1학기 중간고사"
                    }
                },
                "운영체제": {
                    "CPU 스케줄링 알고리즘 AI문제 (테스트용)": {
                        file: "quiz_page/cpu_scheduling.html",
                        info: "2025년도 3학년 1학기 기말고사"
                    }
                }
            }
        }
    },
    "그 외": {
        "영어": {
            "해커스 토익": {
                "1번 ~ 41번 (테스트용)": {
                    file: "quiz_page/voca_hackers_1.html",
                    info: "단어장"
                }
            }
        }
    }
};

// 검색 기능
function searchQuizzes(keyword) {
    const results = [];
    
    function searchInObject(obj, path = []) {
        for (let key in obj) {
            const currentPath = [...path, key];
            
            if (obj[key].file) {
                // 최종 퀴즈 항목인 경우 - 과목명에서 검색
                const subjectName = currentPath[currentPath.length - 2]; // 과목명
                if (subjectName && subjectName.toLowerCase().includes(keyword.toLowerCase())) {
                    results.push({
                        name: key,
                        path: currentPath,
                        file: obj[key].file,
                        info: obj[key].info
                    });
                }
            } else {
                // 중간 경로인 경우 재귀 검색
                searchInObject(obj[key], currentPath);
            }
        }
    }
    
    searchInObject(menuData);
    return results;
}

// 메뉴 렌더링 함수
function renderMenu() {
    const menuContainer = document.querySelector('.menu-container');
    menuContainer.innerHTML = '';
    
    function createMenuElement(obj, level = 0, parentPath = []) {
        const ul = document.createElement('ul');
        ul.className = `menu-level-${level}`;
        
        for (let key in obj) {
            const li = document.createElement('li');
            const currentPath = [...parentPath, key];
            
            if (obj[key].file) {
                // 최종 퀴즈 항목
                li.innerHTML = `
                    <div class="quiz-item" onclick="location.href='${obj[key].file}'">
                        <span class="quiz-name">${key}</span>
                        <span class="quiz-info">${obj[key].info}</span>
                        <button class="quiz-button">문제 풀기</button>
                    </div>
                `;
            } else {
                // 폴더 항목
                const isExpanded = level <= 0; // 학교 레벨까지만 기본 펼침
                li.innerHTML = `
                    <div class="folder-item ${isExpanded ? 'expanded' : ''}" onclick="toggleFolder(this)">
                        <span class="folder-icon">${isExpanded ? '▼' : '▶'}</span>
                        <span class="folder-name">${key}</span>
                    </div>
                `;
                
                const subMenu = createMenuElement(obj[key], level + 1, currentPath);
                subMenu.style.display = isExpanded ? 'block' : 'none';
                li.appendChild(subMenu);
            }
            
            ul.appendChild(li);
        }
        
        return ul;
    }
    
    const menu = createMenuElement(menuData);
    menuContainer.appendChild(menu);
}

// 폴더 토글 함수
function toggleFolder(element) {
    const isExpanded = element.classList.contains('expanded');
    const icon = element.querySelector('.folder-icon');
    const subMenu = element.parentNode.querySelector('ul');
    
    if (isExpanded) {
        element.classList.remove('expanded');
        icon.textContent = '▶';
        subMenu.style.display = 'none';
    } else {
        element.classList.add('expanded');
        icon.textContent = '▼';
        subMenu.style.display = 'block';
    }
}

// 검색 결과 렌더링
function renderSearchResults(results) {
    const menuContainer = document.querySelector('.menu-container');
    
    if (results.length === 0) {
        menuContainer.innerHTML = '<div class="no-results">검색 결과가 없습니다.</div>';
        return;
    }
    
    let html = '<div class="search-results"><h3>검색 결과</h3>';
    
    results.forEach(result => {
        const pathString = result.path.slice(0, -1).join(' > ');
        html += `
            <div class="search-result-item">
                <div class="result-path">${pathString}</div>
                <div class="quiz-item" onclick="location.href='${result.file}'">
                    <span class="quiz-name">${result.name}</span>
                    <span class="quiz-info">${result.info}</span>
                    <button class="quiz-button">문제 풀기</button>
                </div>
            </div>
        `;
    });
    
    html += '</div>';
    menuContainer.innerHTML = html;
}

// 검색 입력 처리
function handleSearch() {
    const searchInput = document.querySelector('.search-input');
    const keyword = searchInput.value.trim();
    
    if (keyword === '') {
        renderMenu();
    } else {
        const results = searchQuizzes(keyword);
        renderSearchResults(results);
    }
}

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', function() {
    renderMenu();
    
    // 검색 입력 이벤트 리스너
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.addEventListener('input', handleSearch);
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                handleSearch();
            }
        });
    }
});
