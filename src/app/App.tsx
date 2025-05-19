import '@telegram-apps/telegram-ui/dist/styles.css'
import { MapWithChats } from '@widgets/map-with-chats/ui/map-with-chats'
import './App.css'
import { withAuth } from './providers/with-auth'

const App = () => {
  return (
    <div style={{ width: '100vw', height: '100vh', borderRadius: '8px', overflow: 'hidden' }}>
      {/* <SearchMap width="100%" height="100%" /> */}
      <MapWithChats />
    </div>
  )
}

export default withAuth(App)
