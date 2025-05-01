import './App.css'
import { MainMap } from '@widgets/main-map'
import '@telegram-apps/telegram-ui/dist/styles.css'

const App = () => {
  return (
    <div style={{ width: '100vw', height: '100vh', borderRadius: '8px', overflow: 'hidden' }}>
      <MainMap width="100%" height="100%" />
    </div>
  )
}

export default App
