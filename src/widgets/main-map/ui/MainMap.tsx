import { FC, useEffect, useState } from 'react'
import { reactify, YMap, YMapDefaultFeaturesLayer, YMapDefaultSchemeLayer } from '@shared/lib/ymaps'
import { MapMarker } from '@entities/map-marker'
import MapPin from './map-pin.svg?react'
import styles from './MainMap.module.css'
import { Button, Caption, IconButton, Input, List, Modal } from '@telegram-apps/telegram-ui'
import { ModalHeader } from '@telegram-apps/telegram-ui/dist/components/Overlays/Modal/components/ModalHeader/ModalHeader'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocation, faComment } from '@fortawesome/free-solid-svg-icons'
import { useForm } from '@tanstack/react-form'
import { MapMode, useMapStore } from '../model/store'
import { useChats } from '@shared/api/ chats/queries'
import { useAddChatMutation } from '@shared/api/ chats/mutations'
import { z } from 'zod'
export type MainMapProps = {
  width?: string
  height?: string
}

export const MainMap: FC<MainMapProps> = () => {
  const store = useMapStore()

  const { data } = useChats()
  const { mutate, isPending } = useAddChatMutation({
    onSuccess: () => {
      form.reset()
    },
  })

  useEffect(() => {
    store.setChats(data || [])
  }, [data])

  const enhancedSchema = z.object({
    title: z
      .string()
      .trim()
      .min(1, 'Title is required')
      .max(100)
      .regex(/^[a-zA-Z0-9\s\-_]+$/, 'Invalid characters in title'),

    description: z.string().trim().max(500).min(1, 'Title is required'),
    coordinates: z
      .tuple([
        z
          .number()
          .gte(-180)
          .lte(180)
          .refine((val) => val.toFixed(6)), // 6 знаков после запятой
        z
          .number()
          .gte(-90)
          .lte(90)
          .refine((val) => val.toFixed(6)),
      ])
      .transform(([lon, lat]) => [Number(lon.toFixed(6)), Number(lat.toFixed(6))]),
  })

  const form = useForm({
    defaultValues: {
      title: '',
      description: '',
      coordinates: [0, 0],
    },
    validators: {
      onChange: enhancedSchema,
    },
    onSubmit: async ({ value }) => {
      console.log(value)
      mutate({
        userId: '',
        chatId: '-',
        title: value.title,
        description: value.description,
        longitude: value.coordinates[0],
        latitude: value.coordinates[1],
      })
    },
  })

  const [isSelectCoordinates, setIsSelectCoordinates] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleChangeCoordinates = () => {
    setIsSelectCoordinates(true)
  }

  const handleAddChatButtonClick = () => {
    setIsModalOpen(true)
    store.setMapMode(MapMode.Add)
  }

  const renderAddChatButton = () => {
    return (
      <Modal
        open={isModalOpen}
        header={<ModalHeader>Only iOS header</ModalHeader>}
        trigger={
          <div className={styles.addChatButton}>
            <Button mode="filled" stretched size="s" onClick={handleAddChatButtonClick}>
              Добавить чат
            </Button>
          </div>
        }
        onOpenChange={(opened) => {
          setIsModalOpen(opened)
        }}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault()
            e.stopPropagation()
            form.handleSubmit()
          }}
        >
          <List className={styles.formContainer}>
            <form.Field
              name="title"
              children={(field) => (
                <>
                  <Input
                    header="Название"
                    placeholder="Введите название чата"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    status={field.state.meta.errors.length && field.state.meta.isTouched ? 'error' : undefined}
                  />
                </>
              )}
            />
            <form.Field
              name="description"
              children={(field) => (
                <>
                  <Input
                    header="Описание"
                    placeholder="Введите описание чата"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    status={field.state.meta.errors.length && field.state.meta.isTouched ? 'error' : undefined}
                  />
                </>
              )}
            />

            <div className={styles.wrapper}>
              <Caption level="1" weight="3">
                Местоположение:
              </Caption>
              <form.Field
                name="coordinates"
                children={(field) => (
                  <div className={styles.coordinatesContainer} onClick={handleChangeCoordinates}>
                    <IconButton mode="bezeled" size="s">
                      <FontAwesomeIcon icon={faLocation} />
                    </IconButton>
                    {!field.state.value[0] || !field.state.value[1]
                      ? 'Нажмите, чтобы указать'
                      : `${field.state.value[0]} : ${field.state.value[1]}`}
                  </div>
                )}
              />
              <Button type="submit" mode="filled" stretched size="s" loading={isPending} disabled={isPending}>
                Сохранить
              </Button>
            </div>
          </List>
        </form>
      </Modal>
    )
  }

  const handleConfirmCoordinates = () => {
    setIsSelectCoordinates(false)
  }

  const renderChatsMarkers = () => {
    return store.chats.map((chat) => (
      <MapMarker
        key={chat.id}
        markerProps={{
          coordinates: reactify.useDefault([chat.longitude, chat.latitude]),
        }}
        content={<FontAwesomeIcon size="xl" icon={faComment} color="grey" />}
      />
    ))
  }

  return (
    <div
      className={styles.container}
      style={{ width: '100%', height: '100%', borderRadius: '8px', overflow: 'hidden' }}
    >
      <YMap location={reactify.useDefault(store.location)}>
        <YMapDefaultSchemeLayer />
        <YMapDefaultFeaturesLayer />
        {store.mode === MapMode.Show && renderChatsMarkers()}
        {isSelectCoordinates && (
          <MapMarker
            markerProps={{
              coordinates: reactify.useDefault([37.588144, 55.753842]),
              draggable: true,
              onDragEnd: (coordinates) =>
                form.setFieldValue('coordinates', [
                  Number(coordinates[0].toFixed(6)),
                  Number(coordinates[1].toFixed(6)),
                ]),
            }}
            content={<MapPin className={styles.mapPin} />}
          />
        )}
      </YMap>
      {!isSelectCoordinates && renderAddChatButton()}
      {isSelectCoordinates && (
        <div className={styles.addChatButton}>
          <Button mode="filled" stretched size="s" onClick={handleConfirmCoordinates}>
            Подтвердить
          </Button>
        </div>
      )}
    </div>
  )
}
