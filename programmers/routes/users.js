const express = require("express");
const router = express.Router();
const createError = require("http-errors");

// 메모리 기반 유저 데이터
let users = [
  { id: 1, userID: "doffltm123", password: "pwd123" },
  { id: 2, userID: "qkq456", password: "pwd456" },
  { id: 3, userID: "ckffl789", password: "pwd789" },
];

// const user = {
//   name: "Alice",
//   age: 28,
//   job: "developer"
// };
// // 값이 아니라 키(속성 이름) 만 배열로 가져옵니다.
// console.log(Object.keys(user)); // ["name", "age", "job"]

// 전체 회원 조회
router.get("/", (req, res) => {
  res.status(200).render("users", { title: "Users", users });
});

// 로그인
router.post("/login", (req, res, next) => {
  try {
    const { userID, password } = req.body;
    if (!userID || !password) {
      return res
        .status(400)
        .json({ message: "userID와 password를 모두 입력하세요." });
    }
    const user = users.find(
      (u) => u.userID === userID && u.password === password
    );
    if (user) {
      return res.status(200).json({ message: "Login successful", user });
    } else {
      return next(createError(401, "Invalid credentials"));
    }
  } catch (err) {
    next(err);
  }
});

// 회원가입
router.post("/register", (req, res, next) => {
  try {
    const { userID, password } = req.body;
    if (!userID || !password) {
      return res
        .status(400)
        .json({ message: "userID와 password를 모두 입력하세요." });
    }
    if (users.find((u) => u.userID === userID)) {
      return next(createError(409, "UserID already exists"));
    }
    const newUser = {
      id: users.length ? Math.max(...users.map((u) => u.id)) + 1 : 1,
      userID,
      password,
    };
    users.push(newUser);
    return res.status(201).json({ message: "User registered", user: newUser });
  } catch (err) {
    next(err);
  }
});

// 회원 개별 조회(마이페이지)
router.get("/:id", (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "유효하지 않은 id입니다." });
    }
    const user = users.find((u) => u.id === id);
    if (user) {
      return res.status(200).json({ user });
    } else {
      return next(createError(404, "User not found"));
    }
  } catch (err) {
    next(err);
  }
});

// 회원 정보 수정
router.put("/:id", (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "유효하지 않은 id입니다." });
    }
    const user = users.find((u) => u.id === id);
    if (!user) {
      return next(createError(404, "User not found"));
    }
    const { userID, password } = req.body;
    let updated = false;
    if (userID && typeof userID === "string") {
      // 중복 userID 체크
      if (users.some((u) => u.userID === userID && u.id !== id)) {
        return res.status(409).json({ message: "이미 존재하는 userID입니다." });
      }
      user.userID = userID;
      updated = true;
    }
    if (password && typeof password === "string") {
      user.password = password;
      updated = true;
    }
    if (!updated) {
      return res.status(400).json({ message: "수정할 정보가 없습니다." });
    }
    return res.status(200).json({ message: "User updated", user });
  } catch (err) {
    next(err);
  }
});

// 회원 탈퇴
router.delete("/:id", (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "유효하지 않은 id입니다." });
    }
    const index = users.findIndex((u) => u.id === id);
    if (index === -1) {
      return next(createError(404, "User not found"));
    }
    users.splice(index, 1);
    return res.status(200).json({ message: "User deleted" });
  } catch (err) {
    next(err);
  }
});

// users.js 파일에 추가할 코드
// 회원 정보 수정 페이지 렌더링
router.get("/edit/:id", (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).send("유효하지 않은 id입니다.");
    }
    const user = users.find((u) => u.id === id);
    if (user) {
      res.render("edit-user", { title: `Edit User - ${user.userID}`, user });
    } else {
      return next(createError(404, "User not found"));
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
