// Utility to parse the reviews from the provided text format
// Assumes reviews are separated by 'Date :-' and each review contains a date, author, and content

export interface Review {
  date: string;
  author: string;
  content: string;
}

export function parseReviews(raw: string): Review[] {
  // Split by 'Date :-' and filter out empty entries
  const entries = raw.split(/Date\s*:-/g).map(e => e.trim()).filter(Boolean);
  return entries.map(entry => {
    // The date is the first line (may have leading/trailing whitespace)
    const lines = entry.split(/\r?\n/).filter(Boolean);
    let date = '';
    let author = '';
    let content = '';
    if (lines.length > 0) {
      // Date is the first line, or first word(s) before a line break
      const dateMatch = lines[0].match(/(\d{2}\/\d{2}\/\d{4})/);
      if (dateMatch) {
        date = dateMatch[1];
        lines.shift();
      }
    }
    if (lines.length > 0) {
      author = lines[0].trim();
      content = lines.slice(1).join('\n').trim();
    }
    return { date, author, content };
  });
}
