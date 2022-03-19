import { memo } from "react"

interface BackdropProps {
  children: React.ReactNode
  show: boolean
}

const Backdrop = ({ children, show }: BackdropProps) => {
  return (
    <>
      <style jsx>{`
        div {
          position: fixed;
          overscroll-behavior: none;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: #000000cc;
          opacity: ${show ? 1 : 0};
          overflow-y: auto;
          overflow-x: hidden;
          text-align: center;
          transition: opacity 0.1s;
          box-sizing: border-box;
          will-change: opacity;
          transform: translateZ(0);
          z-index: 99;
          pointer-events: ${show ? "all" : "none"};
        }
      `}</style>
      <div>
        <span>{children}</span>
      </div>
    </>
  )
}

export default memo(Backdrop)
