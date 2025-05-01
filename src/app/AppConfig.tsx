import './App.css'
import '@telegram-apps/telegram-ui/dist/styles.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { StrictMode } from 'react'
import { AppRoot } from '@telegram-apps/telegram-ui'
import App from './App'
import { init, miniApp } from '@telegram-apps/sdk'
import '@telegram-apps/telegram-ui/dist/styles.css'

const initializeTelegramSDK = async () => {
  try {
    await init()

    if (miniApp.ready.isAvailable()) {
      await miniApp.ready()
      console.log('Mini App готово')
      // @ts-expect-error
      const initData = new URLSearchParams(window.Telegram.WebApp.initData)
      const userId = initData.get('user') || initData.get('id') // Зависит от структуры initData

      console.log('User ID:', userId)
    }
  } catch (error) {
    console.error('Ошибка инициализации:', error)
  }
}

initializeTelegramSDK()

// miniApp.setHeaderColor('#fcb69f')

// Монтируем главную кнопку
// if (mainButton.mount.isAvailable()) {
//   mainButton.mount() // Убедимся, что кнопка установлена
//   console.log('Главная кнопка установлена')
// }

// Настраиваем свойства главной кнопки
// if (mainButton.setParams.isAvailable()) {
//   mainButton.setParams({
//     backgroundColor: '#aa1388', // Цвет кнопки
//     isEnabled: true, // Кнопка активна
//     isVisible: true, // Кнопка видима
//     text: 'Создать чат', // Текст на кнопке
//     textColor: '#000000', // Цвет текста
//   })
//   console.log('Свойства главной кнопки настроены')
// }

// Добавляем слушатель кликов на кнопку
// if (mainButton.onClick.isAvailable()) {
//   mainButton.onClick(() => {
//     try {
//       // Получение текущих очков из localStorage
//       const score = localStorage.getItem('memory-game-score') || 0
//       shareURL(`Посмотрите! У меня ${score} очков в игре!`)
//       console.log('Окно выбора чата открыто для отправки сообщения.')
//     } catch (error) {
//       console.error('Ошибка при открытии окна выбора чата:', error)
//     }
//   })
// }
const queryClient = new QueryClient()

const AppConfig = () => {
  return (
    <StrictMode>
      <AppRoot>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </AppRoot>
    </StrictMode>
  )
}

export default AppConfig
