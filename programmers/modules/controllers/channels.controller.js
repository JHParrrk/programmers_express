const channelService = require("../services/channels.service");
const { validationResult } = require("express-validator");

// 전체 채널 목록 조회
const getAllChannels = async (req, res, next) => {
  try {
    const channels = await channelService.findAllChannels();
    res.json({
      title: "전체 채널 목록",
      channels,
    });
  } catch (err) {
    next(err);
  }
};

// 새로운 채널 등록
const createChannel = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, sub_cnt, video_count } = req.body;
    const userId = req.user.id; // JWT에서 추출한 사용자 ID 사용
    const newChannel = await channelService.addChannel({
      user_id: userId,
      title,
      sub_cnt,
      video_count,
    });

    res.status(201).json({
      message: "새로운 채널이 성공적으로 등록되었습니다.",
      channel: newChannel,
    });
  } catch (err) {
    next(err);
  }
};

// 특정 사용자의 채널 목록 조회
const getUserChannels = async (req, res, next) => {
  try {
    const userId = req.user.id; // JWT에서 사용자 ID 추출
    const channels = await channelService.findChannelsByUserId(userId);

    res.json({
      title: `사용자 ${userId}의 채널 목록`,
      channels,
    });
  } catch (err) {
    next(err);
  }
};

// 특정 채널 상세 조회
const getChannel = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const id = parseInt(req.params.id);
    const userId = req.user.id; // JWT에서 사용자 ID 추출

    const channel = await channelService.getChannelById(id);
    if (channel.user_id !== userId) {
      return res
        .status(403)
        .json({ message: "해당 채널에 접근 권한이 없습니다." });
    }

    res.json({
      title: channel.title,
      channel,
    });
  } catch (err) {
    next(err);
  }
};

// 특정 채널 정보 수정 (PUT)
const updateChannel = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const id = parseInt(req.params.id);
    const userId = req.user.id; // JWT에서 사용자 ID 추출

    const channel = await channelService.getChannelById(id);
    if (channel.user_id !== userId) {
      return res
        .status(403)
        .json({ message: "해당 채널에 접근 권한이 없습니다." });
    }

    const updatedChannel = await channelService.updateChannelTitle(
      id,
      req.body.title
    );

    res.json({
      message: `채널 ${id}번 정보가 수정되었습니다.`,
      data: updatedChannel,
    });
  } catch (err) {
    next(err);
  }
};

// 특정 채널 삭제
const deleteChannel = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const id = parseInt(req.params.id);
    const userId = req.user.id; // JWT에서 사용자 ID 추출

    const channel = await channelService.getChannelById(id);
    if (channel.user_id !== userId) {
      return res
        .status(403)
        .json({ message: "해당 채널에 접근 권한이 없습니다." });
    }

    await channelService.removeChannel(id);
    res.json({
      message: `채널 ${id}번이 삭제되었습니다.`,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllChannels,
  createChannel,
  getUserChannels,
  getChannel,
  updateChannel,
  deleteChannel,
};
