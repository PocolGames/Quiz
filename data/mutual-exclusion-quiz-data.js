let quizData = [
    {
        question: "1. 상호배제를 포함하는 프로그램의 전형적인 구조 중 임계구역 진입 코드의 역할이 아닌 것은?",
        options: [
            "현재 임계구역을 실행 중인 스레드가 있는지 검사",
            "다른 스레드가 들어오지 못하도록 조치",
            "진입이 가능해질 때까지 대기",
            "임계구역에서 사용할 변수 초기화"
        ],
        answer: 4
    },
    {
        question: "2. 상호배제 구현 방법 중 소프트웨어적 방법의 대표적인 예는?",
        options: [
            "인터럽트 서비스 금지",
            "Peterson 알고리즘",
            "원자 명령 사용",
            "뮤텍스 사용"
        ],
        answer: 2
    },
    {
        question: "3. 오늘날 대부분 사용되는 상호배제 구현 방법은?",
        options: [
            "소프트웨어적 방법",
            "하드웨어적 방법",
            "혼합 방법",
            "운영체제 의존 방법"
        ],
        answer: 2
    },
    {
        question: "4. Peterson 알고리즘에서 사용되는 변수가 아닌 것은?",
        options: [
            "flag 배열",
            "turn 변수",
            "lock 변수",
            "상대방 번호 j"
        ],
        answer: 3
    },
    {
        question: "5. Peterson 알고리즘의 문제점이 아닌 것은?",
        options: [
            "while 구문에서 CPU 낭비",
            "딱 2개의 스레드만 지원",
            "N개 지원 시 성능 낭비",
            "데드락 발생 가능성"
        ],
        answer: 4
    },
    {
        question: "6. 인터럽트 서비스 금지 방법에서 사용되는 어셈블리 명령은?",
        options: [
            "cli와 sti",
            "push와 pop",
            "mov와 add",
            "jmp와 call"
        ],
        answer: 1
    },
    {
        question: "7. 인터럽트 서비스 금지 방법의 문제점이 아닌 것은?",
        options: [
            "모든 인터럽트가 무시된다",
            "멀티 코어에서 활용 불가",
            "다른 CPU에서 타이머 인터럽트 처리 가능",
            "메모리 사용량 증가"
        ],
        answer: 4
    },
    {
        question: "8. 단순 lock 변수를 사용한 상호배제의 진입 코드에서 lock을 확인하는 while 조건은?",
        options: [
            "while(lock == 0)",
            "while(lock == 1)",
            "while(lock != true)",
            "while(lock > 0)"
        ],
        answer: 2
    },
    {
        question: "9. 단순 lock 변수로 상호배제를 구현할 때 실패하는 이유는?",
        options: [
            "lock 변수 값을 읽는 명령과 1을 저장하는 명령 사이에 컨텍스트 스위칭이 발생하기 때문",
            "lock 변수가 초기화되지 않아서",
            "메모리 접근 속도가 느려서",
            "컴파일러 최적화 때문에"
        ],
        answer: 1
    },
    {
        question: "10. 원자명령(atomic instruction)이 도입된 이유는?",
        options: [
            "더 빠른 실행 속도를 위해",
            "lock 변수를 읽고 쓰는 두 명령을 한 번에 처리하기 위해",
            "메모리 사용량을 줄이기 위해",
            "코드를 단순화하기 위해"
        ],
        answer: 2
    },
    {
        question: "11. TSL(Test and Set Lock) 명령의 특징은?",
        options: [
            "1970년대 AMD에서 시작되었다",
            "원자 명령의 일종이다",
            "소프트웨어로만 구현된다",
            "2개 이상의 명령으로 구성된다"
        ],
        answer: 2
    },
    {
        question: "12. Peterson 알고리즘에서 프로세스 i (i는 0 또는 1)가 진입 코드에서 수행하는 작업 순서는?",
        options: [
            "turn = j, flag[i] = true",
            "flag[i] = true, turn = j",
            "flag[j] = false, turn = i",
            "turn = i, flag[j] = true"
        ],
        answer: 2
    },
    {
        question: "13. Peterson 알고리즘의 while 루프 조건은?",
        options: [
            "while (flag[j] && turn == i)",
            "while (flag[j] && turn == j)",
            "while (flag[i] && turn == j)",
            "while (flag[i] || turn == i)"
        ],
        answer: 2
    },
    {
        question: "14. 임계구역 진출 코드에서 Peterson 알고리즘이 수행하는 작업은?",
        options: [
            "turn = j",
            "flag[i] = false",
            "flag[j] = false",
            "turn = i"
        ],
        answer: 2
    },
    {
        question: "15. 하드웨어적 방법이 소프트웨어적 방법보다 선호되는 이유는?",
        options: [
            "구현이 더 쉽다",
            "여러 문제점이 노출되지 않는다",
            "코드가 더 간단하다",
            "메모리를 덜 사용한다"
        ],
        answer: 2
    },
    {
        question: "16. cli 명령의 기능은?",
        options: [
            "clear interrupt flag - 인터럽트 서비스 금지",
            "call interrupt - 인터럽트 호출",
            "check lock - 락 상태 확인",
            "clear lock - 락 해제"
        ],
        answer: 1
    },
    {
        question: "17. sti 명령의 기능은?",
        options: [
            "stop interrupt - 인터럽트 중지",
            "set interrupt flag - 인터럽트 서비스 허용",
            "start lock - 락 시작",
            "set lock - 락 설정"
        ],
        answer: 2
    },
    {
        question: "18. 멀티 코어나 다중 CPU 시스템에서 인터럽트 금지 방법이 효과가 없는 이유는?",
        options: [
            "한 CPU의 인터럽트 금지로 다른 CPU에게 인터럽트를 금지시킬 수 없기 때문",
            "멀티 코어에서는 인터럽트가 더 빠르게 발생하기 때문",
            "인터럽트 금지 명령이 지원되지 않기 때문",
            "메모리가 공유되지 않기 때문"
        ],
        answer: 1
    },
    {
        question: "19. 원자 명령의 등장 시기는?",
        options: [
            "1960년대 IBM",
            "1970년대 Intel Pentium",
            "1980년대 AMD",
            "1990년대 Motorola"
        ],
        answer: 2
    },
    {
        question: "20. 상호배제 구현에서 가장 중요한 요구사항은?",
        options: [
            "빠른 실행 속도",
            "임계구역에 오직 1개의 스레드만 진입",
            "적은 메모리 사용",
            "간단한 코드 작성"
        ],
        answer: 2
    }
];
