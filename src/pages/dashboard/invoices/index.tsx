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

  const { data, error } = useFetch<Array<Invoice>>("/api/invoices/get")

  const { yearTotal, lastInvoice } = useMemo(() => getStatistics(data), [data])

  return (
    <>
      <Modal show={newInvoiceModal} setShow={setNewInvoiceModal} title="New Invoice">
        <NewInvoiceForm onSuccess={() => setNewInvoiceModal(false)} />
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
                { type: "action", title: "Auto-magic", value: <Button>Generate</Button> },
              ]}
            />
            <InvoiceList data={data} />
          </>
        ) : (
          <ErrorMessage major>Something went wrong!</ErrorMessage>
        )}
      </Container>
    </>
  )
}

Invoices.Title = "Invoices"
Invoices.Layout = Dashboard
export default Invoices
