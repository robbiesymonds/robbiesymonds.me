import MENU_ITEMS from "@constants/navigation"
import React from "react"
import Menu from "./Menu"

const Dashboard = ({ children }) => {
  return (
    <>
      <style global jsx>{`
        :root {
          --theme-colors-background: rgb(22, 22, 22);
          --theme-colors-menu: rgb(37, 37, 37);
          --theme-colors-border: rgb(54, 54, 54);
          color-scheme: dark;
          font-size: 16px;
        }

        html,
        body {
          width: 100vw;
          max-width: 100vw;
          margin: 0;
          padding: 0;
          height: 100%;
          overflow-x: hidden;
          background-color: var(--theme-colors-background);
          font-family: "Open Sans";
        }

        div {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
        }

        .content {
          margin: 2rem;
          width: 100%;
        }
      `}</style>

      <div>
        <Menu data={MENU_ITEMS} />

        <div className="content">{children}</div>
      </div>
    </>
  )
}

export default React.memo(Dashboard)
