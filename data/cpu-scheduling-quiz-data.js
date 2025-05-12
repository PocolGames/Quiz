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
        question: "2. SJF(Shortest Job First) 스케줄링의 문제점은 무엇인가?",
        options: [
            "평균 대기 시간이 길다",
            "스레드의 실행 시간을 미리 아는 것이 불가능하다",
            "처리율이 낮다",
            "컨텍스트 스위칭이 빈번하다"
        ],
        answer: 2
    },
    {
        question: "3. Round-Robin 스케줄링의 특징으로 옳지 않은 것은?",
        options: [
            "비선점형 스케줄링이다",
            "각 프로세스에 공평한 실행 기회를 제공한다",
            "타임 슬라이스를 사용한다",
            "기아 현상을 방지한다"
        ],
        answer: 1
    },
    {
        question: "4. SRTF(Shortest Remaining Time First)에 대한 설명 중 틀린 것은?",
        options: [
            "SJF의 선점형 버전이다",
            "남은 실행 시간이 가장 짧은 스레드를 선택한다",
            "비선점형 스케줄링이다",
            "평균 대기 시간을 최소화할 수 있다"
        ],
        answer: 3
    },
    {
        question: "5. Priority 스케줄링에서 기아 문제를 해결하는 방법은?",
        options: [
            "타임 슬라이스 사용",
            "에이징(Aging) 기법",
            "비선점형 방식 사용",
            "큐 개수 증가"
        ],
        answer: 2
    },
    {
        question: "6. MLQ(Multi-level Queue) 스케줄링의 특징은?",
        options: [
            "스레드가 큐 간에 이동할 수 있다",
            "스레드의 우선순위가 동적으로 변경된다",
            "스레드가 한 번 배정된 큐에서 이동하지 못한다",
            "모든 큐가 동일한 우선순위를 갖는다"
        ],
        answer: 3
    },
    {
        question: "7. MLFQ(Multi-level Feedback Queue)에서 스레드가 하위 큐로 이동하는 이유는?",
        options: [
            "I/O 요청 때문에",
            "우선순위가 높아져서",
            "CPU-burst가 큐 타임슬라이스를 초과해서",
            "메모리 부족으로"
        ],
        answer: 3
    },
    {
        question: "8. 호위 효과(Convoy Effect)와 관련된 스케줄링 알고리즘은?",
        options: [
            "Round-Robin",
            "FCFS",
            "SRTF",
            "Priority Scheduling"
        ],
        answer: 2
    },
    {
        question: "9. Round-Robin에서 타임 슬라이스가 너무 작을 때의 문제점은?",
        options: [
            "호위 효과 발생",
            "컨텍스트 스위칭 오버헤드 증가",
            "기아 현상 발생",
            "처리율 급격히 향상"
        ],
        answer: 2
    },
    {
        question: "10. MLFQ에서 스레드가 상위 큐로 이동하는 경우는?",
        options: [
            "CPU 버스트가 길어질 때",
            "큐에서 오래 대기할 때",
            "우선순위가 낮아질 때",
            "메모리 사용량이 증가할 때"
        ],
        answer: 2
    },
    {
        question: "11. 선점형 스케줄링과 비선점형 스케줄링의 차이점은?",
        options: [
            "선점형은 스레드가 자발적으로 CPU를 양보한다",
            "비선점형은 다른 스레드가 강제로 CPU를 빼앗을 수 있다",
            "선점형은 실행 중인 스레드를 강제로 중단시킬 수 있다",
            "비선점형은 우선순위를 사용하지 않는다"
        ],
        answer: 3
    },
    {
        question: "12. MLFQ의 주요 설계 목적이 아닌 것은?",
        options: [
            "기아 현상 방지",
            "짧은 스레드 우선 처리",
            "대화식 스레드 우선 처리",
            "CPU 사용률 최소화"
        ],
        answer: 4
    },
    {
        question: "13. CPU 스케줄링에서 '스케줄링 파라미터'가 필요하지 않은 알고리즘은?",
        options: [
            "FCFS",
            "Round-Robin",
            "Priority Scheduling",
            "MLFQ"
        ],
        answer: 1
    },
    {
        question: "14. 다음 중 평균 대기 시간이 가장 짧을 것으로 예상되는 스케줄링 알고리즘은?",
        options: [
            "FCFS",
            "SJF",
            "Round-Robin",
            "MLQ"
        ],
        answer: 2
    },
    {
        question: "15. 멀티 코어 시스템에서 발생하는 CPU affinity의 목적은?",
        options: [
            "부하 균등화",
            "컨텍스트 스위칭 후 캐시 미스 감소",
            "스케줄링 알고리즘 단순화",
            "우선순위 역전 방지"
        ],
        answer: 2
    },
    {
        question: "16. 푸시 마이그레이션(Push Migration) 기법이란?",
        options: [
            "빈 코어가 다른 코어의 스레드를 가져오는 것",
            "감시 스레드가 부하가 적은 코어에 스레드를 배치하는 것",
            "스레드를 원래 실행되던 코어로 되돌리는 것",
            "우선순위에 따라 스레드를 재배치하는 것"
        ],
        answer: 2
    },
    {
        question: "17. MLFQ에서 I/O 집중 스레드가 높은 순위의 큐에 있을 가능성이 높은 이유는?",
        options: [
            "I/O 스레드의 우선순위가 높기 때문",
            "I/O 대기 시간 동안 자발적으로 CPU를 양보하기 때문",
            "I/O 스레드가 빠르게 실행되기 때문",
            "시스템이 I/O 스레드를 우대하기 때문"
        ],
        answer: 2
    },
    {
        question: "18. CPU 스케줄링에서 스래싱과 관련된 것은?",
        options: [
            "타임 슬라이스가 너무 클 때",
            "메모리가 부족할 때",
            "우선순위가 너무 높을 때",
            "스레드가 너무 많을 때"
        ],
        answer: 2
    },
    {
        question: "19. 실시간 시스템에서 주로 사용되는 스케줄링 방식은?",
        options: [
            "Round-Robin",
            "FCFS",
            "Priority Scheduling",
            "SJF"
        ],
        answer: 3
    },
    {
        question: "20. 다음 중 일반적으로 처리율(throughput)이 가장 낮은 스케줄링 알고리즘은?",
        options: [
            "FCFS",
            "SJF",
            "Round-Robin",
            "MLFQ"
        ],
        answer: 1
    },
    {
        question: "21. MLFQ에서 최하위 레벨 큐의 특징은?",
        options: [
            "가장 짧은 타임 슬라이스를 가진다",
            "주로 FCFS나 긴 타임 슬라이스의 RR로 스케줄된다",
            "I/O 집중 스레드가 많이 분포한다",
            "스레드가 다른 큐로 이동할 수 있다"
        ],
        answer: 2
    },
    {
        question: "22. CPU-bound 스레드와 I/O-bound 스레드 중 어떤 것이 더 빠르게 상위 큐에서 하위 큐로 이동할 가능성이 높은가?",
        options: [
            "CPU-bound 스레드",
            "I/O-bound 스레드",
            "두 스레드 모두 동일하다",
            "스케줄링 알고리즘에 따라 다르다"
        ],
        answer: 1
    },
    {
        question: "23. 다음 중 선점형 스케줄링 알고리즘이 아닌 것은?",
        options: [
            "Round-Robin",
            "SRTF",
            "SJF",
            "Priority Scheduling (선점형)"
        ],
        answer: 3
    },
    {
        question: "24. 멀티코어 시스템에서 부하 불균형을 해결하는 방법이 아닌 것은?",
        options: [
            "Push Migration",
            "Pull Migration",
            "CPU Affinity",
            "Load Balancing"
        ],
        answer: 3
    },
    {
        question: "25. MLFQ 스케줄링이 1962년에 개발된 주요 목적은?",
        options: [
            "CPU 사용률 극대화",
            "호위 효과 제거",
            "기아 현상 방지와 짧은 스레드/대화식 스레드 우선 처리",
            "메모리 효율성 향상"
        ],
        answer: 3
    },
    {
        question: "26. 컨텍스트 스위칭이 가장 빈번하게 발생하는 스케줄링 알고리즘은?",
        options: [
            "FCFS",
            "SJF",
            "Round-Robin (작은 타임 슬라이스)",
            "Priority Scheduling"
        ],
        answer: 3
    }
];
