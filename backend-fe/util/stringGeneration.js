function generateRandomString(length) {
  const charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  const charsetLength = charset.length;
  for (let i = 0; i < length; i++) {
    result += charset.charAt(Math.floor(Math.random() * charsetLength));
  }
  return result;
}

module.exports = generateRandomString;
