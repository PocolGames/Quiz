let quizData = [
    {
        question: "1. 운영체제의 주요 목적 중 틀린 것은?",
        options: [
            "사용자와 하드웨어 사이의 인터페이스 제공",
            "하드웨어 자원의 효율적 관리",
            "응용 프로그램 실행 환경 제공",
            "하드웨어 성능을 제한하여 안정성 확보"
        ],
        answer: 4
    },
    {
        question: "2. 프로세스와 관련된 설명 중 옳은 것은?",
        options: [
            "프로세스는 디스크에 저장된 프로그램을 의미한다",
            "프로세스는 실행 중인 프로그램을 의미한다",
            "프로세스는 운영체제의 일부이다",
            "프로세스는 하드웨어 장치이다"
        ],
        answer: 2
    },
    {
        question: "3. 프로세스 상태 전이에서 실행 상태(Running)에서 갈 수 있는 상태가 아닌 것은?",
        options: [
            "준비 상태(Ready)",
            "대기 상태(Waiting)",
            "종료 상태(Terminated)",
            "생성 상태(New)"
        ],
        answer: 4
    },
    {
        question: "4. CPU 스케줄링 기법 중 선점형 스케줄링이 아닌 것은?",
        options: [
            "FCFS (First Come First Served)",
            "RR (Round Robin)",
            "SRT (Shortest Remaining Time)",
            "Priority Scheduling"
        ],
        answer: 1
    },
    {
        question: "5. 메모리 관리 기법 중 내부 단편화(Internal Fragmentation)가 발생하는 것은?",
        options: [
            "가변 분할 방법",
            "고정 분할 방법",
            "세그멘테이션",
            "가상 메모리"
        ],
        answer: 2
    },
    {
        question: "6. 페이징 기법에 대한 설명 중 옳은 것은?",
        options: [
            "논리적 주소와 물리적 주소가 동일하다",
            "프로세스를 동일한 크기의 페이지로 나눈다",
            "외부 단편화가 발생한다",
            "메모리를 세그먼트 단위로 관리한다"
        ],
        answer: 2
    },
    {
        question: "7. 가상 메모리 시스템에서 페이지 부재(Page Fault)가 발생했을 때의 처리 과정이 아닌 것은?",
        options: [
            "운영체제에 인터럽트 발생",
            "해당 페이지를 물리 메모리로 로드",
            "페이지 테이블 업데이트",
            "프로세스를 즉시 종료"
        ],
        answer: 4
    },
    {
        question: "8. 교착상태(Deadlock)의 발생 조건이 아닌 것은?",
        options: [
            "상호배제(Mutual Exclusion)",
            "점유와 대기(Hold and Wait)",
            "비선점(No Preemption)",
            "비동기화(Asynchronization)"
        ],
        answer: 4
    },
    {
        question: "9. 세마포어(Semaphore)에 대한 설명 중 틀린 것은?",
        options: [
            "프로세스 동기화를 위한 도구이다",
            "P연산(Wait)과 V연산(Signal)을 사용한다",
            "음수 값을 가질 수 있다",
            "이진 세마포어는 뮤텍스와 동일하다"
        ],
        answer: 4
    },
    {
        question: "10. 파일 시스템에서 디렉토리의 구조가 아닌 것은?",
        options: [
            "단일 계층 디렉토리",
            "2단계 디렉토리",
            "트리 디렉토리",
            "해시 디렉토리"
        ],
        answer: 4
    },
    {
        question: "11. 운영체제의 커널(Kernel)에 대한 설명 중 옳은 것은?",
        options: [
            "사용자 모드에서 실행된다",
            "운영체제의 핵심 부분으로 항상 메모리에 상주한다",
            "응용 프로그램의 일부이다",
            "사용자가 직접 접근할 수 있다"
        ],
        answer: 2
    },
    {
        question: "12. 인터럽트(Interrupt)에 대한 설명 중 틀린 것은?",
        options: [
            "하드웨어나 소프트웨어에서 발생할 수 있다",
            "인터럽트 발생 시 현재 실행 중인 프로그램이 일시 중단된다",
            "인터럽트 서비스 루틴(ISR)이 실행된다",
            "인터럽트는 운영체제의 성능을 저하시킨다"
        ],
        answer: 4
    },
    {
        question: "13. 프로세스 간 통신(IPC) 방법이 아닌 것은?",
        options: [
            "파이프(Pipe)",
            "메시지 큐(Message Queue)",
            "공유 메모리(Shared Memory)",
            "캐시 메모리(Cache Memory)"
        ],
        answer: 4
    },
    {
        question: "14. 스래싱(Thrashing)에 대한 설명 중 옳은 것은?",
        options: [
            "CPU 이용률이 급격히 증가하는 현상",
            "페이지 부재가 빈번하게 발생하여 시스템 성능이 저하되는 현상",
            "메모리가 부족하여 프로세스가 생성되지 않는 현상",
            "디스크 공간이 부족한 현상"
        ],
        answer: 2
    },
    {
        question: "15. Unix/Linux 시스템에서 파일의 접근 권한을 나타내는 방법은?",
        options: [
            "rwx rwx rwx",
            "abc def ghi",
            "123 456 789",
            "111 222 333"
        ],
        answer: 1
    },
    {
        question: "16. 운영체제의 부팅 과정에서 일어나는 일이 아닌 것은?",
        options: [
            "BIOS/UEFI가 하드웨어를 초기화",
            "부트로더가 운영체제를 메모리로 로드",
            "커널이 시스템 자원을 초기화",
            "모든 응용 프로그램이 자동으로 실행"
        ],
        answer: 4
    },
    {
        question: "17. 멀티태스킹 운영체제의 특징이 아닌 것은?",
        options: [
            "여러 프로세스가 동시에 실행되는 것처럼 보인다",
            "CPU 시간을 여러 프로세스가 나누어 사용한다",
            "모든 프로세스가 실제로 동시에 실행된다",
            "시분할 시스템을 사용한다"
        ],
        answer: 3
    },
    {
        question: "18. 캐시 메모리의 특징에 대한 설명 중 틀린 것은?",
        options: [
            "CPU와 주기억장치 사이에 위치한다",
            "속도가 빠르고 용량이 작다",
            "지역성 원리를 이용한다",
            "모든 데이터를 영구적으로 저장한다"
        ],
        answer: 4
    },
    {
        question: "19. 분산 운영체제의 특징이 아닌 것은?",
        options: [
            "여러 컴퓨터를 하나의 시스템처럼 관리",
            "네트워크를 통한 자원 공유",
            "투명성 제공",
            "단일 CPU 사용"
        ],
        answer: 4
    },
    {
        question: "20. 실시간 운영체제(RTOS)의 특징은?",
        options: [
            "처리율 최대화를 목표로 한다",
            "응답 시간을 예측 가능하게 보장한다",
            "사용자 편의성을 최우선으로 한다",
            "대화형 처리가 주된 목적이다"
        ],
        answer: 2
    }
];
