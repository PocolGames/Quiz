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
    },
    {
        question: "21. Peterson 알고리즘에서 'turn' 변수의 역할은?",
        options: [
            "현재 진입한 스레드 번호 저장",
            "양보 변수로 상대방에게 기회를 주는 역할",
            "임계구역 실행 횟수 저장",
            "에러 상태 표시"
        ],
        answer: 2
    },
    {
        question: "22. Peterson 알고리즘에서 flag[i] = true의 의미는?",
        options: [
            "프로세스 i가 임계구역 실행 완료",
            "프로세스 i가 임계구역에 들어가려고 함",
            "프로세스 i가 대기 상태",
            "프로세스 i가 비활성화됨"
        ],
        answer: 2
    },
    {
        question: "23. 인터럽트 금지 방법에서 '모든 인터럽트가 무시되는 문제'란?",
        options: [
            "필요한 타이머나 I/O 인터럽트도 처리되지 않음",
            "인터럽트 처리가 너무 빨라짐",
            "인터럽트 큐가 오버플로우됨",
            "인터럽트 우선순위가 무시됨"
        ],
        answer: 1
    },
    {
        question: "24. 소프트웨어적 방법의 한계로 인해 하드웨어적 방법으로 전환된 주요 이유는?",
        options: [
            "소프트웨어 방법이 느려서",
            "구현 시 여러 문제 노출",
            "메모리 사용량이 많아서",
            "코드가 복잡해서"
        ],
        answer: 2
    },
    {
        question: "25. 단순 lock 변수 방법에서 entry 코드와 exit 코드의 기본 구조는?",
        options: [
            "entry: while(lock), exit: lock = 0",
            "entry: while(lock==1) lock=1, exit: lock=0",
            "entry: lock=1, exit: while(lock)",
            "entry: if(lock) wait, exit: signal"
        ],
        answer: 2
    },
    {
        question: "26. Peterson 알고리즘이 2개의 스레드만 지원하는 이유는?",
        options: [
            "flag 배열이 2개 요소만 있기 때문",
            "turn 변수가 0 또는 1 값만 가지기 때문",
            "while 조건이 2개 스레드용으로 설계되었기 때문",
            "위의 모든 것"
        ],
        answer: 4
    },
    {
        question: "27. 원자 명령이 필요한 상황에서 일반 명령 2개를 사용할 때의 문제점은?",
        options: [
            "메모리 접근 시간이 길어짐",
            "두 명령 사이에 컨텍스트 스위칭 발생 가능",
            "CPU 사용률이 높아짐",
            "컴파일러 최적화 방해"
        ],
        answer: 2
    },
    {
        question: "28. 상호배제 프로그램 구조에서 각 부분의 올바른 순서는?",
        options: [
            "임계구역 → 진입 코드 → 진출 코드 → 일반 코드",
            "일반 코드 → 임계구역 → 진입 코드 → 진출 코드",
            "일반 코드 → 진입 코드 → 임계구역 → 진출 코드",
            "진입 코드 → 일반 코드 → 임계구역 → 진출 코드"
        ],
        answer: 3
    },
    {
        question: "29. 하드웨어적 방법의 두 가지 주요 접근법은?",
        options: [
            "인터럽트 금지와 원자 명령",
            "뮤텍스와 세마포",
            "캐시와 버퍼",
            "파이프라인과 분기 예측"
        ],
        answer: 1
    },
    {
        question: "30. TSL이 등장하기 전에 사용된 상호배제 구현 방법의 주요 문제점은?",
        options: [
            "너무 복잡한 알고리즘",
            "멀티 CPU 환경 미지원",
            "원자성 보장 불가",
            "위의 모든 것"
        ],
        answer: 4
    }
];
