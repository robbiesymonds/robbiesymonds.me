import { formatDistanceToNowStrict, isToday } from "date-fns"

function useDateDifference(date: Date) {
  if (isToday(date)) return `Today`

  date.setHours(12)
  const diff = formatDistanceToNowStrict(date)
  const [t, s] = diff.split(" ")
  return `${t}${s[0]} ago`
}

export default useDateDifference
