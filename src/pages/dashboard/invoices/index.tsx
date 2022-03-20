import { RESPONSES } from "@interfaces/api"
import { Invoice } from "@interfaces/invoice"
import { InvoiceList, Statistics } from "@ui/blocks"
import { Button, IconButton } from "@ui/controls"
import { ErrorMessage, Heading } from "@ui/display"
import { AddIcon } from "@ui/display/icons"
import { NewInvoiceForm } from "@ui/forms"
import { Container, Modal } from "@ui/layout"
import { Dashboard } from "@ui/sections"
import useCurrency from "@utils/useCurrency"
import useDateDifference from "@utils/useDateDifference"
import useFetch from "@utils/useFetch"
import { format } from "date-fns"
import { useMemo, useState } from "react"

const getStatistics = (data: Invoice[]) => {
  if (!data)
    return {
      yearTotal: null,
      lastInvoice: null,
    }

  let yearTotal: number = 0
  let lastInvoice: Date = new Date(-8640000000000000)

  data?.forEach((i) => {
    const invDate = new Date(i.date)
    if (invDate >= lastInvoice) lastInvoice = invDate
    const currentYear = new Date().getFullYear()
    if (invDate.getFullYear() == currentYear)
      i.entries.forEach(({ hours, rate }) => (yearTotal += hours * rate))
  })

  return {
    yearTotal: useCurrency(yearTotal),
    lastInvoice: useDateDifference(lastInvoice),
  }
}

function Invoices() {
  const [newInvoiceModal, setNewInvoiceModal] = useState<boolean>(false)
  const [magicInvoiceModal, setMagicInvoiceModal] = useState<boolean>(false)

  const { data, loading, error, callback } = useFetch<Array<Invoice>>("/api/invoices/get")
  const { yearTotal, lastInvoice } = useMemo(() => getStatistics(data), [data])

  return (
    <>
      <Modal show={newInvoiceModal} setShow={setNewInvoiceModal} title="New Invoice">
        <NewInvoiceForm
          onSuccess={() => {
            setNewInvoiceModal(false)
            callback()
          }}
        />
      </Modal>
      <Modal show={magicInvoiceModal} setShow={setMagicInvoiceModal} title="Smart Invoice">
        {data && (
          <NewInvoiceForm
            initialValues={{
              invoice_num: data[0].invoice_num + 1,
              recipient: data[0].recipient,
              recipient_info: data[0].recipient_info,
              entries: data[0].entries,
              date: format(new Date(), "yyyy-MM-dd"),
            }}
            onSuccess={() => setMagicInvoiceModal(false)}
          />
        )}
      </Modal>
      <Container maxWidth={80} align="center">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}>
          <Heading size={1}>Invoices</Heading>
          <IconButton outline onClick={() => setNewInvoiceModal(true)}>
            <AddIcon />
          </IconButton>
        </div>

        {!error ? (
          <>
            <Statistics
              data={[
                { title: "This Year", value: yearTotal },
                { title: "Last Invoice", value: lastInvoice },
                {
                  type: "action",
                  title: "Auto-magic",
                  value: <Button onClick={() => setMagicInvoiceModal(true)}>Generate</Button>,
                },
              ]}
            />
            <InvoiceList loading={loading} data={data} onUpdate={() => callback()} />
          </>
        ) : (
          <ErrorMessage major>{RESPONSES.SOMETHING_WENT_WRONG}</ErrorMessage>
        )}
      </Container>
    </>
  )
}

Invoices.Title = "Invoices"
Invoices.Layout = Dashboard
export default Invoices
