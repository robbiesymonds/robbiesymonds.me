import { SavingsIcon } from "@ui/display/icons"
import { MemoExoticComponent } from "react"

export interface MenuItem {
  Icon: MemoExoticComponent<() => JSX.Element>
  href: string
  alt: string
}

const MENU_ITEMS: MenuItem[] = [
  {
    Icon: SavingsIcon,
    href: "/dashboard/invoices",
    alt: "Invoices",
  },
]

export default MENU_ITEMS
