import { Logo } from "@ui/display"
import Blob from "@ui/display/Blob"

function Index() {
  return (
    <>
      <style jsx global>{`
        html {
          background-color: #000;
          margin: 0;
          padding: 0;
          width: 100%;
          height: 100%;
          max-width: 100vw;
          max-height: 100vh;
          overflow: hidden;
        }

        body {
          height: 100%;
          width: 100%;
          padding: 0;
          margin: 0;
        }
      `}</style>
      <style jsx>{`
        div {
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          right: 0;
          margin: auto;
          color: #ffffff;
          width: 25%;
          max-width: 10rem;
          height: fit-content;
        }
      `}</style>
      <Blob />
      <div>
        <Logo />
      </div>
    </>
  )
}

export default Index
