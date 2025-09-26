const express = require("express");
const createError = require("http-errors");
const router = express.Router();

// 채널 정보를 저장할 Map 객체 생성
let db = new Map();
db.set(1, {
  user_id: 1,
  channel_title: "허수아비",
  subscribers: 2000000,
  description: "취미와 일상을 공유하는 유튜버입니다.",
});
db.set(2, {
  user_id: 1,
  channel_title: "코딩하는 남자",
  subscribers: 1500000,
  description: "프로그래밍 관련 다양한 내용을 다루는 채널입니다.",
});
db.set(3, {
  user_id: 2,
  channel_title: "맛있는 요리",
  subscribers: 300000,
  description: "쉽고 맛있는 요리 레시피를 소개하는 채널입니다.",
});
db.set(4, {
  user_id: 2,
  channel_title: "여행하는 삶",
  subscribers: 500000,
  description: "세계를 여행하며 다양한 문화를 소개하는 채널입니다.",
});
db.set(5, {
  user_id: 3,
  channel_title: "헬스와 피트니스",
  subscribers: 800000,
  description: "건강한 삶을 위한 운동과 영양 정보를 제공하는 채널입니다.",
});
db.set(6, {
  user_id: 3,
  channel_title: "테크 리뷰",
  subscribers: 1200000,
  description: "최신 기술 제품 리뷰와 IT 뉴스를 다루는 채널입니다.",
});

// **1. `/` 경로 관련 라우트**
router
  .route("/")
  // **전체 채널 목록 조회**
  .get((req, res, next) => {
    try {
      const channels = Array.from(db.values());

      if (channels.length === 0) {
        return next(createError(404, "등록된 채널이 없습니다."));
      }

      res.json({
        title: "전체 채널 목록",
        channels,
      });
    } catch (err) {
      next(err);
    }
  })
  // **새로운 채널 등록**
  .post((req, res, next) => {
    try {
      const { user_id, channel_title, subscribers, description } = req.body;

      // 필수 값 검증
      if (!user_id || !channel_title || !subscribers || !description) {
        return res.status(400).json({
          message:
            "user_id, channel_title, subscribers, description을 모두 입력해야 합니다.",
        });
      }

      if (isNaN(user_id) || isNaN(subscribers)) {
        return res.status(400).json({
          message: "user_id와 subscribers는 숫자로 입력해야 합니다.",
        });
      }

      // 새로운 채널 ID 생성
      const newId = db.size + 1;

      // 새로운 채널 데이터 생성 및 저장
      const newChannel = {
        user_id: parseInt(user_id),
        channel_title,
        subscribers: parseInt(subscribers),
        description,
      };
      db.set(newId, newChannel);

      // 성공 응답
      res.status(201).json({
        message: "새로운 채널이 성공적으로 등록되었습니다.",
        channel: { id: newId, ...newChannel },
      });
    } catch (err) {
      next(err);
    }
  });

router.route("/user-channels").get((req, res, next) => {
  const userId = parseInt(req.headers["user_id"]);
  if (isNaN(userId)) {
    return res.status(400).json({ message: "유효하지 않은 user_id입니다." });
  }

  const channels = Array.from(db.values()).filter(
    (channel) => channel.user_id === userId
  );

  if (channels.length === 0) {
    return next(createError(404, "해당 사용자의 채널 정보가 없습니다."));
  }

  res.json({
    title: `사용자 ${userId}의 채널 목록`,
    channels,
  });
});

router
  .route("/:id")
  .get((req, res, next) => {
    const id = parseInt(req.params.id);
    const channel = db.get(id);
    if (!channel) {
      return next(createError(404, "채널을 찾을 수 없습니다."));
    }

    const userId = parseInt(req.headers["user_id"]);
    if (isNaN(userId) || channel.user_id !== userId) {
      return res
        .status(403)
        .json({ message: "해당 채널에 접근 권한이 없습니다." });
    }

    res.json({
      title: channel.channel_title,
      channel,
    });
  })
  .put((req, res, next) => {
    const id = parseInt(req.params.id);
    const channel = db.get(id);
    if (!channel) {
      return next(createError(404, "채널을 찾을 수 없습니다."));
    }

    const userId = parseInt(req.headers["user_id"]);
    if (isNaN(userId) || channel.user_id !== userId) {
      return res
        .status(403)
        .json({ message: "해당 채널에 접근 권한이 없습니다." });
    }

    try {
      if (!req.body || typeof req.body !== "object") {
        return res
          .status(400)
          .json({ message: "요청 데이터가 올바르지 않습니다." });
      }

      const oldData = db.get(id);
      const newData = { ...oldData, ...req.body };

      db.set(id, newData);

      res.json({
        message: `채널 ${id}번 정보가 수정되었습니다.`,
        data: newData,
      });
    } catch (err) {
      next(err);
    }
  })
  .delete((req, res, next) => {
    const id = parseInt(req.params.id);
    const channel = db.get(id);
    if (!channel) {
      return next(createError(404, "채널을 찾을 수 없습니다."));
    }

    const userId = parseInt(req.headers["user_id"]);
    if (isNaN(userId) || channel.user_id !== userId) {
      return res
        .status(403)
        .json({ message: "해당 채널에 접근 권한이 없습니다." });
    }

    db.delete(id);
    res.json({
      message: `채널 ${id}번이 삭제되었습니다.`,
    });
  });

module.exports = router;
