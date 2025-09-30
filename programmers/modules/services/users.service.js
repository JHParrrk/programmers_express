const dbPool = require("../../database/connection/mariaDB");

// DB 쿼리 결과를 파싱하는 헬퍼 함수
// MariaDB 드라이버는 [결과, 필드정보] 형태의 배열을 반환하므로 첫 번째 요소만 사용합니다.
const parseResult = (result) => result[0];

exports.createUser = async ({ email, name, password, contacts }) => {
  const result = await dbPool.query(
    "INSERT INTO users (email, password, name, contacts) VALUES (?, ?, ?, ?)",
    [email, password, name, contacts]
  );
  const insertId = parseResult(result).insertId;
  return { id: insertId, email, name };
};

exports.findUserByEmail = async (email) => {
  const result = await dbPool.query(
    "SELECT id, email, name, contacts FROM users WHERE email = ?",
    [email]
  );
  return parseResult(result)[0]; // 첫 번째 사용자 반환
};

exports.findUserByEmailAndPassword = async (email, password) => {
  const result = await dbPool.query(
    "SELECT id, email, name, contacts FROM users WHERE email = ? AND password = ?",
    [email, password]
  );
  return parseResult(result)[0];
};

exports.findUserById = async (id) => {
  const result = await dbPool.query(
    "SELECT id, email, name, contacts FROM users WHERE id = ?",
    [id]
  );
  return parseResult(result)[0];
};

exports.getAllUsers = async () => {
  const result = await dbPool.query(
    "SELECT id, email, name, contacts FROM users"
  );
  return parseResult(result);
};

exports.updateUser = async (id, { password, name, contacts }) => {
  // 업데이트할 필드만 동적으로 구성
  const fields = [];
  const params = [];
  if (password) {
    fields.push("password = ?");
    params.push(password);
  }
  if (name) {
    fields.push("name = ?");
    params.push(name);
  }
  if (contacts) {
    fields.push("contacts = ?");
    params.push(JSON.stringify(contacts));
  }
  params.push(id); // WHERE 절에 들어갈 id

  const sql = `UPDATE users SET ${fields.join(", ")} WHERE id = ?`;
  await dbPool.query(sql, params);

  // 업데이트된 정보를 다시 조회하여 반환
  return this.findUserById(id);
};

exports.deleteUser = async (id) => {
  const result = await dbPool.query("DELETE FROM users WHERE id = ?", [id]);
  return parseResult(result); // affectedRows 등의 정보가 담긴 객체 반환
};
