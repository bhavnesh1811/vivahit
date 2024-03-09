export const calculateData = (days, date, index) => {
  if (days === 1) {
    return date.getHours() % 2 === 0
      ? date.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          weekday: "short",
        })
      : "";
  } else if (days <= 7) {
    return date.toLocaleDateString("default", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  } else if (days <= 30) {
    return index % 3 === 0
      ? date.toLocaleDateString("default", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })
      : "";
  } else if (days <= 90) {
    return index % 7 === 0
      ? date.toLocaleDateString("default", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })
      : "";
  } else {
    return date.toLocaleDateString("default", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }
};