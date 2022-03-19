import MENU_ITEMS from "@constants/navigation"
import { memo } from "react"
import Menu from "./Menu"

const Dashboard = ({ children }) => {
  return (
    <>
      <style global jsx>{`
        :root {
          --theme-colors-background: rgb(22, 22, 22);
          --theme-colors-menu: rgb(37, 37, 37);
          --theme-colors-border: rgb(54, 54, 54);
          --theme-colors-text: rgb(255, 255, 255);
          color-scheme: dark;
          font-size: 16px;
        }

        html,
        body {
          width: 100%;
          max-width: 100%;
          height: 100%;
          margin: 0;
          padding: 0;
          overflow-x: hidden;
          background-color: var(--theme-colors-background);
          font-family: "Roboto", sans-serif;
        }

        .content {
          width: auto;
          height: 100%;
          margin: 2rem;
          margin-left: 7rem;
          overflow: hidden;
        }
      `}</style>

      <div className="container">
        <Menu data={MENU_ITEMS} />
        <div className="content">{children}</div>
      </div>
    </>
  )
}

export default memo(Dashboard)
