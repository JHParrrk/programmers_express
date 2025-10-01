const createError = require("http-errors");
const userService = require("../services/users.service");
const { generateToken } = require("../../utils/auth");
const { body, param } = require("express-validator");
const validate = require("../../utils/validate"); // validate 미들웨어 가져오기

// 회원가입 컨트롤러
exports.register = [
  // 입력값 검증
  body("email").isEmail().withMessage("유효한 이메일 주소를 입력하세요."), // 이메일 형식 검증
  body("password")
    .isLength({ min: 4 })
    .withMessage("비밀번호는 최소 4자 이상이어야 합니다."), // 비밀번호 최소 길이 검증
  body("name").notEmpty().withMessage("이름을 입력하세요."), // 이름 필수 입력 검증
  body("contacts")
    .matches(/^\d{3}-\d{3,4}-\d{4}$/)
    .withMessage("유효한 연락처를 입력하세요."), // 연락처 형식 검증
  validate, // validate 미들웨어 적용 (검증 결과 처리)
  async (req, res, next) => {
    try {
      const { email, name, password, contacts } = req.body;

      // 이메일 중복 확인
      const existingUser = await userService.findUserByEmail(email);
      if (existingUser) {
        return next(createError(409, "Email already exists")); // 이메일 중복 시 에러 반환
      }

      // 사용자 생성
      const newUser = await userService.createUser({
        email,
        password,
        name,
        contacts,
      });
      res.status(201).json({ message: "User registered", userId: newUser.id }); // 사용자 생성 성공 응답
    } catch (err) {
      next(err); // 에러 처리
    }
  },
];

// 로그인 컨트롤러
exports.login = [
  body("email").isEmail().withMessage("유효한 이메일 주소를 입력하세요."), // 이메일 형식 검증
  body("password").notEmpty().withMessage("비밀번호를 입력하세요."), // 비밀번호 필수 입력 검증
  validate, // validate 미들웨어 적용 (검증 결과 처리)
  async (req, res, next) => {
    try {
      const { email, password } = req.body;

      // 사용자 인증
      const user = await userService.findUserByEmailAndPassword(
        email,
        password
      );
      if (user) {
        const payload = { id: user.id, email: user.email }; // JWT 페이로드 생성
        const token = generateToken(payload); // JWT 생성
        res.status(200).json({ message: "Login successful", token }); // 인증 성공 응답
      } else {
        next(createError(401, "Invalid credentials")); // 인증 실패 시 에러 반환
      }
    } catch (err) {
      next(err); // 에러 처리
    }
  },
];

// 본인 정보 조회 컨트롤러
exports.getMe = async (req, res, next) => {
  try {
    const user = await userService.findUserById(req.user.id); // JWT에서 추출한 ID로 사용자 조회
    if (user) {
      res.status(200).json({ user }); // 사용자 정보 반환
    } else {
      next(createError(404, "User not found")); // 사용자 미발견 시 에러 반환
    }
  } catch (err) {
    next(err); // 에러 처리
  }
};

// 전체 사용자 조회 컨트롤러
exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await userService.getAllUsers(); // 모든 사용자 조회
    res.status(200).json({ users }); // 사용자 목록 반환
  } catch (err) {
    next(err); // 에러 처리
  }
};

// 특정 사용자 조회 컨트롤러
exports.getUserById = [
  param("id").isInt().withMessage("유효한 사용자 ID를 입력하세요."), // 사용자 ID 형식 검증
  validate, // validate 미들웨어 적용
  async (req, res, next) => {
    try {
      const id = parseInt(req.params.id, 10); // 요청 URL에서 사용자 ID 추출
      if (req.user.id !== id) {
        return next(
          createError(403, "Forbidden: You can only view your own profile.")
        ); // 본인만 조회 가능
      }

      const user = await userService.findUserById(id); // 사용자 조회
      if (user) {
        res.status(200).json({ user }); // 사용자 정보 반환
      } else {
        next(createError(404, "User not found")); // 사용자 미발견 시 에러 반환
      }
    } catch (err) {
      next(err); // 에러 처리
    }
  },
];

// 사용자 업데이트 컨트롤러
exports.updateUser = [
  param("id").isInt().withMessage("유효한 사용자 ID를 입력하세요."), // 사용자 ID 형식 검증
  body("password")
    .optional()
    .isLength({ min: 6 })
    .withMessage("비밀번호는 최소 6자 이상이어야 합니다."), // 비밀번호 형식 검증
  body("name").optional().notEmpty().withMessage("이름을 입력하세요."), // 이름 필수 입력 검증
  body("contacts")
    .optional()
    .matches(/^\d{3}-\d{3,4}-\d{4}$/)
    .withMessage("유효한 연락처를 입력하세요."), // 연락처 형식 검증
  validate, // validate 미들웨어 적용
  async (req, res, next) => {
    try {
      const id = parseInt(req.params.id, 10); // 요청 URL에서 사용자 ID 추출
      if (req.user.id !== id) {
        return next(
          createError(403, "Forbidden: You can only update your own profile.")
        ); // 본인만 수정 가능
      }

      const { password, name, contacts } = req.body;
      if (!password && !name && !contacts) {
        return res.status(400).json({ message: "No information to update." }); // 수정할 데이터 없음
      }

      const updatedUser = await userService.updateUser(id, {
        password,
        name,
        contacts,
      }); // 사용자 정보 업데이트
      if (updatedUser) {
        res.status(200).json({ message: "User updated", user: updatedUser }); // 업데이트 성공 응답
      } else {
        next(createError(404, "User not found")); // 사용자 미발견 시 에러 반환
      }
    } catch (err) {
      next(err); // 에러 처리
    }
  },
];

// 사용자 삭제 컨트롤러
exports.deleteUser = [
  param("id").isInt().withMessage("유효한 사용자 ID를 입력하세요."), // 사용자 ID 형식 검증
  validate, // validate 미들웨어 적용
  async (req, res, next) => {
    try {
      const id = parseInt(req.params.id, 10); // 요청 URL에서 사용자 ID 추출
      if (req.user.id !== id) {
        return next(
          createError(403, "Forbidden: You can only delete your own account.")
        ); // 본인만 삭제 가능
      }

      const result = await userService.deleteUser(id); // 사용자 삭제
      if (result.affectedRows > 0) {
        res.status(200).json({ message: "User deleted" }); // 삭제 성공 응답
      } else {
        next(createError(404, "User not found")); // 사용자 미발견 시 에러 반환
      }
    } catch (err) {
      next(err); // 에러 처리
    }
  },
];
