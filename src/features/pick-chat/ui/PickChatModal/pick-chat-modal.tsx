import { useMapStore } from '@features/search-map/model/store'
import { Button, Card, Link, Modal } from '@telegram-apps/telegram-ui'
import { CardCell } from '@telegram-apps/telegram-ui/dist/components/Blocks/Card/components/CardCell/CardCell'
import { ModalHeader } from '@telegram-apps/telegram-ui/dist/components/Overlays/Modal/components/ModalHeader/ModalHeader'
import { FC } from 'react'
import styles from './pick-chat-modal.module.css'

export const ChatInfoModal: FC = () => {
  const { selectedChat, setSelectedChat } = useMapStore()

  const onOpenChange = (opened: boolean) => {
    if (!opened) {
      setSelectedChat(null)
    }
  }

  const handleCloseCard = () => {
    setSelectedChat(null)
  }

  return (
    <Modal
      open={Boolean(selectedChat)}
      title="куку"
      header={<ModalHeader>Only iOS header</ModalHeader>}
      onOpenChange={onOpenChange}
    >
      <Card className={styles.cardContainer}>
        <>
          {/* <CardChip readOnly>Популярный чат</CardChip> */}
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
        <Button stretched onClick={handleCloseCard}>
          Закрыть
        </Button>
      </Card>
    </Modal>
  )
}
