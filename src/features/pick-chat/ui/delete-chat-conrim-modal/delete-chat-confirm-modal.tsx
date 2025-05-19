import { Button, Modal, Placeholder } from '@telegram-apps/telegram-ui'
import { FC } from 'react'
import styles from './delete-chat-confirm-modal.module.css'
import { useDeleteChatMutation } from '@entities/chat/api/mutations'

export type DeleteChatConfirmModalProps = {
  isOpen?: boolean
  onOpenChange: (opened: boolean) => void
  chatId: string
  onDeleteSuccess: () => void
}

export const DeleteChatConfirmModal: FC<DeleteChatConfirmModalProps> = ({
  isOpen,
  onOpenChange,
  chatId,
  onDeleteSuccess,
}) => {
  const { mutate: deleteChat, isPending } = useDeleteChatMutation({
    onSuccess: () => {
      onOpenChange(false)
      onDeleteSuccess()
    },
  })

  const handleDeleteChat = () => {
    deleteChat(chatId)
  }

  return (
    <Modal open={isOpen} onOpenChange={onOpenChange}>
      <div className={styles.container}>
        <Placeholder header="Вы действительно хотите удалить чат с карты?">
          {/* <img
          alt="Telegram sticker"
          src="https://xelene.me/telegram.gif"
          style={{
            display: 'block',
            height: '144px',
            width: '144px',
          }}
        /> */}
        </Placeholder>
        <div className={styles.buttons}>
          <Button className={styles.deleteButton} stretched loading={isPending} onClick={handleDeleteChat}>
            Да
          </Button>
          <Button stretched onClick={() => onOpenChange(false)}>
            Отмена
          </Button>
        </div>
      </div>
    </Modal>
  )
}
