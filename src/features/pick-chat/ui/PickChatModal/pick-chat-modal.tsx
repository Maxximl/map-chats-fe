import { useMapStore } from '@features/search-map/model/store'
import { Button, Card, Link, Modal } from '@telegram-apps/telegram-ui'
import { CardCell } from '@telegram-apps/telegram-ui/dist/components/Blocks/Card/components/CardCell/CardCell'
import { FC, useState } from 'react'
import styles from './pick-chat-modal.module.css'
import { DeleteChatConfirmModal } from '../delete-chat-conrim-modal/delete-chat-confirm-modal'
import { useChats } from '@entities/chat/api/queries'
import { useAccess } from '@features/feature-access/lib/use-access'
import { CardChip } from '@telegram-apps/telegram-ui/dist/components/Blocks/Card/components/CardChip/CardChip'

export const ChatInfoModal: FC = () => {
  const { refetch } = useChats()

  const { selectedChat, setSelectedChat } = useMapStore()
  const [chatDeleteConfirmationOpened, setChatDeleteConfirmationOpened] = useState(false)

  const canEdit = useAccess(selectedChat)

  const onOpenChange = (opened: boolean) => {
    if (!opened) {
      setSelectedChat(null)
    }
  }

  const handleCloseCard = () => {
    setSelectedChat(null)
  }
  const handleDeleteChat = () => {
    setChatDeleteConfirmationOpened(true)
  }

  const handleCloseChatDeleteConfirmation = (isOpened: boolean) => {
    if (!isOpened) {
      setChatDeleteConfirmationOpened(false)
    }
  }

  const handleDeleteSuccess = () => {
    refetch()
    setChatDeleteConfirmationOpened(false)
    setSelectedChat(null)
  }

  return (
    <Modal open={Boolean(selectedChat)} title="куку" onOpenChange={onOpenChange}>
      <Card className={styles.cardContainer}>
        <>
          <CardChip readOnly>Новый чат</CardChip>
          <img
            alt="Dog"
            src={selectedChat?.imageUrl}
            style={{
              display: 'block',
              height: '100px',
              objectFit: 'cover',
              width: '100%',
            }}
          />
          <CardCell readOnly subhead="Название чата">
            {selectedChat?.title}
          </CardCell>
          <CardCell multiline readOnly subhead="Описание">
            {selectedChat?.description}
          </CardCell>
          <CardCell readOnly subhead="Ссылка-приглашение">
            <Link target="_blank" href={selectedChat?.inviteLink}>
              {selectedChat?.inviteLink}
            </Link>
          </CardCell>
        </>
        <div className={styles.buttons}>
          <Button stretched onClick={handleCloseCard}>
            Закрыть
          </Button>
          {canEdit && (
            <Button className={styles.deleteButton} stretched onClick={handleDeleteChat}>
              Удалить
            </Button>
          )}
        </div>
      </Card>
      <DeleteChatConfirmModal
        isOpen={chatDeleteConfirmationOpened}
        onOpenChange={handleCloseChatDeleteConfirmation}
        chatId={selectedChat?.id || ''}
        onDeleteSuccess={handleDeleteSuccess}
      />
    </Modal>
  )
}
