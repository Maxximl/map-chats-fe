import { AddChatButton } from "@features/add-chat"
import { ChatInfoModal } from "@features/pick-chat"
import { SearchMap } from "@features/search-map"
import styles from './map-with-chats.module.css'

export const MapWithChats = () => {
  return (
    <>
      <SearchMap />
      <ChatInfoModal />
      <div className={styles.addChatButton}>
        <AddChatButton />
      </div>
    </>
  )
}
