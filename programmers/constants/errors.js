// constants/errors.js

module.exports = {
  USER_ALREADY_EXISTS: { statusCode: 409, message: "Email already exists" },
  INVALID_CREDENTIALS: { statusCode: 401, message: "Invalid credentials" },
  FORBIDDEN: { statusCode: 403, message: "Forbidden" },
  NOT_FOUND: { statusCode: 404, message: "Not found" },
  NO_INFORMATION_TO_UPDATE: {
    statusCode: 400,
    message: "No information to update.",
  },
  REFRESH_TOKEN_REQUIRED: {
    statusCode: 400,
    message: "Refresh token is required",
  },
  INVALID_OR_EXPIRED_REFRESH_TOKEN: {
    statusCode: 403,
    message: "Invalid or expired refresh token",
  },
};
