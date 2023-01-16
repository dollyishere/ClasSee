# 서비스 개요

### 서비스 유형

화상 원데이 클래스

### 상세 설명

- 서비스 타겟
    - 온라인 화상 클래스에 관심 있는 고객층 전원 (연령대 x)
- 경쟁 서비스와의 차별점
    - 기존 동영상 클래스
        - 동영상 녹화 강의는 이동하면서도 들을 수 있다는 점(바쁜 현대인에게 시간을 낼 수 있는 시간은 한정되어 있음), 중간에 놓치더라도 다시 돌려서 들을 수 있다는 점이 장점이라고 생각됨
        - 반대로 화상 강의의 경우 일방적인 동영상 (녹화) 강의와 달리 강사와 수강생 사이의 상호작용을 통해 즉시, 직접 피드백을 받을 수 있다는 점이 장점임
            - 허나 면대면으로 수업을 진행하기에는 수업이 진행되는 장소까지 이동하는 데에 걸리는 시간, 코로나 이슈 등의 문제가 있음
    - 기존 화상 원데이 클래스
        - 기존 화상 원데이 클래스(모카 클래스) 또는 화상 강의의 경우 zoom이나 디스코드 등 기존 화상 플랫폼 링크로 안내하는 등 자체 화상 채팅 서비스를 제공하지는 않거나, 고객층이 한정된 경우가 많았음.
            - 만약 zoom이나 디스코드를 이용할 시, 강사 입장에서는 본인이 구성한 커리큘럼대로 수업이 진행되고 있는지 외부 프로그램을 이용해 체크해야 하며, 학생들이 수업을 잘 따라오고 있는지 시각적으로 바로바로 확인하는 데에 불편함을 겪음
        - 우리 팀은 굳이 외부 서비스나 사이트를 이용할 필요 없이, 우리 서비스 자체에서 화상 채팅 서비스를 제공하고, 강사 및 수강생 친화적인 강의 서비스를 제공할 계획임
- 기존 제공 서비스 (경쟁사)
    - **제안: 해당 서비스를 이용한 고객의 후기나 평가를 확인해볼 것 (차별점을 찾기 위해)**
        - 보통 앱 평점이나 후기를 살펴보면 서비스 사용자가 제공 측에 서비스 개선점을 제시하는 경우가 많으니 도움이 될 것이라고 생각함
    - 모카 클래스
        - [https://mochaclass.com/](https://mochaclass.com/)
    - **EBS 온라인 클래스 (이용자 매뉴얼 확인 부탁)**
        - [https://www.ebsoc.co.kr/](https://www.ebsoc.co.kr/)
    - LIVEALL 라이브올
        - [https://www.liveall.co.kr/](https://www.liveall.co.kr/)
        - 라이브올의 경우 자체 화상 채팅 서비스를 지원하나, 주요 고객층이 유아~청소년에 한정되어 있으므로, 고객층의 확장으로 차별을 두는 것이 가능할 것으로 보임
    - Google 클래스룸
        - [https://classroom.google.com/](https://classroom.google.com/)
    - 에어비앤비
        - [https://www.airbnb.co.kr/s/한국/experiences?refinement_paths[]=%2Fexperiences&tab_id=experience_tab](https://www.airbnb.co.kr/s/%ED%95%9C%EA%B5%AD/experiences?refinement_paths%5B%5D=%2Fexperiences&tab_id=experience_tab)
- 유인책 (마케팅)
    - 강사
        - 수업 홍보
        - 강의 등록 수수료 무료
        - 첫 강의 수수료 할인
        - 강의 스케줄 사이트 측에서 관리(매니저)
    - 학생
        - 첫 수업 할인 쿠폰
- 참고할만한 사이트
    
    [EBS온라인클래스 | 언제 어디서나 등교!](https://www.ebsoc.co.kr/manual)
    
    [교사들을 위한 온라인 학습 프로그램 5가지](https://www.hp.com/kr-ko/shop/tech-takes/post/%EA%B5%90%EC%82%AC%EB%93%A4%EC%9D%84-%EC%9C%84%ED%95%9C-%EC%98%A8%EB%9D%BC%EC%9D%B8-%ED%95%99%EC%8A%B5-%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%A8-5%EA%B0%80%EC%A7%80)
    

</br></br>

# 코딩 컨벤션

- 깃 컨벤션
    
    [[GIT] 📈 깃 브랜치 전략 정리 - Github Flow / Git Flow](https://inpa.tistory.com/entry/GIT-%E2%9A%A1%EF%B8%8F-github-flow-git-flow-%F0%9F%93%88-%EB%B8%8C%EB%9E%9C%EC%B9%98-%EC%A0%84%EB%9E%B5)
    
    [TUPLI/컨벤션.md at dev · hotsix-turtles/TUPLI](https://github.com/hotsix-turtles/TUPLI/blob/dev/docs/%EC%BB%A8%EB%B2%A4%EC%85%98.md)
    
    - 브랜치 컨벤션
    
        - master: 1개 / 최종 배포하기 위한 버전
        - release: 1개 / 최종 배포전 다음 버전을 준비하기 위한 최종 단계
        - develop: 2개 백엔드 / 프론트엔드 feature에서 기능별로 개발한 내용들을 백, 프론트 단위로 모으는 브랜치
            - dev-front
            - dev-back
        - feature: 기능 단위 / 개발 기능단위로 생성
            - feature-front/[feature name]
            - feature-back/[feature name]
                - ex. feature-back/chat
        - hotfix: 이슈 단위 / mater에서 이슈, 오류 발생 시 해당 이슈를 해결하기 위한 브랜치 이슈 단위로 생성한다
            - fix/[issue num]
    - 커밋 컨벤션
        - eat : 새로운 기능 추가
        - fix : 버그 수정
        - docs : 문서 수정
        - style : 코드 포맷팅, 세미콜론 누락, 코드 변경이 없는 경우
        - refactor : 코드 리펙토링
        - test : 테스트 코드, 리펙토링 테스트 코드 추가
        - chore : 빌드 업무 수정, 패키지 매니저 수정
        - 예시
            
            ```
            Feat: "회원 가입 기능 구현"
            
            SMS, 이메일 중복확인 API 개발
            
            [#지라이슈번호]
            ```
            
- 지라 컨벤션
    - 스프린트 - 주단위
    - 에픽 - 설계, 기획, FE, BE, 배포, 유지보수
    - 스토리
        - 제목 : 기능 명사형으로 작성
        - 본문 : who, what, how
    - task에 스토리 포인트 부여 - 프리, 백리
    - 작업 끝나면 팀 멤버들한테 알리기 - 한번 검토
    - 기능 단위로
    
- 프론트 엔드(typescript)
    - 변수나 함수 명은 camelCase로 작성한다.
    - 컴포넌트, 파일 이름은 PascalCase로 작성한다.
    - 상수는 대문자+snake_case로 작성한다.
    - imports 로 불러온 모듈 파일명이 스네이크 케이스여도 **lowerCamelCase**로 import 합니다.
    - 변수나 함수 명은 해당 변수,함수가 어떻게 사용되는지 식별할 수 있도록 작성한다.
    - 주석은 한 줄마다 자세하게 작성한다.
- 백엔드(Java)
    
    [https://cocobi.tistory.com/27](https://cocobi.tistory.com/27)



