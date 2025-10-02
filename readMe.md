# programmers_express

**programmers_express**는 JavaScript와 Express.js를 기반으로 한 프로젝트로, 프로그래머스 문제 풀이 코드와 Express.js 기반 백엔드 예제 코드를 포함하고 있습니다.

## 주요 기능

- **회원 관리 시스템**:
  - 회원 가입, 로그인, 정보 조회, 수정, 탈퇴와 같은 기능을 제공합니다.
  - RESTful API를 활용하여 사용자 데이터를 관리합니다.

- **JWT 인증**:
  - 액세스 토큰 및 리프레시 토큰을 활용한 사용자 인증 구현.
  - 토큰 검증 및 재발급 로직 포함.

- **Express.js 기반 백엔드 구조**:
  - 모듈화된 라우팅 및 컨트롤러 구조.
  - 미들웨어를 활용한 요청 검증 및 에러 처리.

- **사용자 인터페이스**:
  - Pug(Jade) 템플릿 엔진과 CSS를 활용하여 사용자 인터페이스 구현.

## 디렉토리 구조

```
programmers_express/
├── programmers/
│   ├── app.js               # Express 애플리케이션 설정
│   ├── routes/              # 라우터 디렉토리
│   │   ├── index.js         # 메인 페이지 라우팅
│   │   ├── users.js         # 사용자 관련 라우팅
│   ├── utils/               # 유틸리티 함수 디렉토리
│   │   ├── auth.js          # JWT 인증 관련 함수
│   │   ├── validate.js      # 요청 검증 미들웨어
│   ├── views/               # Pug 템플릿 파일
│   │   ├── users.jade       # 사용자 관련 뷰
│   ├── public/              # 정적 파일(CSS, 이미지 등)
│   │   ├── stylesheets/     # CSS 파일
│   │       ├── user.css     # 사용자 관련 스타일
│   └── bin/                 # 애플리케이션 실행 스크립트
│       ├── www              # 서버 시작 스크립트
├── readMe.md                # README 파일
└── .env                     # 환경 변수 파일
```

## 설치 및 실행

1. **저장소 클론**:
   ```bash
   git clone https://github.com/JHParrrk/programmers_express.git
   cd programmers_express
   ```

2. **의존성 설치**:
   ```bash
   npm install
   ```

3. **환경 변수 설정**:
   프로젝트 루트 디렉터리에 `.env` 파일을 생성하고, 다음 내용을 추가하세요:
   ```env
   PORT=3000
   SECRET_KEY=your-secret-key
   REFRESH_SECRET_KEY=your-refresh-secret-key
   ```

4. **서버 실행**:
   ```bash
   npm start
   ```

5. **브라우저에서 확인**:
   - 기본적으로 [http://localhost:3000](http://localhost:3000)에서 애플리케이션에 접근할 수 있습니다.

## API 명세

### 회원 관련 API
| 메서드 | URL                | 설명                       |
|--------|--------------------|----------------------------|
| POST   | `/register`        | 회원 가입                  |
| POST   | `/login`           | 로그인                     |
| GET    | `/users/me`        | 본인 정보 조회             |
| GET    | `/users/:id`       | 특정 회원 정보 조회        |
| PUT    | `/users/:id`       | 특정 회원 정보 수정        |
| DELETE | `/users/:id`       | 회원 탈퇴                  |
| POST   | `/refresh-token`   | 액세스 토큰 재발급       |
| POST   | `/logout`          | 로그아웃                  |

### 채널 관련 API
| 메서드 | URL                | 설명                       |
|--------|--------------------|----------------------------|
| GET    | `/channels`        | 채널 목록 조회             |
| POST   | `/channels`        | 채널 생성                  |
| PUT    | `/channels/:id`    | 채널 정보 수정             |
| DELETE | `/channels/:id`    | 채널 삭제                  |

## 주요 코드 설명

### **JWT 인증**
- `utils/auth.js`:
  - `generateToken(payload)`:
    - 사용자 정보를 기반으로 액세스 토큰을 생성합니다.
  - `authenticateJWT`:
    - 요청 헤더의 토큰을 검증하여 인증을 처리합니다.

### **사용자 라우트**
- `routes/users.js`:
  - 회원가입, 로그인, 사용자 조회 및 관리와 관련된 모든 API 라우팅이 포함되어 있습니다.
  - `authenticateJWT` 미들웨어를 통해 인증이 필요한 경로를 보호합니다.

### **에러 처리**
- `utils/errorHandler.js`:
  - 모든 요청에 대한 중앙 집중식 에러 처리를 제공합니다.

## 참고 사항

- 이 프로젝트는 학습 목적으로 제작되었으며, 상용 환경에서 사용하기 전에 추가적인 보안 및 기능 강화가 필요합니다.
- 기여나 피드백은 언제나 환영합니다!

## 라이선스
본 프로젝트는 별도의 라이선스를 포함하지 않으며, 개인 학습 및 참고 목적으로 사용 가능합니다.