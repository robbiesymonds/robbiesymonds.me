import { MenuItem } from "@constants/navigation"
import React from "react"
import Link from "next/link"
import { Logo } from "@ui/display"
import { LogoutIcon } from "@ui/display/icons"

interface MenuProps {
  data: MenuItem[]
}

const Menu = ({ data }: MenuProps) => {
  return (
    <>
      <style jsx>{`
        .menu {
          position: sticky;
          top: 0;
          width: 5rem;
          background-color: var(--theme-colors-menu);
          height: 100vh;
          border-right: 1px solid var(--theme-colors-border);
          flex-shrink: 0;
          flex-grow: 0;
          position: relative;
        }

        .logo {
          width: 100%;
          border-bottom: 1px solid var(--theme-colors-border);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem 0;
        }

        .logo :global(svg) {
          width: 50%;
          height: 50%;
        }

        .item {
          width: 100%;
          height: 5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: white;
          text-decoration: none;
        }

        .item:hover {
          opacity: 0.6;
        }

        .item :global(svg) {
          width: 25%;
          height: 25%;
        }

        .logout {
          position: absolute;
          bottom: 0;
          left: 0;
        }
      `}</style>

      <div className="menu">
        <div className="logo">
          <Logo />
        </div>

        {data &&
          data.map(({ icon, href }, i) => (
            <div key={i} className="item">
              <Link href={href}>{icon}</Link>
            </div>
          ))}

        <Link href="/api/auth/logout">
          <a>
            <div className="logout item">
              <LogoutIcon />
            </div>
          </a>
        </Link>
      </div>
    </>
  )
}

export default React.memo(Menu)
