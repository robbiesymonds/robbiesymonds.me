import BREAKPOINTS from "@constants/breakpoints"
import { Invoice } from "@interfaces/invoice"
import { IconButton } from "@ui/controls"
import { Spinner, Text } from "@ui/display"
import { DownloadIcon, TuneIcon } from "@ui/display/icons"
import { EditInvoiceForm } from "@ui/forms"
import { Card, Modal } from "@ui/layout"
import useFetch from "@utils/useFetch"
import useInvoiceNumber from "@utils/useInvoiceNumber"
import { format } from "date-fns"
import { memo, useState } from "react"

interface InvoiceListProps {
  data: Invoice[]
  loading: boolean
  onUpdate?: () => void
}

const InvoiceList = ({ data, loading, onUpdate }: InvoiceListProps) => {
  const [editModalState, setEditModalState] = useState<boolean>(false)
  const [editInvoiceState, setEditInvoiceState] = useState<Invoice>(null)
  const downloadQuery = useFetch<string>(`/api/invoices/download`, { callbackOnly: true })

  const downloadInvoice = async (id: string) => {
    const data = await downloadQuery.callback({ body: JSON.stringify({ id }) })
    console.log(data)
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
                <Text>{format(new Date(i.date), "do, LLLL yyyy")}</Text>
                <div className="actions">
                  <IconButton onClick={() => editInvoice(i)}>
                    <TuneIcon />
                  </IconButton>
                  <IconButton loading={downloadQuery.loading} onClick={() => downloadInvoice(i.id)}>
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
