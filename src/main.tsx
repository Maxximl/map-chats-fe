import { createRoot } from 'react-dom/client'
import './index.css'

import AppConfig from '@app/AppConfig.tsx'

createRoot(document.getElementById('root')!).render(<AppConfig />)

// if (import.meta.env.MODE === 'development') {
import('./eruda')
// }
