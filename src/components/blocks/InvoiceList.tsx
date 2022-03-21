import BREAKPOINTS from "@constants/breakpoints"
import { Invoice } from "@interfaces/invoice"
import { IconButton } from "@ui/controls"
import { Spinner, Text } from "@ui/display"
import { DownloadIcon, TuneIcon } from "@ui/display/icons"
import { EditInvoiceForm } from "@ui/forms"
import { Card, Modal } from "@ui/layout"
import useInvoiceNumber from "@utils/useInvoiceNumber"
import useInvoiceTotal from "@utils/useInvoiceTotal"
import { format } from "date-fns"
import download from "downloadjs"
import { memo, useState } from "react"

interface InvoiceListProps {
  data: Invoice[]
  loading: boolean
  onUpdate?: () => void
}

const InvoiceList = ({ data, loading, onUpdate }: InvoiceListProps) => {
  const [editModalState, setEditModalState] = useState<boolean>(false)
  const [editInvoiceState, setEditInvoiceState] = useState<Invoice>(null)

  const downloadInvoice = async (i: Invoice) => {
    const res = await fetch("/api/invoices/download", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: i.id }),
    })
    const blob = await res.blob()
    download(blob, `${format(new Date(i.date), "yyyy-MM-dd")}.pdf`)
  }

  const editInvoice = (i: Invoice) => {
    setEditInvoiceState(i)
    setEditModalState(true)
  }

  return (
    <>
      <style jsx>{`
        .invoice {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          padding: 1rem;
          border-bottom: 1px solid var(--theme-colors-border);
        }

        .invoice:last-child {
          border: none;
        }

        .invoice > div {
          margin-left: auto;
          display: flex;
          align-items: center;
          column-gap: 1rem;
        }

        .actions {
          display: flex;
          column-gap: 0.5rem;
        }

        .loading {
          width: 4rem;
          margin: 4rem auto;
        }

        .info {
          height: 2rem;
          border-left: 1px solid var(--theme-colors-border);
          border-right: 1px solid var(--theme-colors-border);
          padding: 0 1rem;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          min-width: 8rem;
        }

        .info i {
          display: none;
        }

        @media (max-width: ${BREAKPOINTS.md}px) {
          .invoice {
            flex-direction: column;
            row-gap: 0.5rem;
          }

          .info :global(span) {
            display: none !important;
          }

          .info {
            min-width: unset;
          }

          .info > :global(*) {
            display: none !important;
          }

          .info i {
            display: block !important;
          }
        }
      `}</style>
      <Modal show={editModalState} setShow={setEditModalState} title="Edit Invoice">
        {editInvoiceState && (
          <EditInvoiceForm
            key={editInvoiceState.id}
            onSuccess={() => {
              setEditModalState(false)
              onUpdate()
            }}
            initialValues={{
              id: editInvoiceState.id,
              invoice_num: editInvoiceState.invoice_num,
              recipient: editInvoiceState.recipient,
              recipient_info: editInvoiceState.recipient_info,
              entries: editInvoiceState.entries,
              date: format(new Date(editInvoiceState.date), "yyyy-MM-dd"),
            }}
          />
        )}
      </Modal>
      <Card padding={0}>
        {!loading && data ? (
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
                <Text size="sm" style={{ opacity: 0.5 }}>
                  {useInvoiceTotal(i)}
                </Text>
                <div className="info">
                  <Text style={{ whiteSpace: "nowrap" }}>
                    {format(new Date(i.date), "do, ")}
                    <span
                      style={{
                        display: "inline-block",
                        maxWidth: "3rem",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        verticalAlign: "bottom",
                      }}>
                      {format(new Date(i.date), "LLLL")}
                    </span>
                    {format(new Date(i.date), " yyyy")}
                  </Text>
                  <i>
                    <Text>{format(new Date(i.date), "dd/MM/yyyy")}</Text>
                  </i>
                </div>
                <div className="actions">
                  <IconButton onClick={() => editInvoice(i)}>
                    <TuneIcon />
                  </IconButton>
                  <IconButton onClick={() => downloadInvoice(i)}>
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
