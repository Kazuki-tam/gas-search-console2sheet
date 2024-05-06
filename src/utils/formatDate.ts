/**
 * 日付をYYYY-MM-DD形式の文字列で返す
 * @param {Date} date - 日付
 * @returns {string} フォーマットされた日付文字列
 */
function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);

  return `${year}-${month}-${day}`;
}

export { formatDate };
