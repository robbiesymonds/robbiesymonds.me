import useProtocol from "@utils/useProtocol"
import { NextApiRequest, NextApiResponse } from "next"
import path from "path"
import fs from "fs/promises"
import {
  grayscale,
  layoutMultilineText,
  PDFDocument,
  PDFFont,
  PDFTextField,
  rgb,
  StandardFonts,
  TextAlignment,
} from "pdf-lib"
import { format } from "date-fns"
import fontkit from "@pdf-lib/fontkit"
import { RESPONSES } from "@interfaces/api"
import { Invoice, InvoiceTask } from "@interfaces/invoice"
import useQuery from "@utils/useQuery"
import useInvoiceNumber from "@utils/useInvoiceNumber"
import { ABN, ACC_NUM, BSB } from "@constants/invoices"
import useInvoiceTotal from "@utils/useInvoiceTotal"

type Field = {
  field: PDFTextField
  font?: PDFFont
  value: string
}

async function downloadInvoice(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.body
  if (!id) return res.status(400).json({ success: false, error: RESPONSES.SOMETHING_WENT_WRONG })

  const data = await useQuery<Invoice[]>("SELECT * FROM `invoices` WHERE id = ?", [id])
  if (!(data && data.length > 0))
    return res.status(400).json({ success: false, error: RESPONSES.SOMETHING_WENT_WRONG })
  const invoice = data[0]

  const template = await fs.readFile(path.resolve("./public", "assets/files/invoice.pdf"))
  const productSans = await fs.readFile(path.resolve("./public", "assets/fonts/ProductSans.ttf"))
  const montserratBold = await fs.readFile(
    path.resolve("./public", "assets/fonts/MontserratBold.ttf")
  )

  const pdf = await PDFDocument.load(template)
  const fileName = `${format(new Date(invoice.date), "yyyy-MM-dd")}.pdf`
  pdf.setTitle(fileName, { showInWindowTitleBar: true })
  pdf.registerFontkit(fontkit)

  const productSansFont = await pdf.embedFont(productSans)
  const montserratBoldFont = await pdf.embedFont(montserratBold)
  const arialFont = await pdf.embedFont(StandardFonts.Helvetica)

  const form = pdf.getForm()

  const fields: Array<Field> = [
    {
      field: form.getTextField("RECIPIENT"),
      font: productSansFont,
      value: invoice.recipient,
    },
    {
      field: form.getTextField("RECIPIENT_INFO"),
      value: invoice.recipient_info,
    },
    {
      field: form.getTextField("INVOICE_NUM"),
      font: productSansFont,
      value: `Invoice ${useInvoiceNumber(invoice.invoice_num)}`,
    },
    {
      field: form.getTextField("ABN_NUMBER"),
      font: productSansFont,
      value: `ABN: ${ABN}`,
    },
    {
      field: form.getTextField("DATE"),
      font: productSansFont,
      value: format(new Date(invoice.date), "do MMMM, yyyy"),
    },
    {
      field: form.getTextField("TOTAL_1"),
      font: montserratBoldFont,
      value: useInvoiceTotal(invoice, { disableCommas: true }),
    },
    {
      field: form.getTextField("TOTAL_2"),
      font: montserratBoldFont,
      value: useInvoiceTotal(invoice, { disableCommas: true }),
    },
    {
      field: form.getTextField("SQUARE_FEE"),
      font: montserratBoldFont,
      value: "$0.00",
    },
    {
      field: form.getTextField("TOTAL_3"),
      font: montserratBoldFont,
      value: useInvoiceTotal(invoice, { disableCommas: true }),
    },
    {
      field: form.getTextField("BSB"),
      font: productSansFont,
      value: `BSB: ${BSB}`,
    },
    {
      field: form.getTextField("ACCOUNT_NUM"),
      font: productSansFont,
      value: `Account Number: ${ACC_NUM}`,
    },
  ]

  fields.forEach(({ field, value, font }) => {
    field.setText(value)
    if (font) field.updateAppearances(font)
  })

  const p = pdf.getPage(0)

  const drawTask = (e: InvoiceTask, i: number) => {
    const offsetY = 465 - 55 * i
    p.drawRectangle({ x: 0, y: offsetY, width: 600, height: 1, color: grayscale(0.94) })

    const taskDescription = layoutMultilineText(e.description, {
      font: arialFont,
      fontSize: 6.5,
      bounds: { width: 150, height: 0, x: 56, y: offsetY + 32 },
      alignment: TextAlignment.Left,
    })

    let oneLineOffset = 0
    if (taskDescription.lines.length == 1) {
      oneLineOffset = -4
    }

    p.drawText(e.title, {
      x: 56,
      y: offsetY + 34 + oneLineOffset,
      font: productSansFont,
      size: 10,
      color: rgb(0, 0, 0),
    })

    for (let j = 0; j < taskDescription.lines.length; j++) {
      p.drawText(taskDescription.lines[j].text, {
        font: arialFont,
        size: taskDescription.fontSize,
        x: taskDescription.lines[j].x,
        y: taskDescription.lines[j].y + oneLineOffset,
        color: grayscale(0.6),
      })
    }
    const rateWidth = arialFont.widthOfTextAtSize(e.rate.toString(), 9)
    p.drawText(e.rate.toString(), { x: 318 + (65 / 2 - rateWidth / 2), y: offsetY + 26, size: 9 })

    const hoursWidth = arialFont.widthOfTextAtSize(e.hours.toString(), 9)
    p.drawText(e.hours.toString(), { x: 385 + (70 / 2 - hoursWidth / 2), y: offsetY + 26, size: 9 })

    const lineTotalWidth = arialFont.widthOfTextAtSize(`${(e.hours * e.rate).toFixed(2)}`, 9)
    p.drawText(`${(e.hours * e.rate).toFixed(2)}`, {
      x: 457 + (80 - lineTotalWidth),
      y: offsetY + 26,
      size: 9,
    })
  }

  invoice.entries.forEach((e, i) => drawTask(e, i))

  form.flatten()
  const bytes = await pdf.save()

  res.setHeader("Content-Type", "application/pdf")
  return res.status(200).send(Buffer.from(bytes))
}

export default useProtocol({ POST: downloadInvoice })
