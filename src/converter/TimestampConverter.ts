export const MAIN_NET_NEMESIS_BLOCK_SYMBOL_TIME: number = 1615853185 * 1000;
export const TEST_NET_NEMESIS_BLOCK_SYMBOL_TIME: number = 1667250467 * 1000;
// 1667250467
// timestamp
export const getTimeStamp = (
  timestamp: number,
  networkType: number
): string => {
  let nemesisTime = 0;

  if (networkType === 104) {
    nemesisTime = MAIN_NET_NEMESIS_BLOCK_SYMBOL_TIME;
  } else if (networkType === 152) {
    nemesisTime = TEST_NET_NEMESIS_BLOCK_SYMBOL_TIME;
  }
  const datetime = new Date(timestamp + nemesisTime);
  const formatDatetime = formatDate_yyyyMMddhhmmss(datetime);
  console.log(formatDatetime);
  return formatDatetime;
};

export const formatDate_yyyyMMddhhmmss = (current_datetime: Date) => {
  const yyyy = current_datetime.getFullYear();
  const MM = (current_datetime.getMonth() + 1).toString().padStart(2, '0');
  const dd = current_datetime.getDate().toString().padStart(2, '0');
  const hh = current_datetime.getHours().toString().padStart(2, '0');
  const mm = current_datetime.getMinutes().toString().padStart(2, '0');
  const ss = current_datetime.getSeconds().toString().padStart(2, '0');
  const formatted_date = `${yyyy}-${MM}-${dd} ${hh}:${mm}:${ss}`;
  return formatted_date;
};

export const formatDate_yyyyMMdd = (current_datetime: Date) => {
  const yyyy = current_datetime.getFullYear();
  const MM = (current_datetime.getMonth() + 1).toString().padStart(2, '0');
  const dd = current_datetime.getDate().toString().padStart(2, '0');
  const formatted_date = `${yyyy}-${MM}-${dd}`;
  return formatted_date;
};
