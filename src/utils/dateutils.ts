export const formatDate = (dateString: string) => {
  const date = parseDate(dateString);
  return date.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

export const parseDate = (dateString: string) => {
  const [day, month, year] = dateString.split("/");
  return new Date(`${year}-${month}-${day}`);
};

// dd/mm/yyyy <-> yyyy-mm-dd (the value of <input type="date">); "" when unparseable.
export const toIsoDate = (dateString: string) => {
  const m = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/.exec(dateString);
  return m ? `${m[3]}-${m[2].padStart(2, "0")}-${m[1].padStart(2, "0")}` : "";
};

export const fromIsoDate = (iso: string) => {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  return m ? `${m[3]}/${m[2]}/${m[1]}` : "";
};
