import './App.css'
import '@telegram-apps/telegram-ui/dist/styles.css'
import { useUserProfile } from '@entities/user/model/store'
import { useEffect } from 'react'
import { MapWithChats } from '@widgets/map-with-chats/ui/map-with-chats'

const App = () => {
  const userProfileStore = useUserProfile()

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const userId = urlParams.get('userId')
    userProfileStore.setUser({ userId: Number(userId) })
  }, [])

  return (
    <div style={{ width: '100vw', height: '100vh', borderRadius: '8px', overflow: 'hidden' }}>
      {/* <SearchMap width="100%" height="100%" /> */}
      <MapWithChats />
    </div>
  )
}

export default App
