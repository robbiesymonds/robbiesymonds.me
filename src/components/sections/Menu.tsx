import { MenuItem } from "@constants/navigation"
import { Logo } from "@ui/display"
import { LogoutIcon } from "@ui/display/icons"
import useAuth from "@utils/useAuth"
import Link from "next/link"
import { memo } from "react"

interface MenuProps {
  data: MenuItem[]
}

const Menu = ({ data }: MenuProps) => {
  const { isAuth } = useAuth()
  return (
    <>
      <style jsx>{`
        .menu {
          position: fixed;
          top: 0;
          width: 5rem;
          background-color: var(--theme-colors-menu);
          height: 100vh;
          border-right: 1px solid var(--theme-colors-border);
          flex-shrink: 0;
          flex-grow: 0;
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
          color: var(--theme-colors-text);
          text-decoration: none;
        }

        .item:hover {
          opacity: 0.6;
        }

        .item :global(svg) {
          width: 30%;
          height: 30%;
        }

        .logout {
          opacity: 0.75;
          color: #eee;
          position: absolute;
          bottom: 0;
          left: 0;
        }
      `}</style>

      <div className="menu">
        <div className="logo">
          <Logo />
        </div>

        {isAuth && (
          <>
            {data &&
              data.map(({ Icon, href }, i) => (
                <Link key={href} href={href}>
                  <a>
                    <div className="item">
                      <Icon />
                    </div>
                  </a>
                </Link>
              ))}

            <Link href="/api/auth/logout">
              <a>
                <div className="logout item">
                  <LogoutIcon />
                </div>
              </a>
            </Link>
          </>
        )}
      </div>
    </>
  )
}

export default memo(Menu)
