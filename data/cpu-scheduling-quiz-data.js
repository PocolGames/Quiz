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
    }
];
