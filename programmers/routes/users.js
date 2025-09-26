//users.js

const express = require("express");
const router = express.Router();
const createError = require("http-errors");
// JWT 유틸리티 함수 가져오기
// 설계 이유: JWT를 사용하여 인증/인가를 수행합니다.
// - generateToken: JWT를 생성합니다.
// - authenticateJWT: JWT를 검증하여 요청이 인증되었는지 확인합니다.
const { generateToken, authenticateJWT } = require("../utils/auth");

// 메모리 기반 유저 데이터 (DB 대신 사용)
// 설계 이유:
// - 데이터베이스 대신 메모리 기반 배열로 사용자 데이터를 관리.
// - 간단한 프로토타입이나 테스트 단계에서 빠르게 데이터를 저장/조회할 수 있도록 구현.
let users = [
  { id: 1, userID: "doffltm123", password: "pwd123", name: "Alice" },
  { id: 2, userID: "qkq456", password: "pwd456", name: "Bob" },
  { id: 3, userID: "ckffl789", password: "pwd789", name: "Charlie" },
];

// --- 공개 라우트 (인증 불필요) ---

// 회원가입
router.post("/register", (req, res, next) => {
  try {
    const { userID, password, name } = req.body;
    // 설계 이유: userID와 password는 필수 입력값으로 설정.
    if (!userID || !password) {
      return res
        .status(400)
        .json({ message: "userID와 password를 모두 입력하세요." });
    }
    // 설계 이유: 중복된 userID를 방지하기 위해 기존 사용자 목록에서 중복 확인.
    if (users.find((u) => u.userID === userID)) {
      return next(createError(409, "UserID already exists"));
    }
    // 새로운 사용자 생성
    const newUser = {
      id: users.length ? Math.max(...users.map((u) => u.id)) + 1 : 1,
      userID,
      password,
      name: name || "", // 이름은 선택 입력값
    };
    users.push(newUser);
    // 성공적으로 생성된 사용자 정보 반환
    return res.status(201).json({
      message: "User registered",
      user: { id: newUser.id, userID: newUser.userID },
    });
  } catch (err) {
    next(err);
  }
});

// 로그인 -> JWT 토큰 발급
router.post("/login", (req, res, next) => {
  try {
    const { userID, password } = req.body;
    // 설계 이유: userID와 password는 필수 입력값. 누락 시 400 에러 반환.
    if (!userID || !password) {
      return res
        .status(400)
        .json({ message: "userID와 password를 모두 입력하세요." });
    }
    // 사용자 인증
    const user = users.find(
      (u) => u.userID === userID && u.password === password
    );

    if (user) {
      // 설계 이유: 로그인 성공 시 JWT를 발급하여 사용자 인증을 유지.
      const payload = { id: user.id, userID: user.userID };
      const token = generateToken(payload); // JWT 생성
      return res
        .status(200)
        .json({ message: "Login successful", token: token });
    } else {
      // 설계 이유: userID 또는 password가 잘못된 경우 401 에러 반환.
      return next(createError(401, "Invalid credentials"));
    }
  } catch (err) {
    next(err);
  }
});

// --- 보호된 라우트 (인증 필요) ---
// 아래의 모든 라우트는 authenticateJWT 미들웨어를 통과해야만 접근 가능합니다.

// 인증된 사용자 본인의 정보 조회
router.get("/me", authenticateJWT, (req, res) => {
  // 설계 이유: JWT에서 사용자 정보를 추출하여 본인의 정보를 반환.
  const user = users.find((u) => u.id === req.user.id);
  if (user) {
    const { password, ...userInfo } = user; // 비밀번호 제외
    res.status(200).json({ user: userInfo });
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

// 전체 회원 조회 (관리자용 기능으로 가정, 인증 필요)
router.get("/", authenticateJWT, (req, res) => {
  // 설계 이유: 인증된 사용자가 모든 사용자 목록을 조회할 수 있도록 구현.
  const usersInfo = users.map((u) => ({
    id: u.id,
    userID: u.userID,
    name: u.name,
  }));
  res.status(200).json({ users: usersInfo });
});

// 회원 개별 조회, 수정, 탈퇴 통합 라우터
router
  .route("/:id")
  // 개별 회원 정보 조회
  .get(authenticateJWT, (req, res, next) => {
    const id = parseInt(req.params.id);
    // 설계 이유: 본인만 자신의 정보를 조회할 수 있도록 제한.
    if (req.user.id !== id) {
      return next(
        createError(403, "Forbidden: You can only view your own profile.")
      );
    }
    const user = users.find((u) => u.id === id);
    if (user) {
      const { password, ...userInfo } = user; // 비밀번호 제외
      return res.status(200).json({ user: userInfo });
    } else {
      return next(createError(404, "User not found"));
    }
  })
  // 회원 정보 수정
  .put(authenticateJWT, (req, res, next) => {
    try {
      const id = parseInt(req.params.id);
      // 설계 이유: 본인만 자신의 정보를 수정할 수 있도록 제한.
      if (req.user.id !== id) {
        return next(
          createError(403, "Forbidden: You can only update your own profile.")
        );
      }
      const user = users.find((u) => u.id === id);
      if (!user) {
        return next(createError(404, "User not found"));
      }

      const { password, name } = req.body; // 비밀번호와 이름 수정 가능

      // 수정 가능한 필드 확인 및 업데이트
      let isUpdated = false;
      if (password && typeof password === "string") {
        user.password = password;
        isUpdated = true;
      }
      if (name && typeof name === "string") {
        user.name = name;
        isUpdated = true;
      }

      if (isUpdated) {
        // 적어도 하나의 필드가 업데이트된 경우
        return res.status(200).json({
          message: "User updated",
          user: { id: user.id, userID: user.userID, name: user.name },
        });
      } else {
        // 업데이트할 정보가 없는 경우
        return res.status(400).json({ message: "No information to update." });
      }
    } catch (err) {
      next(err);
    }
  })
  // 회원 탈퇴
  .delete(authenticateJWT, (req, res, next) => {
    try {
      const id = parseInt(req.params.id);
      // 설계 이유: 본인만 자신의 계정을 삭제할 수 있도록 제한.
      if (req.user.id !== id) {
        return next(
          createError(403, "Forbidden: You can only delete your own account.")
        );
      }
      const index = users.findIndex((u) => u.id === id);
      if (index === -1) {
        return next(createError(404, "User not found"));
      }
      users.splice(index, 1); // 사용자 삭제
      return res.status(200).json({ message: "User deleted" });
    } catch (err) {
      next(err);
    }
  });

module.exports = router;
