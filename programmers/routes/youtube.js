// routes/youtube.js
var express = require("express");
var router = express.Router();
const createError = require("http-errors");

// 유튜버 정보 객체들
let youtuber1 = {
  name: "허수아비",
  subscribers: 2000000,
  description: "취미와 일상을 공유하는 유튜버입니다.",
};
let youtuber2 = {
  name: "코딩하는 남자",
  subscribers: 1500000,
  description: "프로그래밍 관련 다양한 내용을 다루는 유튜버입니다.",
};

// 유튜버 정보를 저장할 Map 객체 생성
let db = new Map();
db.set(1, youtuber1);
db.set(2, youtuber2);

/* GET youtube page. */
router.get("/", function (req, res, next) {
  res.render("youtube", { title: "Express" });
});

// 전체 유튜버 목록 조회
router.get("/all", function (req, res, next) {
  // Map의 모든 값(value)을 배열로 변환
  const youtubers = Array.from(db.values());
  if (youtubers.length === 0) {
    // 유튜버 정보가 없을 때
    return next(createError(404, "등록된 유튜버 정보가 없습니다."));
  }
  res.render("youtube", { title: "유튜버 전체 목록", youtubers });
});

// "/youtube/:id" 경로로 GET 요청이 들어왔을 때 실행되는 라우터를 정의합니다.
// 개별 유튜버 정보 조회
router.get("/:id", (req, res, next) => {
  const id = parseInt(req.params.id); // 1. URL 파라미터(:id)를 정수로 변환 (예: /youtube/2 → id = 2)
  const youtuber = db.get(id); // 2. db(Map)에서 해당 id의 유튜버 정보를 가져옴
  if (youtuber) {
    // 3. 유튜버 정보가 존재하면
    res.render("youtube", {
      title: youtuber.name, // 4. jade/pug 템플릿에 넘길 title(유튜버 이름)
      youtubers: [youtuber], // 5. 유튜버 객체 하나를 배열로 감싼 뒤 youtubers로 전달
      //     ↑ 반복문을 쓰는 jade 템플릿의 일관성을 위해 배열로 넘김 (전체/개별 모두 동일하게)
    });
  } else {
    // 6. 해당 id의 유튜버가 없으면
    next(createError(404)); // 7. 404 에러로 처리 (Not Found)
  }
});

/* POST test page. */
router.post("/", function (req, res, next) {
  // req.body를 활용해서 데이터 처리 가능
  // 응답은 한 번만 보내야 합니다.
  const newId = db.size + 1;
  db.set(newId, req.body);
  res.json({
    message: `${req.body.name} 님, 유튜버 생활을 응원합니다. ${newId}번째 유튜버로 등록되었습니다.`,
    data: req.body,
  });
});

/* PUT test page. */
router.put("/:id", (req, res, next) => {
  const id = parseInt(req.params.id); // 1. URL 파라미터(:id)를 정수로 변환
  if (db.has(id)) {
    const oldData = db.get(id); // 2. 기존 유튜버 정보
    const newData = req.body; // 3. 수정할 유튜버 정보

    // 4. 변경된 부분 찾기
    const changedFields = {}; // 1. 변경된 필드를 저장할 빈 객체 생성
    for (const key in newData) {
      // 2. 새로운 데이터(newData)의 모든 속성(key)에 대해 반복
      if (oldData[key] !== newData[key]) {
        // 3. 기존 데이터(oldData)와 값이 다르면 (=변경되었으면)
        changedFields[key] = { before: oldData[key], after: newData[key] }; // 4. 해당 key의 변경 전(before)과 변경 후(after) 값을 객체로 저장
      }
    }

    db.set(id, newData); // 5. db(Map)에 새로운 유튜버 정보로 업데이트

    res.json({
      message: `유튜버 ${id}번 정보가 수정되었습니다.`,
      changed: changedFields, // 6. 어떤 부분이 수정됐는지 반환
      data: newData,
    });
  } else {
    res.json({
      message: `유튜버 ${id}번 정보가 없습니다.`,
    });
    next(createError(404));
  }
});

/* DELETE test page. */
router.delete("/:id", (req, res, next) => {
  const id = parseInt(req.params.id);
  if (db.has(id)) {
    db.delete(id);
    res.json({
      message: `유튜버 ${id}번이 삭제되었습니다.`,
    });
  } else {
    next(createError(404));
  }
});

/* DELETE ALL test page. */
router.delete("/", (req, res, next) => {
  if (db.size === 0) {
    return next(createError(404, "삭제할 유튜버 정보가 없습니다."));
  } else {
    db.clear();
    res.json({
      message: "모든 유튜버 정보가 삭제되었습니다.",
    });
  }
});

module.exports = router;
