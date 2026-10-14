export function parseDate(value) {
  // Human-readable frontmatter dates describe a calendar day, not local midnight.
  // Parse them in UTC so BST and other time zones cannot move a post to yesterday.
  const input = typeof value === "string" && /^\d{1,2} [a-z]+ \d{4}$/i.test(value)
    ? `${value} UTC`
    : value;
  const date = new Date(input);
  if (Number.isNaN(date.getTime())) throw new Error(`Invalid date: ${value}`);
  return date;
}

export function formatDate(value) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric", month: "short", year: "numeric", timeZone: "UTC",
  }).format(parseDate(value));
}
