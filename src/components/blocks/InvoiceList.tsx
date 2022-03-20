import BREAKPOINTS from "@constants/breakpoints"
import { Invoice } from "@interfaces/invoice"
import { IconButton } from "@ui/controls"
import { Spinner, Text } from "@ui/display"
import { DownloadIcon, TuneIcon } from "@ui/display/icons"
import { Card } from "@ui/layout"
import useInvoiceNumber from "@utils/useInvoiceNumber"
import { format } from "date-fns"
import { memo } from "react"

interface InvoiceListProps {
  data: Invoice[]
}

const InvoiceList = ({ data }: InvoiceListProps) => {
  return (
    <>
      <style jsx>{`
        .invoice {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem;
          border-bottom: 1px solid var(--theme-colors-border);
        }

        .invoice:last-child {
          border: none;
        }

        .invoice > div {
          display: flex;
          align-items: center;
          column-gap: 1rem;
        }

        .actions {
          border-left: 1px solid var(--theme-colors-border);
          padding-left: 1rem;
          display: flex;
          column-gap: 0.5rem;
        }

        .loading {
          width: 4rem;
          margin: 4rem auto;
        }

        @media (max-width: ${BREAKPOINTS.md}px) {
          .invoice {
            flex-direction: column;
            row-gap: 0.5rem;
          }
        }
      `}</style>
      <Card padding={0}>
        {data ? (
          data.map((i) => (
            <div key={i.id} className="invoice">
              <Text size="md" weight="700">
                <Text
                  as="span"
                  size="md"
                  style={{ opacity: 0.65, fontFamily: "Product Sans", marginRight: "0.5rem" }}>
                  {useInvoiceNumber(i.invoice_num)}
                </Text>
                {i.recipient}
              </Text>
              <div>
                <Text>{format(new Date(i.date), "do, LLLL yyyy")}</Text>
                <div className="actions">
                  <IconButton>
                    <TuneIcon />
                  </IconButton>
                  <IconButton>
                    <DownloadIcon />
                  </IconButton>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="loading">
            <Spinner />
          </div>
        )}
      </Card>
    </>
  )
}

export default memo(InvoiceList)
