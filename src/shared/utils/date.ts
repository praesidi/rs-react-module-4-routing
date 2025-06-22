type DotFormat = "dd.mm.yyyy" | "mm.yyyy" | "dd.mm.yy" | "mm.yy" | "yyyy.mm.dd";
type SlashFormat =
  | "dd/mm/yyyy"
  | "mm/yyyy"
  | "dd/mm/yy"
  | "mm/yy"
  | "yyyy/mm/dd";
type DashFormat =
  | "dd-mm-yyyy"
  | "mm-yyyy"
  | "dd-mm-yy"
  | "mm-yy"
  | "yyyy-mm-dd";

type Format = DotFormat | SlashFormat | DashFormat;

export const formatDate = (
  date: string | Date | null,
  format: Format
): string => {
  if (date === null) return "";

  const today = new Date(date);
  let dd: number | string = today.getDate();
  let mm: number | string = today.getMonth() + 1; // Months start at 0!
  const yy = today.getFullYear().toString().slice(-2);
  const yyyy = today.getFullYear();

  if (dd < 10) dd = `0${dd}`;
  if (mm < 10) mm = `0${mm}`;

  const day = format.replace("dd", `${dd}`);
  const month = day.replace("mm", `${mm}`);
  let result = "";

  if (format.includes("yyyy")) {
    result = month.replace("yyyy", `${yyyy}`);
  } else {
    result = month.replace("yy", `${yy}`);
  }

  return result;
};
