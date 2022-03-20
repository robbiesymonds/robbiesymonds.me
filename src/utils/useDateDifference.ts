import { formatDistanceToNowStrict } from "date-fns"

function useDateDifference(date: Date) {
  const diff = formatDistanceToNowStrict(date)
  const [t, s] = diff.split(" ")
  return `${t}${s[0]} ago`
}

export default useDateDifference
