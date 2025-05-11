import { Modal } from '@telegram-apps/telegram-ui'
import { ModalHeader } from '@telegram-apps/telegram-ui/dist/components/Overlays/Modal/components/ModalHeader/ModalHeader'
import { FC } from 'react'
import { AddChatForm } from '../add-chat-form/AddChatForm'

export type AddChatModalProps = {
  isOpen?: boolean
  onOpenChange: (opened: boolean) => void
}

export const AddChatModal: FC<AddChatModalProps> = ({ isOpen, onOpenChange }) => {
  return (
    <Modal open={isOpen} header={<ModalHeader>Only iOS header</ModalHeader>} onOpenChange={onOpenChange}>
      <AddChatForm />
    </Modal>
  )
}
