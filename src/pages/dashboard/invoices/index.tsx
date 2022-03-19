import { InvoiceList, Statistics } from "@ui/blocks"
import { Button, IconButton } from "@ui/controls"
import { Heading } from "@ui/display"
import { AddIcon } from "@ui/display/icons"
import { NewInvoiceForm } from "@ui/forms"
import { Container, Modal } from "@ui/layout"
import { Dashboard } from "@ui/sections"
import { useState } from "react"

function Invoices() {
  const [newInvoiceModal, setNewInvoiceModal] = useState<boolean>(false)

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
        <Statistics
          data={[
            { title: "This Year", value: "$34,640" },
            { title: "Last Invoice", value: "14d ago" },
            { type: "action", title: "Auto-magic", value: <Button>Generate</Button> },
          ]}
        />
        <InvoiceList data={[]} />
      </Container>
    </>
  )
}

Invoices.Title = "Invoices"
Invoices.Layout = Dashboard
export default Invoices
