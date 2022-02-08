import { Logo } from "@ui/display"
import Particles from "react-tsparticles"

function Index() {
  return (
    <>
      <style jsx>{`
        :global(html) {
          background-color: #000;
          width: 100%;
          margin: 0;
          padding: 0;
          max-width: 100vw;
          max-height: 100vh;
          height: 100%;
          overflow: hidden;
        }

        div {
          width: 100vw;
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        :global(svg) {
          color: white;
          width: 8rem;
          height: auto;
        }
      `}</style>

      <Particles
        options={{
          interactivity: {
            events: {
              onClick: {
                enable: true,
                mode: "repulse",
              },
            },
            modes: {
              repulse: {
                distance: 200,
              },
            },
          },
          particles: {
            color: {
              value: "#ffffff",
            },
            links: {
              color: {
                value: "#ffffff",
              },
              distance: 150,
              opacity: 0.25,
            },
            move: {
              attract: {
                rotate: {
                  x: 600,
                  y: 600,
                },
              },
              enable: true,
              outModes: {
                bottom: "out",
                left: "out",
                right: "out",
                top: "out",
                default: "out",
              },
              random: true,
              speed: 1,
            },
            number: {
              density: {
                enable: true,
              },
              value: 160,
            },
            opacity: {
              random: true,
              value: {
                min: 0,
                max: 1,
              },
              animation: {
                enable: true,
                speed: 0.9,
                minimumValue: 0,
              },
            },
            size: {
              random: true,
              value: {
                min: 0.9,
                max: 2.5,
              },
              animation: {
                speed: 4,
                minimumValue: 0.3,
              },
            },
          },
        }}
      />
      <div>
        <Logo />
      </div>
    </>
  )
}

export default Index
