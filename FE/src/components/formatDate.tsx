export const FormatDate = (date: string | undefined) => {
  const options: Intl.DateTimeFormatOptions = { day: "numeric", month: "long" };

  const formattedDate = new Date(date!).toLocaleDateString("vi-VN", options);
  return formattedDate;
};

export const FormatfullDate = (d: string | undefined) => {
  const date = new Date(d);

  // Lấy ngày (Day), tháng (Month) và năm (Year)
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year} `;
};
export const formatDateTime = (
  isoDate: string,
  format: "date" | "time" | "dateTime"
): string => {
  const date = new Date(isoDate);

  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");

  switch (format) {
    case "date":
      return `${day}/${month}/${year}`;
    case "time":
      return `${hours}:${minutes}`;
    case "dateTime":
      return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
    default:
      throw new Error(
        'Invalid format type. Use "date", "time", or "dateTime".'
      );
  }
};
export const FormatDateEnglish = (d: string | undefined) => {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const formattedDate = new Date(d!).toLocaleDateString("en-US", options);
  return formattedDate;
};
