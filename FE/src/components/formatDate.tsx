export const FormatDate = (date: string | undefined) => {
  const options: Intl.DateTimeFormatOptions = { day: "numeric", month: "long" };

  const formattedDate = new Date(date!).toLocaleDateString("vi-VN", options);
  return formattedDate;
};
