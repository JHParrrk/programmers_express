const express = require("express");
const router = express.Router();
const userController = require("../modules/controllers/users.controller");
const { authenticateJWT } = require("../utils/auth");

// 회원가입 및 로그인 (인증 불필요)
router.post("/register", userController.register);
router.post("/login", userController.login);

// --- 보호된 라우트 (인증 필요) ---
// 아래의 모든 라우트는 authenticateJWT 미들웨어를 통과해야만 접근 가능합니다.

// 전체 회원 조회 (관리자용 기능으로 가정)
router.get("/", authenticateJWT, userController.getAllUsers);

// 인증된 사용자 본인의 정보 조회
router.get("/me", authenticateJWT, userController.getMe);

// 개별 회원 정보 조회, 수정, 탈퇴 (본인만 가능)
router
  .route("/:id")
  .get(authenticateJWT, userController.getUserById)
  .put(authenticateJWT, userController.updateUser)
  .delete(authenticateJWT, userController.deleteUser);

module.exports = router;
