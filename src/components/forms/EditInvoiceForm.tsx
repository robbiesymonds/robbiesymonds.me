import { InvoiceTask } from "@interfaces/invoice"
import InvoiceTasks from "@ui/blocks/InvoiceTasks"
import { Button, TextField } from "@ui/controls"
import { ErrorMessage } from "@ui/display"
import useFetch from "@utils/useFetch"
import { useFormik } from "formik"
import { memo } from "react"

interface EditInvoiceFormProps {
  onSuccess: () => void
  initialValues: {
    id: string
    invoice_num: number
    recipient: string
    recipient_info: string
    entries: Array<InvoiceTask>
    date: string
  }
}

const EditInvoiceForm = ({ onSuccess, initialValues }: EditInvoiceFormProps) => {
  const { loading, error, callback } = useFetch("/api/invoices/update", { callbackOnly: true })

  const formik = useFormik({
    initialValues,
    onSubmit: async (values) => {
      console.log(values)
      const data = await callback({ body: JSON.stringify(values) })
      if (data.success) onSuccess()
    },
  })

  return (
    <>
      <style jsx>{`
        form {
          display: flex;
          margin-top: 1rem;
          justify-content: flex-start;
          align-items: flex-start;
          flex-direction: column;
          width: 100%;
          row-gap: 1rem;
        }

        div {
          width: 100%;
          display: flex;
          flex-direction: row;
          justify-content: flex-end;
        }
      `}</style>
      <form onSubmit={formik.handleSubmit}>
        <input hidden name="id" value={initialValues.id} />
        <TextField
          name="invoice_num"
          type="number"
          placeholder="Invoice #"
          maxWidth={15}
          onChange={formik.handleChange}
          defaultValue={initialValues.invoice_num}
        />
        <TextField
          name="date"
          type="date"
          placeholder="Date"
          maxWidth={15}
          onChange={formik.handleChange}
          defaultValue={initialValues.date}
        />
        <TextField
          name="recipient"
          placeholder="Recipient"
          maxWidth={20}
          onChange={formik.handleChange}
          defaultValue={initialValues.recipient}
        />
        <TextField
          name="recipient_info"
          placeholder="Recipient Address"
          maxWidth={25}
          onChange={formik.handleChange}
          defaultValue={initialValues.recipient_info}
        />
        <InvoiceTasks onChange={formik.setFieldValue} defaultValue={initialValues.entries} />
        <div>
          <ErrorMessage>{error}</ErrorMessage>
          <Button loading={loading} type="submit">
            Save
          </Button>
        </div>
      </form>
    </>
  )
}

export default memo(EditInvoiceForm)
