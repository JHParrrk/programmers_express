const express = require("express");
const { body, param } = require("express-validator");
const router = express.Router();
const channelController = require("../modules/controllers/channels.controller");
const { authenticateJWT } = require("../utils/auth"); // JWT 미들웨어 추가

// `/` 경로 관련 라우트
router
  .route("/")
  .get(authenticateJWT, channelController.getAllChannels) // JWT 인증 추가
  .post(
    authenticateJWT, // JWT 인증 추가
    [
      body("title")
        .isString()
        .notEmpty()
        .withMessage("title은 필수 입력 항목입니다."),
      body("sub_cnt")
        .isInt({ min: 0 })
        .withMessage("sub_cnt는 0 이상의 정수여야 합니다."),
      body("video_count")
        .isInt({ min: 0 })
        .withMessage("video_count는 0 이상의 정수여야 합니다."),
    ],
    channelController.createChannel
  );

// `/user-channels` 경로 관련 라우트
router
  .route("/user-channels")
  .get(authenticateJWT, channelController.getUserChannels); // JWT 인증 추가

// `/:id` 경로 관련 라우트
router
  .route("/:id")
  .get(
    authenticateJWT, // JWT 인증 추가
    [param("id").isInt({ gt: 0 }).withMessage("id는 양의 정수여야 합니다.")],
    channelController.getChannel
  )
  .put(
    authenticateJWT, // JWT 인증 추가
    [
      param("id").isInt({ gt: 0 }).withMessage("id는 양의 정수여야 합니다."),
      body("title")
        .isString()
        .notEmpty()
        .withMessage("title은 필수 입력 항목입니다."),
    ],
    channelController.updateChannel
  )
  .delete(
    authenticateJWT, // JWT 인증 추가
    [param("id").isInt({ gt: 0 }).withMessage("id는 양의 정수여야 합니다.")],
    channelController.deleteChannel
  );

module.exports = router;
