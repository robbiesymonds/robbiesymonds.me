import BREAKPOINTS from "@constants/breakpoints"
import { Heading, Spinner, Text } from "@ui/display"
import { Card } from "@ui/layout"
import { memo } from "react"

interface StatisticsProps {
  data: {
    type?: "text" | "action"
    title: string
    value: string | React.ReactNode
  }[]
}

const Statistics = ({ data }: StatisticsProps) => {
  return (
    <>
      <style jsx>
        {`
          .stats {
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex-direction: row;
          }

          .stats > div {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            flex-direction: column;
            row-gap: 0.25rem;
            text-align: center;
            border-right: 1px solid var(--theme-colors-border);
            padding: 1rem 3rem;
            flex-grow: 1;
            max-width: 33%;
            box-sizing: border-box;
          }

          .stats > div:last-child {
            border: none;
          }

          span {
            padding-top: 0.35rem;
            padding-bottom: 0.55rem;
            width: 1.5rem;
            height: 1.5rem;
            display: block;
          }

          @media (max-width: ${BREAKPOINTS.md}px) {
            .stats {
              flex-direction: column;
            }

            .stats > div {
              border: none;
              max-width: 100%;
              border-bottom: 1px solid var(--theme-colors-border);
              width: 100%;
              padding: 1.5rem 0;
            }
          }
        `}
      </style>
      <Card margin={"2rem auto"}>
        <div className="stats">
          {data &&
            data.map(({ type, title, value }) => (
              <div key={title}>
                <Text
                  weight="500"
                  style={{ opacity: 0.75, marginBottom: `${type === "action" ? 0.5 : 0}rem` }}>
                  {title}
                </Text>
                {type === "action" ? (
                  value
                ) : (
                  <Heading size={2}>
                    {(value as string) ?? (
                      <span>
                        <Spinner />
                      </span>
                    )}
                  </Heading>
                )}
              </div>
            ))}
        </div>
      </Card>
    </>
  )
}

export default memo(Statistics)
