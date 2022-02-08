import { Heading } from "@ui/display"
import { Dashboard } from "@ui/sections"

function Home() {
  return (
    <>
      <Heading size={2} bold>
        Dashboard
      </Heading>
    </>
  )
}

Home.Title = "Dashboard"
Home.Layout = Dashboard
export default Home
