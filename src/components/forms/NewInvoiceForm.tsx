import InvoiceTasks from "@ui/blocks/InvoiceTasks"
import { Button, TextField } from "@ui/controls"
import { ErrorMessage } from "@ui/display"
import useFetch from "@utils/useFetch"
import { useFormik } from "formik"
import { memo } from "react"

interface NewInvoiceFormProps {
  onSuccess: () => void
}

const NewInvoiceForm = ({ onSuccess }: NewInvoiceFormProps) => {
  const { loading, error, callback } = useFetch("/api/invoices/new", { callbackOnly: true })

  const formik = useFormik({
    initialValues: {
      invoice_num: null,
      date: null,
      recipient: null,
      recipient_info: null,
      entries: null,
    },
    onSubmit: async (values) => {
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
        <TextField
          name="invoice_num"
          type="number"
          placeholder="Invoice #"
          maxWidth={15}
          onChange={formik.handleChange}
        />
        <TextField
          name="date"
          type="date"
          placeholder="Date"
          defaultValue="today"
          maxWidth={15}
          onChange={formik.handleChange}
        />
        <TextField
          name="recipient"
          placeholder="Recipient"
          maxWidth={20}
          onChange={formik.handleChange}
        />
        <TextField
          name="recipient_info"
          placeholder="Recipient Address"
          maxWidth={25}
          onChange={formik.handleChange}
        />
        <InvoiceTasks onChange={formik.setFieldValue} />
        <div>
          <ErrorMessage>{error}</ErrorMessage>
          <Button loading={loading} type="submit">
            Create
          </Button>
        </div>
      </form>
    </>
  )
}

export default memo(NewInvoiceForm)
