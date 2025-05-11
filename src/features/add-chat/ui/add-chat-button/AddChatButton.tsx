import { Button } from '@telegram-apps/telegram-ui'
import { AddChatModal } from '../add-chat-modal/AddChatModal'
import { useAddChatStore } from '@features/add-chat/model/use-add-chat'
import { MapMode, useMapStore } from '@features/search-map/model/store'

export const AddChatButton = () => {
  const { isModalOpened, setModalOpened } = useAddChatStore()
  const { setCoordinatesSelecting, coordinatesSelecting, setMapMode } = useMapStore()

  const handleAddChatButtonClick = (opened: boolean) => {
    setModalOpened(opened)
  }

  const handleConfirmCoordinates = () => {
    setModalOpened(true)
    setCoordinatesSelecting(false)
    setMapMode(MapMode.Show)
  }

  return (
    <>
      {coordinatesSelecting ? (
        <Button mode="filled" stretched size="s" onClick={handleConfirmCoordinates}>
          Подтвердить
        </Button>
      ) : (
        <Button mode="filled" stretched size="s" onClick={() => handleAddChatButtonClick(true)}>
          Добавить чат
        </Button>
      )}
      <AddChatModal isOpen={isModalOpened} onOpenChange={handleAddChatButtonClick} />
    </>
  )
}
