# programmers_express

**programmers_express**는 JavaScript로 작성된 프로젝트로, 프로그래머스(Programmers) 코딩 테스트 문제 풀이 및 Express.js 관련 예제 코드를 관리하는 저장소입니다.

## 주요 디렉터리

- `programmers/`  
  프로그래머스 문제 풀이 코드 및 Express.js 예제 파일들이 저장되어 있는 메인 디렉터리입니다.

## 특징

- JavaScript 기반 문제 풀이 및 Express.js 예제 코드 제공
- 실습 및 학습 목적의 코드 구성

## 사용 방법

1. 저장소를 클론합니다.
   ```bash
   git clone https://github.com/JHParrrk/programmers_express.git
   ```
2. `programmers/` 폴더 내에서 원하는 문제 풀이 또는 예제 파일을 확인하며 학습에 활용할 수 있습니다.

3. npm start

## 참고

- 본 저장소는 개인의 학습 및 기록 목적으로 운영됩니다.
- 별도의 라이선스 및 공식 문서가 첨부되어 있지 않을 수 있습니다.

회원

- 로그인 post
  - req body(id,pwd)
  - res `${name}님 황영합니다` // 메인페이지 이동
- 회원가입 post
  - req body(id,pwd, name)
  - res `${name}님 황영합니다` // 로그인페이지 이동
- 회원 정보 조회 get /users/:id
  - req : URL (id)
  - res `${name}, ${age} ...`
- 회원 탈퇴 Delete /users/:id
  - req : URL (id)
  - res `${name}님 잘가요` // 메인페이지 이동

회원은 계정 1개당 채널 100개를 가질 수 있다.

- 마이페이지
- 채널 목록
  채널
- 채널 생성 API - 채널 생성페이지 (마이페이지 채널 생성)
- 채널 수정 API - 체널 관리페이지 (채널 목록 클릭, 수정탭)
- 채널 삭제 API = 체널 관리페이지 (관리리스트에서 삭제탭)
