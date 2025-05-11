import { FC } from 'react'
import { reactify } from '@shared/lib/ymaps'
import { MapMarker } from '@widgets/map-marker'
import MapPin from './map-pin.svg?react'
import styles from './SearchMap.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment } from '@fortawesome/free-solid-svg-icons'
import { MapMode, useMapStore } from '../../model/store'
import { MapView } from '@widgets/map-view'
import { useLoadChats } from '@entities/chat/model/hooks/use-load-chats'
import { useChatsStore } from '@entities/chat/model/store/chatsStore'
import { useAddChatStore } from '@features/add-chat/model/use-add-chat'

export type MainMapProps = {
  width?: string
  height?: string
}

export const SearchMap: FC<MainMapProps> = () => {
  const store = useMapStore()

  const chatsStore = useChatsStore()
  const mapStore = useMapStore()
  const { setFormData, formData } = useAddChatStore()

  useLoadChats()

  const renderChatsMarkers = () => {
    if (store.mode === MapMode.Add) {
      return null
    }

    return chatsStore.chats.map((chat) => (
      <div key={chat.id} onClick={() => mapStore.setSelectedChat(chat)}>
        <MapMarker
          markerProps={{
            coordinates: reactify.useDefault([chat.longitude, chat.latitude]),
          }}
          content={<FontAwesomeIcon size="sm" icon={faComment} color="grey" />}
        />
      </div>
    ))
  }

  return (
    <div
      className={styles.container}
      style={{ width: '100%', height: '100%', borderRadius: '8px', overflow: 'hidden' }}
    >
      <MapView location={store.location}>
        {renderChatsMarkers()}
        {mapStore.coordinatesSelecting && (
          <MapMarker
            markerProps={{
              coordinates: reactify.useDefault([37.588144, 55.753842]),
              draggable: true,
              onDragEnd: (coordinates) =>
                setFormData({
                  ...formData,
                  coordinates: [Number(coordinates[0].toFixed(6)), Number(coordinates[1].toFixed(6))],
                }),
            }}
            raw
            content={<MapPin className={styles.mapPin} />}
          />
        )}
      </MapView>
    </div>
  )
}
