const dbPool = require("../../database/connection/mariaDB");
const createError = require("http-errors");

/**
 * 채널의 존재 여부를 확인하고 반환합니다.
 * @param {number} id - 채널 ID
 * @returns {Promise<object>} - 채널 정보
 * @throws {HttpError} - 채널이 없을 경우 404 에러 발생
 */
const getChannelById = async (id) => {
  const [rows] = await dbPool.query("SELECT * FROM channels WHERE id = ?", [
    id,
  ]);
  const channel = rows[0];
  if (!channel) {
    throw createError(404, "채널을 찾을 수 없습니다.");
  }
  return channel;
};

/**
 * 모든 채널 목록을 조회합니다.
 * @returns {Promise<Array>} - 채널 목록
 * @throws {HttpError} - 채널이 없을 경우 404 에러 발생
 */
const findAllChannels = async () => {
  const [channels] = await dbPool.query("SELECT * FROM channels");
  if (channels.length === 0) {
    throw createError(404, "등록된 채널이 없습니다.");
  }
  return channels;
};

/**
 * 새로운 채널을 등록합니다.
 * @param {object} channelData
 * @returns {Promise<object>} - 생성된 채널 정보
 */
const addChannel = async (channelData) => {
  const { title, sub_cnt, video_count, user_id } = channelData;
  const sql = `
    INSERT INTO channels (title, sub_cnt, video_count, user_id) 
    VALUES (?, ?, ?, ?)
  `;
  const [result] = await dbPool.query(sql, [
    title,
    sub_cnt,
    video_count,
    user_id,
  ]);
  return {
    id: result.insertId,
    user_id,
    title,
    sub_cnt,
    video_count,
  };
};

/**
 * 특정 사용자의 채널 목록을 조회합니다.
 * @param {number} userId - 사용자 ID
 * @returns {Promise<Array>} - 해당 사용자의 채널 목록
 * @throws {HttpError} - 채널이 없을 경우 404 에러 발생
 */
const findChannelsByUserId = async (userId) => {
  const [channels] = await dbPool.query(
    "SELECT * FROM channels WHERE user_id = ?",
    [userId]
  );
  if (channels.length === 0) {
    throw createError(404, "해당 사용자의 채널 정보가 없습니다.");
  }
  return channels;
};

/**
 * 특정 채널의 제목을 수정합니다.
 * @param {number} id - 채널 ID
 * @param {string} newTitle - 새로운 채널 제목
 * @returns {Promise<object>} - 수정된 채널 정보
 */
const updateChannelTitle = async (id, newTitle) => {
  await dbPool.query("UPDATE channels SET title = ? WHERE id = ?", [
    newTitle,
    id,
  ]);
  return await getChannelById(id);
};

/**
 * 특정 채널을 삭제합니다.
 * @param {number} id - 채널 ID
 * @returns {Promise<void>}
 */
const removeChannel = async (id) => {
  await dbPool.query("DELETE FROM channels WHERE id = ?", [id]);
};

module.exports = {
  getChannelById,
  findAllChannels,
  addChannel,
  findChannelsByUserId,
  updateChannelTitle,
  removeChannel,
};
