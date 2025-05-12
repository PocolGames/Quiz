let quizData = [
    {
        question: "1. 생산자 소비자 문제란 무엇인가?",
        options: [
            "공유버퍼를 사이에 두고 데이터를 공급하는 생산자들과 소비하는 소비자들이 공유버퍼를 문제 없이 사용하도록 동기화시키는 문제",
            "생산자가 소비자보다 많을 때 발생하는 문제",
            "메모리 부족으로 발생하는 문제",
            "CPU 스케줄링 문제의 일종"
        ],
        answer: 1
    },
    {
        question: "2. 생산자 소비자 문제의 구체적인 3가지 문제는?",
        options: [
            "메모리 관리, CPU 성능, 네트워크 문제",
            "상호 배제 해결, 비어 있는 공유 버퍼 문제, 꽉 찬 공유 버퍼 문제",
            "스레드 생성, 스레드 종료, 스레드 통신 문제",
            "데이터 압축, 데이터 암호화, 데이터 전송 문제"
        ],
        answer: 2
    },
    {
        question: "3. 비어 있는 공유 버퍼 문제는 언제 발생하는가?",
        options: [
            "생산자가 버퍼에 쓸 때",
            "소비자가 비어 있는 버퍼를 읽을 때",
            "생산자와 소비자가 동시에 접근할 때",
            "버퍼가 꽉 찰 때"
        ],
        answer: 2
    },
    {
        question: "4. 꽉 찬 공유 버퍼 문제는 언제 발생하는가?",
        options: [
            "소비자가 버퍼에서 읽을 때",
            "생산자가 꽉 찬 버퍼에 쓸 때",
            "버퍼가 비어 있을 때",
            "생산자와 소비자 수가 같을 때"
        ],
        answer: 2
    },
    {
        question: "5. 생산자와 소비자 알고리즘에서 세마포 R의 의미는?",
        options: [
            "버퍼에 읽기 가능한 버퍼의 개수",
            "버퍼에 쓰기 가능한 버퍼의 개수",
            "읽기 전용 버퍼의 개수",
            "예약된 버퍼의 개수"
        ],
        answer: 1
    },
    {
        question: "6. 생산자와 소비자 알고리즘에서 세마포 W의 의미는?",
        options: [
            "대기 중인 스레드 수",
            "작업 완료된 스레드 수",
            "버퍼에 있는 쓰기 가능한 버퍼의 개수",
            "윈도우 크기"
        ],
        answer: 3
    },
    {
        question: "7. 생산자와 소비자 알고리즘에서 뮤텍스 M의 목적은?",
        options: [
            "생산자만 사용하는 락",
            "소비자만 사용하는 락",
            "생산자와 소비자 모두 사용하는 상호배제용 락",
            "메모리 관리용 락"
        ],
        answer: 3
    },
    {
        question: "8. Producer 스레드의 첫 번째 연산은?",
        options: [
            "V(W)",
            "P(W)",
            "P(R)",
            "뮤텍스 잠그기"
        ],
        answer: 2
    },
    {
        question: "9. Consumer 스레드의 첫 번째 연산은?",
        options: [
            "P(R)",
            "P(W)",
            "V(R)",
            "뮤텍스 잠그기"
        ],
        answer: 1
    },
    {
        question: "10. Producer가 데이터를 버퍼에 저장한 후 수행하는 연산은?",
        options: [
            "P(R)",
            "V(R)",
            "P(W)",
            "V(W)"
        ],
        answer: 2
    },
    {
        question: "11. Consumer가 버퍼에서 데이터를 읽은 후 수행하는 연산은?",
        options: [
            "V(W)",
            "V(R)",
            "P(W)",
            "P(R)"
        ],
        answer: 1
    },
    {
        question: "12. 탐구 6-5에서 공유버퍼의 크기는?",
        options: [
            "2개",
            "4개",
            "8개",
            "10개"
        ],
        answer: 2
    },
    {
        question: "13. 탐구 6-5에서 생산자와 소비자가 각각 처리하는 정수의 개수는?",
        options: [
            "5개",
            "10개",
            "100개",
            "1000개"
        ],
        answer: 2
    },
    {
        question: "14. 탐구 6-5에서 semWrite의 초기값은?",
        options: [
            "0",
            "4",
            "10",
            "100"
        ],
        answer: 2
    },
    {
        question: "15. 탐구 6-5에서 semRead의 초기값은?",
        options: [
            "0",
            "4",
            "10",
            "100"
        ],
        answer: 1
    },
    {
        question: "16. 탐구 6-5에서 공유버퍼는 어떤 자료구조로 구현되는가?",
        options: [
            "스택",
            "원형 큐",
            "연결 리스트",
            "이진 트리"
        ],
        answer: 2
    },
    {
        question: "17. 탐구 6-5의 mywrite() 함수에서 첫 번째 연산은?",
        options: [
            "sem_post",
            "sem_wait(&semWrite)",
            "pthread_mutex_lock",
            "queue에 데이터 저장"
        ],
        answer: 2
    },
    {
        question: "18. 탐구 6-5의 myread() 함수에서 마지막 연산은?",
        options: [
            "sem_wait",
            "pthread_mutex_unlock",
            "sem_post(&semWrite)",
            "return n"
        ],
        answer: 3
    },
    {
        question: "19. 탐구 6-5에서 wptr과 rptr 변수의 역할은?",
        options: [
            "wptr은 쓰기 시작 위치, rptr은 읽기 시작 위치",
            "wptr은 저장할 다음 인덱스, rptr은 읽을 다음 인덱스",
            "wptr은 전체 크기, rptr은 현재 크기",
            "wptr은 생산자 수, rptr은 소비자 수"
        ],
        answer: 2
    },
    {
        question: "20. 탐구 6-5에서 랜덤 시간 간격을 만드는 함수는?",
        options: [
            "rand()",
            "usleep()",
            "sleep()",
            "time()"
        ],
        answer: 2
    },
    {
        question: "21. 탐구 6-5에서 N_COUNTER 상수의 값은?",
        options: [
            "2",
            "4",
            "8",
            "10"
        ],
        answer: 2
    },
    {
        question: "22. 탐구 6-5에서 Producer가 생성하는 데이터는?",
        options: [
            "랜덤 숫자",
            "0부터 9까지의 정수",
            "알파벳",
            "실수"
        ],
        answer: 2
    },
    {
        question: "23. 탐구 6-5에서 srand(time(NULL))의 목적은?",
        options: [
            "시간 측정",
            "성능 최적화",
            "난수 발생을 위한 seed 생성",
            "동기화 제어"
        ],
        answer: 3
    },
    {
        question: "24. 생산자 소비자 문제 해결에 필요한 동기화 도구는?",
        options: [
            "뮤텍스만",
            "세마포만",
            "뮤텍스와 세마포 모두",
            "스핀락만"
        ],
        answer: 3
    },
    {
        question: "25. 생산자 소비자 문제가 발생하는 멀티스레드 응용프로그램의 특징은?",
        options: [
            "단일 스레드만 사용",
            "메모리 공유 없음",
            "공유버퍼를 통한 데이터 교환",
            "동기화 불필요"
        ],
        answer: 3
    }
];
