import { faLocation } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useForm } from '@tanstack/react-form'
import { Input, IconButton, Caption, Button } from '@telegram-apps/telegram-ui'
import { useCallback, useEffect } from 'react'
// import { useDropzone } from 'react-dropzone'
import styles from './AddChatForm.module.css'
import { validationSchema } from '@features/add-chat/lib/validation-schema'
import { useUserProfile } from '@entities/user/model/store'
import { useAddChatMutation } from '@entities/chat/api/mutations'
import { useAddChatStore } from '@features/add-chat/model/use-add-chat'
import { MapMode, useMapStore } from '@features/search-map/model/store'
import { useChats } from '@entities/chat/api/queries'
import { AddChatFormType } from '@features/add-chat/model/types'

export const AddChatForm = () => {
  const userProfileStore = useUserProfile()
  const addChatStore = useAddChatStore()
  const formData = useAddChatStore((state) => state.formData)
  const { setModalOpened } = useAddChatStore()

  const mapStore = useMapStore()
  const { refetch } = useChats()

  useCallback((acceptedFiles: File[]) => {
    console.log(acceptedFiles) // TODO
  }, [])

  const { mutate, isPending } = useAddChatMutation({
    onSuccess: () => {
      form.reset()
      refetch()
      mapStore.setMapMode(MapMode.Show)
      addChatStore.setModalOpened(false)
    },
  })

  // const { getRootProps, getInputProps } = useDropzone({ onDrop }) // TODO

  const form = useForm({
    defaultValues: {
      ...formData,
    },
    validators: {
      onChange: validationSchema,
    },
    onSubmit: async ({ value }) => {
      mutate({
        userId: String(userProfileStore.data?.userId),
        chatId: '-',
        title: value.title || '',
        description: value.description || '',
        imageUrl: value.imageUrl || '',
        inviteLink: value.inviteLink || '',
        longitude: value.coordinates?.[0] || 0,
        latitude: value.coordinates?.[1] || 0,
      })
    },
  })

  function syncFormData(values: Partial<AddChatFormType>) {
    addChatStore.setFormData(values)
  }

  const handleChangeCoordinates = () => {
    mapStore.setMapMode(MapMode.Add)
    mapStore.setCoordinatesSelecting(true)
    setModalOpened(false)
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        e.stopPropagation()
        form.handleSubmit()
      }}
    >
      <form.Subscribe
        selector={(state) => state.values}
        children={(values) => {
          useEffect(() => {
            syncFormData(values)
          }, [values])
          return null
        }}
      />
      <div className={styles.formContainer}>
        <form.Field
          name="title"
          children={(field) => (
            <>
              <Input
                className={styles.formField}
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
                className={styles.formField}
                header="Описание"
                placeholder="Введите описание чата"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                status={field.state.meta.errors.length && field.state.meta.isTouched ? 'error' : undefined}
              />
            </>
          )}
        />
        <form.Field
          name="inviteLink"
          children={(field) => (
            <>
              <Input
                className={styles.formField}
                header="Ссылка-приглашение"
                placeholder="Введите ссылку для приглашения в чат"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                status={field.state.meta.errors.length ? 'error' : undefined}
              />
            </>
          )}
        />
        <form.Field
          name="imageUrl"
          children={(field) => (
            <>
              <Input
                className={styles.formField}
                header="Изображение"
                placeholder="Добавьте ссылку"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                status={field.state.meta.errors.length && field.state.meta.isTouched ? 'error' : undefined}
                // after={ // TODO
                //   <div {...getRootProps()}>
                //     <input {...getInputProps()} />
                //     <IconButton mode="bezeled" size="s">
                //       <FontAwesomeIcon icon={faPaperclip} />
                //     </IconButton>
                //   </div>
                // }
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
                {!field.state.value?.[0] || !field.state.value[1]
                  ? 'Нажмите, чтобы указать'
                  : `${field.state.value[0]} : ${field.state.value[1]}`}
              </div>
            )}
          />
          <Button type="submit" mode="filled" stretched size="s" loading={isPending} disabled={isPending}>
            Сохранить
          </Button>
        </div>
      </div>
    </form>
  )
}
