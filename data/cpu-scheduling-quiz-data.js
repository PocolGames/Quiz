let quizData = [
    {
        question: "1. FCFS(First Come First Served) 스케줄링에 대한 설명 중 옳은 것은?",
        options: [
            "선점형 스케줄링 기법이다",
            "기아 현상이 발생할 수 있다",
            "먼저 도착한 스레드를 먼저 처리한다",
            "처리율이 높다"
        ],
        answer: 3
    },
    {
        question: "2. FCFS 스케줄링에서 호위 효과(convoy effect)란 무엇인가?",
        options: [
            "긴 스레드가 CPU를 오래 사용하면 늦게 도착한 짧은 스레드가 오래 대기하는 현상",
            "짧은 스레드가 긴 스레드보다 먼저 실행되는 현상",
            "스레드들이 순서대로 실행되는 현상",
            "컨텍스트 스위칭이 빈번하게 발생하는 현상"
        ],
        answer: 1
    },
    {
        question: "3. SJF(Shortest Job First) 스케줄링의 특징이 아닌 것은?",
        options: [
            "실행 시간이 가장 짧은 스레드를 선택한다",
            "평균 대기 시간을 최소화한다",
            "선점형 스케줄링이다",
            "스레드의 실행 시간을 미리 알 수 없어 비현실적이다"
        ],
        answer: 3
    },
    {
        question: "4. SRTF(Shortest Remaining Time First)에 대한 설명 중 옳은 것은?",
        options: [
            "비선점형 스케줄링이다",
            "SJF의 선점형 버전이다",
            "예상 실행 시간이 필요하지 않다",
            "기아 현상이 발생하지 않는다"
        ],
        answer: 2
    },
    {
        question: "5. Round-Robin 스케줄링의 특징으로 틀린 것은?",
        options: [
            "스레드들에게 공평한 실행 기회를 제공한다",
            "타임 슬라이스를 사용한다",
            "기아 현상이 발생한다",
            "선점형 스케줄링이다"
        ],
        answer: 3
    },
    {
        question: "6. Round-Robin에서 타임 슬라이스가 작을 때의 단점은?",
        options: [
            "기아 현상 발생",
            "호위 효과 발생",
            "스케줄링 오버헤드 증가",
            "평균 대기 시간 증가"
        ],
        answer: 3
    },
    {
        question: "7. Priority 스케줄링에서 기아 문제를 해결하는 방법은?",
        options: [
            "Round-Robin 방식 사용",
            "에이징(Aging) 기법",
            "FCFS 방식 사용",
            "타임 슬라이스 증가"
        ],
        answer: 2
    },
    {
        question: "8. MLQ(Multi-level Queue) 스케줄링의 특징은?",
        options: [
            "스레드가 큐 간에 자유롭게 이동할 수 있다",
            "스레드는 한 번 배정된 큐에서 이동하지 못한다",
            "모든 큐가 동일한 우선순위를 갖는다",
            "타임 슬라이스가 필요하지 않다"
        ],
        answer: 2
    },
    {
        question: "9. MLFQ(Multi-level Feedback Queue)에서 스레드가 하위 큐로 이동하는 경우는?",
        options: [
            "I/O 요청을 할 때",
            "큐 타임슬라이스를 다할 때",
            "우선순위가 높아질 때",
            "자발적으로 중단할 때"
        ],
        answer: 2
    },
    {
        question: "10. MLFQ에서 스레드가 상위 큐로 이동하는 경우는?",
        options: [
            "CPU 사용량이 증가할 때",
            "큐에서 오래 대기할 때 (에이징)",
            "메모리 사용량이 증가할 때",
            "타임 슬라이스를 다 사용할 때"
        ],
        answer: 2
    },
    {
        question: "11. 선점형 스케줄링 기법은 무엇인가?",
        options: [
            "실행 중인 스레드가 자발적으로 CPU를 양보하는 방식",
            "다른 스레드가 강제로 CPU를 빼앗을 수 있는 방식",
            "우선순위를 사용하지 않는 방식",
            "타임 슬라이스를 사용하지 않는 방식"
        ],
        answer: 2
    },
    {
        question: "12. 다음 중 비선점형 스케줄링 기법은?",
        options: [
            "Round-Robin",
            "SRTF",
            "SJF",
            "MLFQ"
        ],
        answer: 3
    },
    {
        question: "13. MLFQ 스케줄링이 개발된 주요 목적이 아닌 것은?",
        options: [
            "기아 현상 방지",
            "짧은 스레드의 우선 처리",
            "대화식 스레드의 우선 처리",
            "메모리 사용량 최소화"
        ],
        answer: 4
    },
    {
        question: "14. I/O 집중 스레드가 MLFQ에서 높은 레벨 큐에 있을 가능성이 높은 이유는?",
        options: [
            "I/O 대기로 자발적으로 CPU를 양보하기 때문",
            "I/O 스레드의 우선순위가 높기 때문",
            "시스템이 I/O 스레드를 우대하기 때문",
            "I/O 처리가 빠르기 때문"
        ],
        answer: 1
    },
    {
        question: "15. MLFQ에서 최하위 레벨 큐의 특징은?",
        options: [
            "가장 짧은 타임 슬라이스를 가진다",
            "주로 FCFS나 긴 타임 슬라이스의 RR로 스케줄된다",
            "I/O 집중 스레드가 많이 분포한다",
            "스레드가 다른 큐로 이동할 수 있다"
        ],
        answer: 2
    },
    {
        question: "16. CPU 스케줄링 파라미터가 필요하지 않은 알고리즘은?",
        options: [
            "FCFS",
            "Round-Robin",
            "Priority Scheduling",
            "MLFQ"
        ],
        answer: 1
    },
    {
        question: "17. SJF 스케줄링에서 기아가 발생하는 경우는?",
        options: [
            "긴 스레드가 계속 도착할 때",
            "짧은 스레드가 계속 도착할 때",
            "타임 슬라이스가 너무 클 때",
            "우선순위가 동일할 때"
        ],
        answer: 2
    },
    {
        question: "18. 실시간 시스템에서 주로 사용되는 스케줄링 방식은?",
        options: [
            "Round-Robin",
            "FCFS",
            "Priority Scheduling",
            "MLFQ"
        ],
        answer: 3
    },
    {
        question: "19. MLFQ에서 스레드가 I/O로 실행이 중단된 경우 어떻게 처리되는가?",
        options: [
            "상위 큐로 이동한다",
            "하위 큐로 이동한다",
            "동일 레벨 큐 끝에 삽입한다",
            "새로운 큐에 삽입한다"
        ],
        answer: 3
    },
    {
        question: "20. 다음 중 MLFQ에서 1962년 개발 당시의 주요 설계 목적은?",
        options: [
            "CPU 사용률 극대화",
            "기아를 없애고 짧은 스레드와 대화식 스레드 우선 처리",
            "메모리 사용량 최적화",
            "전력 소비 최소화"
        ],
        answer: 2
    }
];
