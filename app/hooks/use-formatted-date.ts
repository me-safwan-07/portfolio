import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

type Options = {
  relative?: boolean;
};

export const useFormattedDate = (
  date: string | Date,
  options: Options = {}
) => {
  const { relative = false } = options;

  const parsedDate = dayjs(date);
  const now = dayjs();

  if (relative) {
    const diffInWeeks = now.diff(parsedDate, 'week');
    return Math.abs(diffInWeeks) <= 1
      ? parsedDate.fromNow() // e.g., "2 days ago"
      : parsedDate.format('MMM D, YYYY').toUpperCase(); // e.g., "AUG 22, 2024"
  }

  return parsedDate.format('MMM D, YYYY').toUpperCase();
};
