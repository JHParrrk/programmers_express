const createError = require("http-errors");
const userService = require("../services/users.service");
const { generateToken } = require("../../utils/auth");

// 컨트롤러 함수들은 async/await를 사용하여 비동기 로직을 처리합니다.
exports.register = async (req, res, next) => {
  try {
    const { email, name, password, contacts } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "email과 password를 모두 입력하세요." });
    }

    // 이메일 중복 확인
    const existingUser = await userService.findUserByEmail(email);
    if (existingUser) {
      return next(createError(409, "Email already exists"));
    }

    // 사용자 생성
    const newUser = await userService.createUser({
      email,
      password,
      name,
      contacts,
    });
    res.status(201).json({ message: "User registered", userId: newUser.id });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "email과 password를 모두 입력하세요." });
    }

    // 사용자 인증
    const user = await userService.findUserByEmailAndPassword(email, password);
    if (user) {
      const payload = { id: user.id, email: user.email };
      const token = generateToken(payload); // JWT 생성
      res.status(200).json({ message: "Login successful", token });
    } else {
      next(createError(401, "Invalid credentials"));
    }
  } catch (err) {
    next(err);
  }
};

exports.getMe = async (req, res, next) => {
  try {
    // authenticateJWT 미들웨어에서 req.user에 id를 주입해줍니다.
    const user = await userService.findUserById(req.user.id);
    if (user) {
      res.status(200).json({ user });
    } else {
      next(createError(404, "User not found"));
    }
  } catch (err) {
    next(err);
  }
};

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json({ users });
  } catch (err) {
    next(err);
  }
};

exports.getUserById = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    // 본인만 자신의 정보를 조회할 수 있도록 제한
    if (req.user.id !== id) {
      return next(
        createError(403, "Forbidden: You can only view your own profile.")
      );
    }

    const user = await userService.findUserById(id);
    if (user) {
      res.status(200).json({ user });
    } else {
      next(createError(404, "User not found"));
    }
  } catch (err) {
    next(err);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    // 본인만 자신의 정보를 수정할 수 있도록 제한
    if (req.user.id !== id) {
      return next(
        createError(403, "Forbidden: You can only update your own profile.")
      );
    }

    const { password, name, contacts } = req.body;
    if (!password && !name && !contacts) {
      return res.status(400).json({ message: "No information to update." });
    }

    const updatedUser = await userService.updateUser(id, {
      password,
      name,
      contacts,
    });
    if (updatedUser) {
      res.status(200).json({ message: "User updated", user: updatedUser });
    } else {
      next(createError(404, "User not found"));
    }
  } catch (err) {
    next(err);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    // 본인만 자신의 계정을 삭제할 수 있도록 제한
    if (req.user.id !== id) {
      return next(
        createError(403, "Forbidden: You can only delete your own account.")
      );
    }

    const result = await userService.deleteUser(id);
    if (result.affectedRows > 0) {
      res.status(200).json({ message: "User deleted" });
    } else {
      next(createError(404, "User not found"));
    }
  } catch (err) {
    next(err);
  }
};
