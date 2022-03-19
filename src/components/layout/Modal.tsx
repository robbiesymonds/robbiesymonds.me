import { IconButton } from "@ui/controls"
import { Heading } from "@ui/display"
import { CloseIcon } from "@ui/display/icons"
import React, { memo } from "react"
import Backdrop from "./Backdrop"
import Card from "./Card"

interface ModalProps {
  children: React.ReactNode
  title?: string
  show: boolean
  setShow: React.Dispatch<React.SetStateAction<boolean>>
}

const Modal = ({ children, title, show, setShow }: ModalProps) => {
  return (
    <>
      <style jsx>{`
        .modal {
          display: flex;
          align-items: flex-start;
          justify-content: center;
          max-width: 50rem;
          margin: 4rem auto;
          width: 90%;
        }

        .header {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
      `}</style>
      <Backdrop show={show}>
        <div className="modal">
          <Card>
            <div className="header">
              <Heading size={1}>{title}</Heading>
              <IconButton outline onClick={() => setShow(false)}>
                <CloseIcon />
              </IconButton>
            </div>
            {children}
          </Card>
        </div>
      </Backdrop>
    </>
  )
}

export default memo(Modal)
